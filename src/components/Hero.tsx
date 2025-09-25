import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-cube top-20 left-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="floating-cube-reverse top-32 right-32 animate-float-reverse" style={{ animationDelay: '1s' }} />
        <div className="floating-cube top-64 left-1/3 animate-float" style={{ animationDelay: '2s' }} />
        <div className="floating-cube-reverse bottom-32 left-20 animate-float-reverse" style={{ animationDelay: '3s' }} />
        <div className="floating-cube bottom-64 right-20 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="floating-cube-reverse top-1/2 right-1/4 animate-float-reverse" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="container mx-auto px-6 text-center z-10 animate-slide-up">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Md. Abu Sufyan
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
            Machine Learning & AI Instructor | Computer Science Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Driven by a passion for technology and innovation, I specialize in Machine Learning, 
            Deep Learning, and Computer Vision. Currently pursuing BSc in Computer Science & Engineering 
            at RUET with a focus on AI research and community impact.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <Button variant="outline" size="lg" className="glow-border hover-lift">
              <Mail className="mr-2 h-5 w-5" />
              Email
            </Button>
            <Button variant="outline" size="lg" className="glow-border hover-lift">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="glow-border hover-lift">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow animate-pulse-glow">
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="glow-border hover-lift">
              Download CV
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;