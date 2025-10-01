import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Tag } from "lucide-react";
import demoTrafficImage from "@/assets/demo-traffic.jpg";
import demoHealthTrackerImage from "@/assets/demo-healthtracker.png";
import projectsData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  project_type: string;
  year: string;
  featured: boolean;
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "AI/ML":
      return "bg-primary/20 text-primary border-primary/30";
    case "Research":
      return "bg-accent/20 text-accent border-accent/30";
    case "Mobile":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "Web Development":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const projects = useMemo(() => {
    const projectsList = projectsData as Project[];
    return projectsList.map(project => ({
      ...project,
      image_url: project.id === "p01" ? demoTrafficImage : 
                 project.id === "p02" ? demoHealthTrackerImage : 
                 project.image_url || "/projects/placeholder.jpg"
    }));
  }, []);

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.project_type === filter);

  const projectTypes = ["all", ...Array.from(new Set(projects.map(p => p.project_type)))];

  return (
    <section id="projects" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text font-display">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions spanning AI research, web development, and mobile applications
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? "bg-primary" : ""}
            >
              {type === "all" ? "All Projects" : type}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
                project.featured ? "ring-2 ring-primary/20" : ""
              }`}
            >
              {/* Project Image */}
              {project.image_url && (
                <div className="relative w-full h-56 overflow-hidden bg-muted">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/projects/placeholder.jpg";
                    }}
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0">
                      Featured
                    </Badge>
                  )}
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="outline" className={getTypeColor(project.project_type)}>
                        <Tag className="h-3 w-3 mr-1" />
                        {project.project_type}
                      </Badge>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={`${project.id}-tech-${techIndex}`}
                      variant="secondary"
                      className="text-xs bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.github_url && project.github_url !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-primary/50"
                    >
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-2" /> Code
                      </a>
                    </Button>
                  )}

                  {project.demo_url && project.demo_url !== "#" && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <a href={project.demo_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
