import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Academic from "@/components/Academic";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Analytics from "@/components/Analytics";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingTechElements from "@/components/FloatingTechElements";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* 3D Particle Background Animation */}
      <ParticleBackground
  density={1}          // 0.5–1.2 is comfy
  speed={1}            // 0.8 for calmer
  maxDepth={250}
  interactive={true}
  blendMode="screen"   // or "lighter"
  colors={[
    "hsl(212, 100%, 65%)",
    "hsl(270, 60%, 45%)",
    "hsl(189, 100%, 60%)",
  ]}
  icons={["🧠","💻","🤖","⚡","🌐"]}
/>

      
      {/* Floating Tech Elements */}
      <FloatingTechElements />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <div id="home">
            <Hero />
          </div>
          <About />
          <Academic />
          <Experience />
          <Skills />
          <GitHubHeatmap />
          <Certifications />
          <Achievements />
          <Projects />
          <Research />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">
              © 2025 Md. Abu Sufyan. Built with passion for technology and innovation.
            </p>
          </div>
        </footer>
      </div>
      
      {/* Analytics Component */}
      <Analytics />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;