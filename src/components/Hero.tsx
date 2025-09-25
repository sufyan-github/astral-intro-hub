import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Brain, Cpu, Zap, Database, Wifi, Globe } from "lucide-react";
import ResumeDownload from "@/components/ResumeDownload";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Enhanced 3D AI/ML/IoT Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* AI/ML themed floating elements */}
        <div className="ai-brain-cube absolute top-16 left-4 md:top-20 md:left-20 animate-float" style={{ animationDelay: '0s' }}>
          <Brain className="h-8 w-8 md:h-12 md:w-12 text-primary opacity-20" />
        </div>
        <div className="iot-chip-cube absolute top-24 right-4 md:top-32 md:right-32 animate-float-reverse" style={{ animationDelay: '1s' }}>
          <Cpu className="h-6 w-6 md:h-10 md:w-10 text-accent opacity-15" />
        </div>
        <div className="ml-network-cube absolute top-48 left-1/4 md:top-64 md:left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="h-7 w-7 md:h-11 md:w-11 text-secondary opacity-25" />
        </div>
        <div className="data-cube absolute bottom-24 left-4 md:bottom-32 md:left-20 animate-float-reverse" style={{ animationDelay: '3s' }}>
          <Database className="h-8 w-8 md:h-12 md:w-12 text-primary opacity-20" />
        </div>
        <div className="iot-wifi-cube absolute bottom-48 right-4 md:bottom-64 md:right-20 animate-float" style={{ animationDelay: '1.5s' }}>
          <Wifi className="h-6 w-6 md:h-10 md:w-10 text-accent opacity-15" />
        </div>
        <div className="ai-globe-cube absolute top-1/2 right-8 md:right-1/4 animate-float-reverse" style={{ animationDelay: '2.5s' }}>
          <Globe className="h-7 w-7 md:h-11 md:w-11 text-secondary opacity-25" />
        </div>
        
        {/* Traditional geometric cubes for background depth */}
        <div className="floating-cube hidden md:block top-40 left-40 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="floating-cube-reverse hidden md:block bottom-40 right-40 animate-float-reverse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center z-10 animate-slide-up">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
            Md. Abu Sufyan
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4 px-2">
            Machine Learning & AI Instructor | Computer Science Engineer
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Driven by a passion for technology and innovation, I specialize in Machine Learning, 
            Deep Learning, and Computer Vision. Currently pursuing BSc in Computer Science & Engineering 
            at RUET with a focus on AI research and community impact.
          </p>

          {/* AI/ML/IoT Specializations */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
            <div className="flex items-center bg-card/30 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-2 text-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Brain className="h-4 w-4 mr-2 text-primary" />
              <span>AI & Machine Learning</span>
            </div>
            <div className="flex items-center bg-card/30 backdrop-blur-sm border border-accent/20 rounded-full px-3 py-2 text-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Cpu className="h-4 w-4 mr-2 text-accent" />
              <span>IoT Development</span>
            </div>
            <div className="flex items-center bg-card/30 backdrop-blur-sm border border-secondary/20 rounded-full px-3 py-2 text-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Database className="h-4 w-4 mr-2 text-secondary" />
              <span>Data Science</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 px-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="glow-border hover-lift text-sm sm:text-base"
              onClick={() => window.open('mailto:abusufyan.cse20@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Email
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="glow-border hover-lift text-sm sm:text-base"
              onClick={() => window.open('https://linkedin.com/in/md-abu-sufyan', '_blank')}
            >
              <Linkedin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              LinkedIn
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="glow-border hover-lift text-sm sm:text-base"
              onClick={() => window.open('https://github.com/sufyan-github', '_blank')}
            >
              <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              GitHub
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow animate-pulse-glow text-sm sm:text-base"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <ResumeDownload />
          </div>

          {/* Contact CTA */}
          <div className="mb-8 sm:mb-12">
            <Button 
              variant="secondary" 
              size="lg" 
              className="glow-border hover-lift text-sm sm:text-base"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Let's Collaborate
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;