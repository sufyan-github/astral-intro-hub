import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages, Brain, Users, Target, Lightbulb, MessageSquare } from "lucide-react";
import aboutData from "@/data/about.json";

const LanguagesSkills = () => {
  const { languages, softSkills } = aboutData;
  
  const skillIcons = [
    { name: "Leadership", icon: Users, color: "from-blue-500 to-purple-600" },
    { name: "Problem Solving", icon: Brain, color: "from-green-500 to-teal-600" },
    { name: "Communication", icon: MessageSquare, color: "from-orange-500 to-red-600" },
    { name: "Strategic Planning", icon: Target, color: "from-purple-500 to-pink-600" },
    { name: "Innovation", icon: Lightbulb, color: "from-yellow-500 to-orange-600" },
    { name: "Team Management", icon: Users, color: "from-indigo-500 to-blue-600" },
  ];

  return (
    <section id="languages-skills" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text font-display">LANGUAGES & SKILLS</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Communication abilities and personal competencies
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Languages Section */}
          <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                  <Languages className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text font-display">Languages</h3>
              </div>
              
              <div className="space-y-6">
                {languages.map((lang: any, index: number) => (
                  <div key={lang.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg">{lang.name}</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {lang.level}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 group-hover:animate-pulse"
                        style={{ 
                          width: lang.level === 'Native' ? '100%' : 
                                 lang.level === 'Fluent' ? '85%' : 
                                 lang.level === 'Conversational' ? '70%' : '50%',
                          animationDelay: `${index * 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Soft Skills Section */}
          <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mr-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold gradient-text font-display">Soft Skills</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill: string, index: number) => {
                  const skillIcon = skillIcons.find(s => skill.toLowerCase().includes(s.name.toLowerCase().split(' ')[0])) || skillIcons[index % skillIcons.length];
                  const Icon = skillIcon.icon;
                  
                  return (
                    <div 
                      key={skill}
                      className="group p-4 rounded-lg bg-gradient-to-br from-card/50 to-muted/30 border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skillIcon.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium text-sm group-hover:text-primary transition-colors duration-300">
                          {skill}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSkills;