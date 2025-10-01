import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Brain, Cpu, Database } from "lucide-react";
import Lottie from "lottie-react";
import ResumeDownload from "@/components/ResumeDownload";
import heroData from "@/data/hero.json";

type Social = { label: string; type: "email" | "linkedin" | "github" | "custom"; href: string };

type HeroConfig = {
  name: string;
  title: string;
  summary: string;
  chips: { icon: "brain" | "cpu" | "db"; text: string }[];
  socials: Social[];
  ctas: { label: string; targetId: string }[];
  showBackgroundIcons?: boolean;
};

// Inline lightweight Lottie animation data (AI/Tech theme)
const techAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  nm: "Tech Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [360] }] },
        p: { a: 0, k: [200, 200, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [150, 150] },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.25, 0.51, 0.96, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
  ],
};

const iconForChip = (icon: "brain" | "cpu" | "db") => {
  switch (icon) {
    case "brain":
      return <Brain className="h-4 w-4 mr-2 text-primary" />;
    case "cpu":
      return <Cpu className="h-4 w-4 mr-2 text-accent" />;
    case "db":
      return <Database className="h-4 w-4 mr-2 text-secondary-foreground" />;
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
};

const Hero: React.FC = () => {
  const cfg = useMemo(() => heroData as HeroConfig, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden />

      {/* Lottie Animation - Top Right */}
      {!prefersReducedMotion() && (
        <div className="absolute top-16 right-8 w-72 h-72 opacity-30 pointer-events-none hidden lg:block" aria-hidden>
          <Lottie animationData={techAnimation} loop={true} />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 text-center z-10 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight font-display animate-fade-in">
            {cfg.name}
          </h1>
          
          {/* Role + Value Proposition */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 sm:mb-4 font-medium animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {cfg.title}
          </h2>
          
          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {cfg.summary}
          </p>

          {/* Specialization Chips */}
          {cfg.chips?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {cfg.chips.map((c, i) => (
                <div
                  key={c.text + i}
                  className="flex items-center bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2.5 text-sm font-medium hover-lift transition-all"
                >
                  {iconForChip(c.icon)}
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {cfg.ctas?.map((c) => (
              <Button 
                key={c.label} 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow text-base font-semibold px-8 transition-all duration-300"
                onClick={() => scrollToId(c.targetId)}
              >
                {c.label}
              </Button>
            ))}
            <ResumeDownload />
          </div>

          {/* Social Links - Compact */}
          {cfg.socials?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {cfg.socials.map((s) => {
                const Icon = s.type === "email" ? Mail : s.type === "linkedin" ? Linkedin : s.type === "github" ? Github : Mail;
                const onClick = () => {
                  if (s.type === "email") {
                    window.open(s.href.startsWith("mailto:") ? s.href : `mailto:${s.href}`, "_blank");
                  } else {
                    window.open(s.href, "_blank");
                  }
                };
                return (
                  <Button 
                    key={s.label} 
                    variant="outline" 
                    size="sm"
                    className="border-border hover:border-primary/50 hover:bg-card/80 transition-all"
                    onClick={onClick}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          )}

          {/* Scroll Indicator */}
          {!prefersReducedMotion() && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
