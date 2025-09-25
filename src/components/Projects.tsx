import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Code, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  project_type: string;
  year: string;
  featured: boolean;
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
}

// Tech logo component for project technologies
const TechLogo = ({ name }: { name: string }) => {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    if (name.includes('yolo') || name.includes('detection')) return '🎯';
    if (name.includes('mobilenet') || name.includes('resnet')) return '📱';
    if (name.includes('python')) return '🐍';
    if (name.includes('computer vision')) return '👁️';
    if (name.includes('machine learning') || name.includes('ml')) return '🤖';
    if (name.includes('deep learning') || name.includes('dl')) return '🧠';
    if (name.includes('nlp')) return '💬';
    if (name.includes('lstm') || name.includes('gru')) return '🔄';
    if (name.includes('time series')) return '📈';
    if (name.includes('healthcare')) return '🏥';
    if (name.includes('flutter')) return '💙';
    if (name.includes('dart')) return '🎯';
    if (name.includes('firebase')) return '🔥';
    if (name.includes('react')) return '⚛️';
    if (name.includes('tailwind')) return '🎨';
    if (name.includes('node')) return '💚';
    if (name.includes('express')) return '🚀';
    if (name.includes('mysql')) return '🗃️';
    if (name.includes('php') || name.includes('laravel')) return '🐘';
    return '💻';
  };

  return (
    <span className="text-sm mr-1">
      {getTechIcon(name)}
    </span>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AI/ML": return "bg-gradient-primary";
      case "Research": return "bg-gradient-accent";
      case "Mobile": return "bg-secondary";
      case "Web Development": return "bg-accent";
      default: return "bg-muted";
    }
  };

  const handleProjectClick = async (project: Project, action: string) => {
    // Track analytics
    await supabase.from('analytics').insert([
      {
        event_type: 'project_interaction',
        metadata: { 
          project_id: project.id, 
          project_title: project.title,
          action: action 
        }
      }
    ]);

    if (action === 'github' && project.github_url) {
      window.open(project.github_url, '_blank');
    } else if (action === 'demo' && project.demo_url) {
      window.open(project.demo_url, '_blank');
    }
  };

  if (loading) {
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
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="animate-pulse bg-card/50">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
              className={`hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up ${project.featured ? 'border-primary shadow-glow' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <div className="flex items-center space-x-4">
                     <Badge 
                        className={`${getTypeColor(project.project_type)} text-white`}
                      >
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
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                 <div className="flex flex-wrap gap-2 mb-6">
                   {project.technologies.map((tech, techIndex) => (
                     <Badge 
                       key={techIndex} 
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
                   {project.github_url && project.github_url !== '#' && (
                     <Button 
                       variant="outline" 
                       size="sm" 
                       className="glow-border hover-lift"
                       onClick={() => handleProjectClick(project, 'github')}
                     >
                       <Github className="h-4 w-4 mr-2" />
                       Code
                     </Button>
                   )}
                   {project.demo_url && project.demo_url !== '#' && (
                     <Button 
                       variant="outline" 
                       size="sm" 
                       className="glow-border hover-lift"
                       onClick={() => handleProjectClick(project, 'demo')}
                     >
                       <ExternalLink className="h-4 w-4 mr-2" />
                       Demo
                     </Button>
                   )}
                   {(!project.github_url || project.github_url === '#') && (!project.demo_url || project.demo_url === '#') && (
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