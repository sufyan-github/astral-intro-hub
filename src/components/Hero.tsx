import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Brain, Cpu, Database } from "lucide-react";
import ResumeDownload from "@/components/ResumeDownload";

// =====================================================
// JSON‑DRIVEN HERO SECTION
// Create: src/data/hero.json (example provided separately)
// Ensure tsconfig: "resolveJsonModule": true, "esModuleInterop": true
// =====================================================

import heroData from "@/data/hero.json";

type Social = { label: string; type: "email" | "linkedin" | "github" | "custom"; href: string };

type HeroConfig = {
  name: string;
  title: string;
  summary: string;
  chips: { icon: "brain" | "cpu" | "db"; text: string }[];
  socials: Social[];
  ctas: { label: string; targetId: string }[]; // e.g., [{label: "View My Work", targetId: "projects"}]
  showBackgroundIcons?: boolean;
};

const iconForChip = (icon: "brain" | "cpu" | "db") => {
  switch (icon) {
    case "brain":
      return <Brain className="h-4 w-4 mr-2 text-primary" />;
    case "cpu":
      return <Cpu className="h-4 w-4 mr-2 text-accent" />;
    case "db":
      return <Database className="h-4 w-4 mr-2 text-secondary" />;
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
      {/* Background elements */}
      {cfg.showBackgroundIcons !== false && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="ai-brain-cube absolute top-16 left-4 md:top-20 md:left-20 animate-float" style={{ animationDelay: "0s" }}>
            <Brain className="h-8 w-8 md:h-12 md:w-12 text-primary opacity-20" />
          </div>
          <div className="iot-chip-cube absolute top-24 right-4 md:top-32 md:right-32 animate-float-reverse" style={{ animationDelay: "1s" }}>
            <Cpu className="h-6 w-6 md:h-10 md:w-10 text-accent opacity-15" />
          </div>
          <div className="ml-network-cube absolute top-48 left-1/4 md:top-64 md:left-1/3 animate-float" style={{ animationDelay: "2s" }}>
            <Database className="h-8 w-8 md:h-12 md:w-12 text-secondary opacity-20" />
          </div>
          <div className="floating-cube hidden md:block top-40 left-40 animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="floating-cube-reverse hidden md:block bottom-40 right-40 animate-float-reverse" style={{ animationDelay: "2s" }} />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 text-center z-10 animate-slide-up">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
            {cfg.name}
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4 px-2">
            {cfg.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            {cfg.summary}
          </p>

          {/* Specialization chips */}
          {cfg.chips?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
              {cfg.chips.map((c, i) => (
                <div
                  key={c.text + i}
                  className="flex items-center bg-card/30 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-2 text-sm animate-scale-in"
                  style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                >
                  {iconForChip(c.icon)}
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Social Links */}
          {cfg.socials?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 px-2">
              {cfg.socials.map((s) => {
                const Icon = s.type === "email" ? Mail : s.type === "linkedin" ? Linkedin : s.type === "github" ? Github : ArrowDown;
                const onClick = () => {
                  if (s.type === "email") {
                    window.open(s.href.startsWith("mailto:") ? s.href : `mailto:${s.href}`, "_blank");
                  } else {
                    window.open(s.href, "_blank");
                  }
                };
                return (
                  <Button key={s.label} variant="outline" size="lg" className="glow-border hover-lift text-sm sm:text-base" onClick={onClick}>
                    <Icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {s.label}
                  </Button>
                );
              })}
            </div>
          )}

          {/* CTAs + Resume */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2">
            {cfg.ctas?.map((c) => (
              <Button key={c.label} size="lg" className="bg-gradient-primary hover:shadow-glow animate-pulse-glow text-sm sm:text-base" onClick={() => scrollToId(c.targetId)}>
                {c.label}
              </Button>
            ))}
            <ResumeDownload />
          </div>

          {/* Contact CTA (optional: use a CTA for this too) */}
          <div className="mb-8 sm:mb-12">
            <Button variant="secondary" size="lg" className="glow-border hover-lift text-sm sm:text-base" onClick={() => scrollToId("contact")}>
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Let's Collaborate
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce" aria-hidden>
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;