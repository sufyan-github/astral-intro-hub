import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Code } from "lucide-react";

// ================================================
// JSON-DRIVEN PROJECTS
// Put your data in: src/data/projects.json
// Ensure tsconfig has: "resolveJsonModule": true, "esModuleInterop": true
// ================================================

import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  project_type: string; // e.g., "AI/ML", "Research", "Mobile", "Web Development"
  year: string;
  featured: boolean;
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
}

// Tech logo component for project technologies
const TechLogo = ({ name }: { name: string }) => {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    if (name.includes("yolo") || name.includes("detection")) return "🎯";
    if (name.includes("mobilenet") || name.includes("resnet")) return "📱";
    if (name.includes("python")) return "🐍";
    if (name.includes("computer vision")) return "👁️";
    if (name.includes("machine learning") || name.includes("ml")) return "🤖";
    if (name.includes("deep learning") || name.includes("dl")) return "🧠";
    if (name.includes("nlp")) return "💬";
    if (name.includes("lstm") || name.includes("gru")) return "🔄";
    if (name.includes("time series")) return "📈";
    if (name.includes("healthcare")) return "🏥";
    if (name.includes("flutter")) return "💙";
    if (name.includes("dart")) return "🎯";
    if (name.includes("firebase")) return "🔥";
    if (name.includes("react")) return "⚛️";
    if (name.includes("tailwind")) return "🎨";
    if (name.includes("node")) return "💚";
    if (name.includes("express")) return "🚀";
    if (name.includes("mysql")) return "🗃️";
    if (name.includes("php") || name.includes("laravel")) return "🐘";
    return "💻";
  };

  return <span className="text-sm mr-1">{getTechIcon(name)}</span>;
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "AI/ML":
      return "bg-gradient-primary";
    case "Research":
      return "bg-gradient-accent";
    case "Mobile":
      return "bg-secondary";
    case "Web Development":
      return "bg-accent";
    default:
      return "bg-muted";
  }
};

const Projects: React.FC = () => {
  // If you need sorting/filtering, do it here with useMemo
  const projects = useMemo(() => (projectsData as Project[]) ?? [], []);

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
              key={project.id}
              className={`hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up ${
                project.featured ? "border-primary shadow-glow" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getTypeColor(project.project_type)} text-white`}>
                        {project.project_type}
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
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={`${project.id}-tech-${techIndex}`}
                      variant="secondary"
                      className="hover-lift animate-scale-in flex items-center"
                      style={{ animationDelay: `${(index * 3 + techIndex) * 0.05}s` }}
                    >
                      <TechLogo name={tech} />
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  {project.github_url && project.github_url !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="glow-border hover-lift"
                    >
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-2" /> Code
                      </a>
                    </Button>
                  )}

                  {project.demo_url && project.demo_url !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="glow-border hover-lift"
                    >
                      <a href={project.demo_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> Demo
                      </a>
                    </Button>
                  )}

                  {(!project.github_url || project.github_url === "#") &&
                    (!project.demo_url || project.demo_url === "#") && (
                      <Badge variant="secondary" className="flex items-center">
                        <Code className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Badge>
                    )}
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
