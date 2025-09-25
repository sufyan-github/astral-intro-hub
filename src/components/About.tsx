import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import aboutData from "@/data/about.json";

const About = () => {
  const { education, personal, interests, languages, softSkills } = aboutData;

  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate technologist dedicated to advancing AI research and education
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education & Personal Info */}
          <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Education & Background</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {education.degree}
                  </h4>
                  <p className="text-muted-foreground mb-1">
                    {education.institution}
                  </p>
                  <p className="text-sm text-accent">
                    CGPA: {education.cgpa} | {education.years}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {personal.address}
                  </div>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    {personal.phone}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {personal.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests, Languages & Skills */}
          <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Research Interests</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {interests.map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-gradient-primary text-primary-foreground hover-lift animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-4">Languages</h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold mb-3">Soft Skills</h4>
                <p className="text-muted-foreground">
                  {softSkills.join(" • ")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
