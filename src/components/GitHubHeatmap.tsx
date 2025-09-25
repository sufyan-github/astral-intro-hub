import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Activity, Calendar, Star } from "lucide-react";
import GitHubCalendar from 'react-github-calendar';

const GitHubHeatmap = () => {
  const githubStats = [
    { label: "Public Repos", value: "25+", icon: Github },
    { label: "Total Commits", value: "500+", icon: Activity },
    { label: "Contributions", value: "365+", icon: Calendar },
    { label: "Stars Earned", value: "50+", icon: Star }
  ];

  return (
    <section id="github" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">GitHub Activity</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My coding journey and open-source contributions
          </p>
        </div>

        {/* GitHub Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {githubStats.map((stat, index) => (
            <Card 
              key={index}
              className="text-center hover-lift glow-border bg-card/50 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GitHub Contribution Calendar */}
        <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Github className="h-6 w-6 mr-3" />
              Contribution Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <GitHubCalendar 
                username="mdabusufyan22" 
                colorScheme="dark"
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['hsl(var(--muted))', 'hsl(var(--primary) / 0.3)', 'hsl(var(--primary) / 0.6)', 'hsl(var(--primary) / 0.8)', 'hsl(var(--primary))']
                }}
                fontSize={12}
              />
            </div>
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                <a 
                  href="https://github.com/mdabusufyan22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Full Profile
                </a>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GitHubHeatmap;