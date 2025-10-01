import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Cpu } from "lucide-react";

// =====================================================
// JSON‑DRIVEN NAVIGATION WITH QUALITY‑OF‑LIFE UPGRADES
// Create: src/data/navigation.json (see example below)
// Ensure tsconfig: "resolveJsonModule": true, "esModuleInterop": true
// =====================================================

import navData from "@/data/navigation.json";

type NavItem = { name: string; href: string };

type NavConfig = {
  siteTitle: string;
  items: NavItem[];
  cvUrl?: string; // when provided, renders CV buttons
  cvFileName?: string; // used for download attr
  enableActiveHighlight?: boolean; // default true
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Navigation: React.FC = () => {
  const cfg = navData as NavConfig;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#home");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobileMenuOpen]);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    if (cfg.enableActiveHighlight === false) return;
    const sections = (cfg.items || []).map((i) => document.querySelector(i.href)).filter(Boolean) as Element[];
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = "#" + visible[0].target.id;
          setActiveHash(id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cfg]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    if (prefersReducedMotion()) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => activeHash === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-card" : "bg-transparent"
      }`}
      aria-label="Primary"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-primary text-primary-foreground px-3 py-1 rounded"
      >
        Skip to content
      </a>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Tech Icon */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("#home")}
              className="flex items-center space-x-2 group hover-lift"
              aria-label={`${cfg.siteTitle} — go to home`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-primary p-2 rounded-lg">
                  <Cpu className="h-6 w-6 text-white animate-pulse" />
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text font-display">
                MASC
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {(cfg.items || []).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative transition-colors duration-200 hover-lift ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {/* active underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}

            {cfg.cvUrl && (
              <Button asChild size="sm" className="bg-gradient-primary hover:shadow-glow ml-2">
                <a href={cfg.cvUrl} download={cfg.cvFileName || undefined}>
                  <Download className="h-4 w-4 mr-2" />
                  CV
                </a>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              aria-expanded={isMobileMenuOpen}
              aria-controls="primary-mobile-menu"
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="glow-border"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">{isMobileMenuOpen ? "Close" : "Open"} menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="primary-mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-card animate-slide-up"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-6 py-4 space-y-2">
              {(cfg.items || []).map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left transition-colors duration-200 py-2 rounded ${
                    isActive(item.href)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {cfg.cvUrl && (
                <Button asChild size="sm" className="w-full bg-gradient-primary hover:shadow-glow mt-4">
                  <a href={cfg.cvUrl} download={cfg.cvFileName || undefined}>
                    <Download className="h-4 w-4 mr-2" /> Download CV
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
