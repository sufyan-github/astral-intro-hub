import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Brain, Wrench } from "lucide-react";

// Tech logo component for individual skills
const TechLogo = ({ name }: { name: string }) => {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    if (name.includes('python')) return '🐍';
    if (name.includes('javascript')) return '⚡';
    if (name.includes('react')) return '⚛️';
    if (name.includes('node')) return '💚';
    if (name.includes('html') || name.includes('css')) return '🌐';
    if (name.includes('tailwind')) return '🎨';
    if (name.includes('machine learning') || name.includes('ml')) return '🤖';
    if (name.includes('deep learning') || name.includes('dl')) return '🧠';
    if (name.includes('computer vision')) return '👁️';
    if (name.includes('nlp')) return '💬';
    if (name.includes('tensorflow') || name.includes('pytorch')) return '📊';
    if (name.includes('data science')) return '📈';
    if (name.includes('mysql')) return '🗃️';
    if (name.includes('mongodb')) return '🍃';
    if (name.includes('express')) return '🚀';
    if (name.includes('php') || name.includes('laravel')) return '🐘';
    if (name.includes('firebase')) return '🔥';
    if (name.includes('rest api')) return '🌍';
    if (name.includes('git') || name.includes('github')) return '📚';
    if (name.includes('vs code')) return '📝';
    if (name.includes('docker')) return '🐳';
    if (name.includes('postman')) return '📮';
    if (name.includes('figma')) return '🎯';
    if (name.includes('linux')) return '🐧';
    return '💻';
  };

  return (
    <span className="text-lg mr-2 animate-pulse">
      {getTechIcon(name)}
    </span>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming & Web Development",
      icon: Code,
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Node.js", level: 75 },
        { name: "HTML5/CSS3", level: 90 },
        { name: "TailwindCSS", level: 85 }
      ]
    },
    {
      title: "Machine Learning & AI",
      icon: Brain,
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "Deep Learning", level: 85 },
        { name: "Computer Vision", level: 80 },
        { name: "NLP", level: 75 },
        { name: "TensorFlow/PyTorch", level: 85 },
        { name: "Data Science", level: 80 }
      ]
    },
    {
      title: "Databases & Backend",
      icon: Database,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Express.js", level: 75 },
        { name: "PHP Laravel", level: 70 },
        { name: "Firebase", level: 80 },
        { name: "REST APIs", level: 85 }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Docker", level: 60 },
        { name: "Postman", level: 85 },
        { name: "Figma", level: 65 },
        { name: "Linux", level: 75 }
      ]
    }
  ];

  const certifications = [
    "CAPM® Certification (PMI, 2024)",
    "App Development with Flutter (Ostad, 2024)",
    "Introduction to Machine Learning (Kaggle)",
    "Basic Networking Exam (Cisco)",
    "Art of Problem Definition (Generation Unlimited, 2024)",
    "Workplace Communication Essentials (Generation Unlimited, 2024)",
    "The SDG Primer (UNDP Bangladesh, 2025)"
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technical proficiency across multiple domains with focus on AI and web development
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="hover-lift glow-border bg-card/50 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <category.icon className="h-6 w-6 mr-3 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                     <div key={skillIndex} className="space-y-2">
                       <div className="flex justify-between items-center">
                         <div className="flex items-center">
                           <TechLogo name={skill.name} />
                           <span className="font-medium">{skill.name}</span>
                         </div>
                         <span className="text-sm text-muted-foreground">{skill.level}%</span>
                       </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                        style={{ animationDelay: `${(index * 2 + skillIndex) * 0.1}s` }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="justify-start p-3 text-sm bg-gradient-primary text-primary-foreground hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;