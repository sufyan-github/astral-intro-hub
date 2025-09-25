import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, Target, Users, Code, Presentation, Award } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Academic Excellence",
      subtitle: "CGPA 3.68/4.00",
      description: "Maintained consistently high academic performance throughout Computer Science & Engineering degree",
      icon: Trophy,
      category: "Academic",
      date: "2021-2025",
      color: "text-yellow-500"
    },
    {
      id: 2,
      title: "Project Leadership",
      subtitle: "Led 5+ Major Projects",
      description: "Successfully led cross-functional teams in developing innovative AI/ML solutions and web applications",
      icon: Users,
      category: "Leadership",
      date: "2023-2024",
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Open Source Contributor",
      subtitle: "500+ GitHub Contributions",
      description: "Active contributor to open-source projects with consistent coding activity and community engagement",
      icon: Code,
      category: "Development",
      date: "2022-Present",
      color: "text-green-500"
    },
    {
      id: 4,
      title: "Research Publications",
      subtitle: "3 Published Papers",
      description: "Published research papers in Machine Learning, Computer Vision, and Sentiment Analysis domains",
      icon: Presentation,
      category: "Research",
      date: "2023-2024",
      color: "text-purple-500"
    },
    {
      id: 5,
      title: "Technical Certifications",
      subtitle: "7+ Professional Certifications",
      description: "Earned certifications from PMI, Cisco, Kaggle, and other renowned organizations",
      icon: Award,
      category: "Certification",
      date: "2023-2025",
      color: "text-red-500"
    },
    {
      id: 6,
      title: "Innovation Award",
      subtitle: "Best AI Project 2024",
      description: "Received recognition for innovative machine learning solution in university competition",
      icon: Star,
      category: "Recognition",
      date: "2024",
      color: "text-orange-500"
    },
    {
      id: 7,
      title: "Community Impact",
      subtitle: "Mentored 50+ Students",
      description: "Actively mentoring junior students in programming, AI/ML concepts, and career development",
      icon: Target,
      category: "Community",
      date: "2022-Present",
      color: "text-indigo-500"
    },
    {
      id: 8,
      title: "Hackathon Winner",
      subtitle: "2x Competition Winner",
      description: "Won multiple hackathons and coding competitions with innovative solutions and team collaboration",
      icon: Medal,
      category: "Competition",
      date: "2023-2024",
      color: "text-pink-500"
    }
  ];

  const categories = [...new Set(achievements.map(a => a.category))];

  return (
    <section id="achievements" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Achievements & Milestones</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Key accomplishments and recognitions throughout my academic and professional journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Badge 
            variant="default" 
            className="bg-gradient-primary text-primary-foreground cursor-pointer hover-lift px-4 py-2"
          >
            All
          </Badge>
          {categories.map((category, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="border-primary/20 hover:bg-primary/10 cursor-pointer hover-lift px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id}
              className="hover-lift glow-border bg-card/50 backdrop-blur-sm group h-full animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <achievement.icon 
                      className={`h-12 w-12 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} 
                    />
                    <div className="absolute -inset-2 bg-gradient-primary rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                </div>
                <CardTitle className="text-lg mb-2">{achievement.title}</CardTitle>
                <p className="text-primary font-medium text-sm">{achievement.subtitle}</p>
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20 mt-2"
                >
                  {achievement.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 text-center">
                  {achievement.description}
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 mx-auto mb-3 text-yellow-500" />
              <div className="text-2xl font-bold text-primary mb-1">8+</div>
              <div className="text-sm text-muted-foreground">Total Achievements</div>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Award className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <div className="text-2xl font-bold text-primary mb-1">7+</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Star className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <div className="text-2xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">Published Papers</div>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mx-auto mb-3 text-green-500" />
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Students Mentored</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Achievements;