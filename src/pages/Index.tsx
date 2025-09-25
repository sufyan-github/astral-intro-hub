import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Analytics from "@/components/Analytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <About />
        <Experience />
        <Skills />
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
      
      {/* Analytics Component */}
      <Analytics />
    </div>
  );
};

export default Index;
