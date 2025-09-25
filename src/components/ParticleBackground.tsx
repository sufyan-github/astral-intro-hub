import React, { useEffect, useRef, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotZ: number; // use Z‑rotation only for perf
  rotSpeedZ: number;
  icon: string;
  size: number;
  opacity: number;
  color: string;
  connectDist: number;
}

export type ParticleBackgroundProps = {
  density?: number; // 0.0–1.5 (multiplier)
  interactive?: boolean;
  speed?: number; // global speed multiplier
  maxDepth?: number; // 3D depth ±value
  colors?: string[];
  icons?: string[]; // emoji or single chars
  blendMode?: GlobalCompositeOperation; // e.g., 'screen', 'lighter'
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
};

const DEFAULT_COLORS = [
  "hsl(212, 100%, 65%)", // Primary blue
  "hsl(270, 60%, 45%)", // Purple
  "hsl(189, 100%, 60%)", // Cyan
  "hsl(212, 100%, 75%)", // Light blue
  "hsl(270, 60%, 65%)", // Light purple
];

const DEFAULT_ICONS = ["🧠", "💻", "🔗", "⚡", "🌐", "📊", "🤖", "⚙️", "☁️", "🔮"];

// Lightweight seeded PRNG for stable layout across re-renders
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 0.8,
  interactive = true,
  speed = 1,
  maxDepth = 250,
  colors = DEFAULT_COLORS,
  icons = DEFAULT_ICONS,
  blendMode = "screen",
  className,
  style,
  zIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const dprRef = useRef<number>(1);
  const prefersReduced = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false),
    []
  );

  const createParticle = (id: number, w: number, h: number, rnd: () => number): Particle => {
    return {
      id,
      x: rnd() * w,
      y: rnd() * h,
      z: rnd() * (maxDepth * 2) - maxDepth,
      vx: (rnd() - 0.5) * 0.5 * speed,
      vy: (rnd() - 0.5) * 0.5 * speed,
      vz: (rnd() - 0.5) * 0.3 * speed,
      rotZ: rnd() * 360,
      rotSpeedZ: (rnd() - 0.5) * 2 * speed,
      icon: icons[Math.floor(rnd() * icons.length)],
      size: rnd() * 20 + 10,
      opacity: rnd() * 0.6 + 0.2,
      color: colors[Math.floor(rnd() * colors.length)],
      connectDist: rnd() * 100 + 80,
    };
  };

  const initParticles = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Particle count scaled by area and density
    const target = Math.floor((rect.width * rect.height) / (15000 / density));

    const rnd = mulberry32(Math.floor(rect.width * 1000 + rect.height));
    const arr: Particle[] = new Array(target);
    for (let i = 0; i < target; i++) arr[i] = createParticle(i, rect.width, rect.height, rnd);

    particlesRef.current = arr;
  };

  // Spatial hashing grid to reduce O(n^2) connection checks
  const drawConnections = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const ps = particlesRef.current;
    if (ps.length === 0) return;

    const cellSize = 120; // tune: connection distance ~80-180
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    const grid: number[][] = Array.from({ length: cols * rows }, () => []);

    // place particles into cells (use 2D projection for cell position)
    const persp = 800;
    const projX = new Float32Array(ps.length);
    const projY = new Float32Array(ps.length);
    const scaleArr = new Float32Array(ps.length);

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const s = persp / (persp + p.z);
      scaleArr[i] = s;
      projX[i] = p.x * s;
      projY[i] = p.y * s;
      if (s > 0.1) {
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(projX[i] / cellSize)));
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(projY[i] / cellSize)));
        grid[cy * cols + cx].push(i);
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = blendMode;
    ctx.strokeStyle = "hsl(212, 100%, 65%)";
    ctx.lineWidth = 1;

    for (let c = 0; c < grid.length; c++) {
      const col = c % cols;
      const row = (c / cols) | 0;
      // Check this cell + 3 neighbors (right, bottom, bottom-right) to avoid duplicate checks
      const buckets = [c, c + 1, c + cols, c + cols + 1].filter(
        (b) => b % cols !== 0 && b < grid.length // simple bounds guard
      );

      for (const b of buckets) {
        const indices = grid[c];
        const neighbors = grid[b];
        for (let i = 0; i < indices.length; i++) {
          const a = indices[i];
          for (let j = 0; j < neighbors.length; j++) {
            const bIdx = neighbors[j];
            if (a >= bIdx) continue;
            const p1 = ps[a];
            const p2 = ps[bIdx];
            const maxD = Math.min(p1.connectDist, p2.connectDist);
            const dx = projX[a] - projX[bIdx];
            const dy = projY[a] - projY[bIdx];
            const dz = p1.z - p2.z;
            const dist = Math.hypot(dx, dy, dz);
            if (dist < maxD && scaleArr[a] > 0.1 && scaleArr[bIdx] > 0.1) {
              const alpha = (1 - dist / maxD) * 0.3;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(projX[a], projY[a]);
              ctx.lineTo(projX[bIdx], projY[bIdx]);
              ctx.stroke();
            }
          }
        }
      }
    }

    ctx.restore();
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    const ps = particlesRef.current;
    const persp = 800;

    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      const s = persp / (persp + p.z);
      if (s < 0.1) continue;

      const px = p.x * s;
      const py = p.y * s;
      const size = p.size * s;

      ctx.save();
      ctx.translate(px, py);
      const rad = (p.rotZ * Math.PI) / 180;
      const cos = Math.cos(rad) * s;
      const sin = Math.sin(rad) * s;
      ctx.transform(cos, sin, -sin, cos, 0, 0);

      ctx.globalAlpha = p.opacity * s;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = size * 0.5;
      ctx.fillStyle = p.color;
      ctx.font = `${size}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.icon, 0, 0);

      ctx.shadowBlur = 0;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;
      ctx.strokeText(p.icon, 0, 0);
      ctx.restore();
    }
  };

  const step = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = (dprRef.current = Math.min(window.devicePixelRatio || 1, 2));

    // size canvas with DPR scaling
    const cw = Math.max(1, Math.floor(rect.width));
    const ch = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.scale(dpr, dpr);
    } else {
      // reset transform each frame
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // clear
    ctx.clearRect(0, 0, cw, ch);

    // update
    const ps = particlesRef.current;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.rotZ += p.rotSpeedZ;

      // boundaries + depth
      if (p.x > cw + 50) p.x = -50;
      if (p.x < -50) p.x = cw + 50;
      if (p.y > ch + 50) p.y = -50;
      if (p.y < -50) p.y = ch + 50;
      if (p.z > maxDepth) p.z = -maxDepth;
      if (p.z < -maxDepth) p.z = maxDepth;

      // light damping
      p.vx *= 0.995;
      p.vy *= 0.995;
      p.vz *= 0.995;

      if (interactive) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0.001) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.02 * speed;
          p.vy += (dy / dist) * force * 0.02 * speed;
        }
      }
    }

    // draw
    ctx.save();
    ctx.globalCompositeOperation = blendMode;
    drawConnections(ctx, cw, ch);
    drawParticles(ctx);
    ctx.restore();

    animationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // initialize
    initParticles();
    if (!prefersReduced) {
      animationRef.current = requestAnimationFrame(step);
    }

    // ResizeObserver for precise size changes
    const ro = new ResizeObserver(() => {
      initParticles();
    });
    ro.observe(containerRef.current);

    // Interaction
    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    if (interactive) window.addEventListener("mousemove", onMouseMove);

    // prefers-reduced-motion toggle re-check
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const onChange = () => {
      if (mql?.matches) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      } else if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(step);
      }
    };
    mql?.addEventListener?.("change", onChange as any);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
      if (interactive) window.removeEventListener("mousemove", onMouseMove);
      mql?.removeEventListener?.("change", onChange as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, interactive, speed, maxDepth, blendMode, prefersReduced, colors.join("|"), icons.join("|")]);

  return (
    <div
      ref={containerRef}
      className={"fixed inset-0 pointer-events-none " + (className ?? "")}
      style={{ background: "transparent", zIndex, ...style }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: blendMode as any, opacity: 0.6 }}
      />
    </div>
  );
};

export default ParticleBackground;