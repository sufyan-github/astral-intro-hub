import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Traffic Sign Detection System",
      year: "2025",
      description: "Real-time detection of traffic signs using YOLOv8, MobileNet, and ResNet. Deployed on a web interface with live video processing support.",
      technologies: ["YOLOv8", "MobileNet", "ResNet", "Python", "Web Interface", "Computer Vision"],
      featured: true,
      type: "AI/ML"
    },
    {
      title: "Sentiment Analysis and Bias Detection",
      year: "2024",
      description: "Developed ML/DL models for detecting sentiment and geopolitical bias in social media text. Supported academic research published in ICCIT 2024.",
      technologies: ["Machine Learning", "Deep Learning", "NLP", "Python", "Social Media Analysis"],
      featured: true,
      type: "Research"
    },
    {
      title: "Time-Series Forecasting for Health Data",
      year: "2024",
      description: "Built forecasting models to predict Monkeypox outbreak trends. Implemented LSTM, GRU, and ensemble ML models to improve predictive accuracy.",
      technologies: ["LSTM", "GRU", "Time Series", "Python", "Healthcare Analytics", "Ensemble Methods"],
      featured: true,
      type: "AI/ML"
    },
    {
      title: "Attendance Management App",
      year: "2024",
      description: "Cross-platform mobile app built with Flutter and Dart. Integrated Firebase for authentication and real-time database. Applied Riverpod for state management.",
      technologies: ["Flutter", "Dart", "Firebase", "Riverpod", "Mobile Development"],
      type: "Mobile"
    },
    {
      title: "Full-Stack Web Development Projects",
      year: "2023 – Ongoing",
      description: "Designed responsive frontends with React, TailwindCSS, and DaisyUI. Built backends with Node.js, Express.js, MySQL, and PHP (Laravel).",
      technologies: ["React", "TailwindCSS", "Node.js", "Express.js", "MySQL", "PHP", "Laravel"],
      type: "Web Development"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "bg-gradient-primary";
      case "Research": return "bg-gradient-accent";
      case "Mobile": return "bg-secondary";
      case "Web Development": return "bg-accent";
      default: return "bg-muted";
    }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative solutions spanning AI research, web development, and mobile applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up ${project.featured ? 'border-primary shadow-glow' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        className={`${getTypeColor(project.type)} text-white`}
                      >
                        {project.type}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.year}
                      </div>
                    </div>
                  </div>
                  {project.featured && (
                    <Badge variant="outline" className="text-primary border-primary">
                      Featured
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="hover-lift animate-scale-in"
                      style={{ animationDelay: `${(index * 3 + techIndex) * 0.05}s` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="glow-border hover-lift">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="glow-border hover-lift">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="glow-border hover-lift">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;