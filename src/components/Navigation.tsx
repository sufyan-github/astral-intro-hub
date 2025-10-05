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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-primary/20 shadow-[0_8px_32px_0_rgba(59,130,246,0.1)]" 
          : "bg-gradient-to-b from-background/50 to-transparent backdrop-blur-sm"
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
          {/* Logo with Enhanced Tech Icon */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("#home")}
              className="flex items-center space-x-3 group hover-lift relative"
              aria-label={`${cfg.siteTitle} — go to home`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                <div className="relative bg-gradient-primary p-2.5 rounded-xl shadow-glow ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all">
                  <Cpu className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold gradient-text font-display tracking-wide">
                  MASC
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                  Portfolio
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation with Glassmorphism */}
          <div className="hidden lg:flex items-center space-x-2">
            {(cfg.items || []).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium group ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10 shadow-glow"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {/* Enhanced active indicator */}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              aria-expanded={isMobileMenuOpen}
              aria-controls="primary-mobile-menu"
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="relative bg-gradient-primary/10 backdrop-blur-sm hover:bg-gradient-primary/20 border border-primary/20 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
              <span className="sr-only">{isMobileMenuOpen ? "Close" : "Open"} menu</span>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Glassmorphism */}
        {isMobileMenuOpen && (
          <div
            id="primary-mobile-menu"
            ref={mobileMenuRef}
            className="lg:hidden absolute top-16 left-0 right-0 bg-background/90 backdrop-blur-2xl border-b border-primary/20 shadow-2xl animate-slide-up"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-6 py-6 space-y-2">
              {(cfg.items || []).map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left transition-all duration-200 py-3 px-4 rounded-lg font-medium ${
                    isActive(item.href)
                      ? "text-primary bg-gradient-primary/10 shadow-glow border border-primary/30"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
