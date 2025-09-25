import React, { useEffect, useRef } from 'react';
import { Brain, Code, Database, Cpu, Zap, Globe, Wifi, Server, Cloud, GitBranch } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotationSpeedX: number;
  rotationSpeedY: number;
  rotationSpeedZ: number;
  icon: string;
  size: number;
  opacity: number;
  color: string;
  connectionDistance: number;
}

const ParticleBackground: React.FC<{ density?: number; interactive?: boolean }> = ({ 
  density = 0.8, 
  interactive = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const techIcons = ['🧠', '💻', '🔗', '⚡', '🌐', '📊', '🤖', '⚙️', '☁️', '🔮'];
  const colors = [
    'hsl(212, 100%, 65%)', // Primary blue
    'hsl(270, 60%, 45%)',  // Purple
    'hsl(189, 100%, 60%)', // Cyan
    'hsl(212, 100%, 75%)', // Light blue
    'hsl(270, 60%, 65%)',  // Light purple
  ];

  const createParticle = (id: number, width: number, height: number): Particle => {
    return {
      id,
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 500 - 250,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.3,
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360,
      rotationZ: Math.random() * 360,
      rotationSpeedX: (Math.random() - 0.5) * 2,
      rotationSpeedY: (Math.random() - 0.5) * 2,
      rotationSpeedZ: (Math.random() - 0.5) * 2,
      icon: techIcons[Math.floor(Math.random() * techIcons.length)],
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      connectionDistance: Math.random() * 100 + 80,
    };
  };

  const initParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const particleCount = Math.floor((rect.width * rect.height) / (15000 / density));
    
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => 
      createParticle(i, rect.width, rect.height)
    );
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const { x, y, z, size, opacity, color, icon, rotationX, rotationY, rotationZ } = particle;
    
    // 3D perspective calculation
    const perspective = 800;
    const scale = perspective / (perspective + z);
    const projectedX = x * scale;
    const projectedY = y * scale;
    const projectedSize = size * scale;

    if (scale < 0.1) return; // Don't draw particles too far away

    ctx.save();
    ctx.translate(projectedX, projectedY);
    
    // 3D rotation effect
    ctx.transform(
      Math.cos(rotationZ * Math.PI / 180) * scale,
      Math.sin(rotationZ * Math.PI / 180) * scale,
      -Math.sin(rotationZ * Math.PI / 180) * scale,
      Math.cos(rotationZ * Math.PI / 180) * scale,
      0,
      0
    );

    // Draw tech icon/symbol
    ctx.globalAlpha = opacity * scale;
    ctx.font = `${projectedSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = projectedSize * 0.5;
    ctx.fillStyle = color;
    ctx.fillText(icon, 0, 0);
    
    // Add subtle border
    ctx.shadowBlur = 0;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeText(icon, 0, 0);
    
    ctx.restore();
  };

  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < Math.min(p1.connectionDistance, p2.connectionDistance)) {
          const perspective = 800;
          const scale1 = perspective / (perspective + p1.z);
          const scale2 = perspective / (perspective + p2.z);
          
          if (scale1 > 0.1 && scale2 > 0.1) {
            const opacity = (1 - distance / Math.min(p1.connectionDistance, p2.connectionDistance)) * 0.3;
            
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'hsl(212, 100%, 65%)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x * scale1, p1.y * scale1);
            ctx.lineTo(p2.x * scale2, p2.y * scale2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
  };

  const updateParticles = () => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const particles = particlesRef.current;
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      
      // Update rotation
      particle.rotationX += particle.rotationSpeedX;
      particle.rotationY += particle.rotationSpeedY;
      particle.rotationZ += particle.rotationSpeedZ;
      
      // Boundary wrapping with 3D depth
      if (particle.x > rect.width + 50) particle.x = -50;
      if (particle.x < -50) particle.x = rect.width + 50;
      if (particle.y > rect.height + 50) particle.y = -50;
      if (particle.y < -50) particle.y = rect.height + 50;
      if (particle.z > 250) particle.z = -250;
      if (particle.z < -250) particle.z = 250;
      
      // Mouse interaction
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }
      }
      
      // Add slight drift back to original velocity
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      particle.vz *= 0.99;
    });
  };

  const animate = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw
    updateParticles();
    drawConnections(ctx);
    particlesRef.current.forEach(particle => drawParticle(ctx, particle));
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initParticles();
    animate();
    
    const handleResize = () => {
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density, interactive]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
    </div>
  );
};

export default ParticleBackground;