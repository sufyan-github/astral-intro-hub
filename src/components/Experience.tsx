import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Machine Learning & AI Instructor",
      company: "Artificial Intelligence Bangladesh",
      location: "High Tech Park, Silicon Tower, Rajshahi, Bangladesh",
      period: "March 2024 – Present",
      website: "aibd.ai",
      description: [
        "Conducted hands-on training sessions on Machine Learning, Deep Learning, Computer Vision and Data Science",
        "Designed and delivered course materials covering supervised/unsupervised learning, model evaluation, and deployment workflows",
        "Mentored learners through practical projects, improving their problem-solving and coding skills in Python and ML frameworks",
        "Collaborated with AI Bangladesh community initiatives to expand outreach and promote applied AI education"
      ],
      featured: true
    },
    {
      title: "President",
      company: "RUET IoT Club",
      location: "Rajshahi University of Engineering & Technology, Bangladesh",
      period: "Feb 2025 – Present",
      website: "ruetiotclub.org",
      description: [
        "Organized workshops and events on IoT and smart technologies",
        "Coordinated technical sessions focusing on innovation, automation, and advanced IoT applications",
        "Collaborated with student bodies to enhance hands-on learning and technical collaboration"
      ]
    },
    {
      title: "Research Assistant",
      company: "Machine Learning Research Group",
      location: "Department of CSE, RUET, Rajshahi-6204, Bangladesh",
      period: "Jul 2024 – Present",
      supervisor: "Assistant Prof. SM Mehedi Hasan",
      description: [
        "Engaged in machine learning research with focus on sentiment analysis and predictive modeling",
        "Co-authored papers accepted at ICCIT 2024 on social media bias and time-series forecasting",
        "Developed ML/DL models for detecting sentiment and geopolitical bias in social media text"
      ]
    },
    {
      title: "Campus Representative",
      company: "FutureNation Volunteer",
      location: "RUET, Rajshahi, Bangladesh",
      period: "Jun 2025 – Present",
      website: "futurenation.gov.bd",
      description: [
        "Organized and facilitated FutureNation programs and workshops within the RUET campus",
        "Led university-level initiatives to engage students in skill-building and youth empowerment projects",
        "Collaborated with FutureNation teams and partner organizations to ensure impactful program execution"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Work Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading AI education, research, and community initiatives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className={`mb-8 hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up ${exp.featured ? 'border-primary shadow-glow' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                    <div className="flex items-center text-lg font-semibold mb-2">
                      <Building className="h-5 w-5 mr-2 text-accent" />
                      {exp.company}
                    </div>
                    {exp.website && (
                      <p className="text-sm text-accent mb-2">{exp.website}</p>
                    )}
                    {exp.supervisor && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Supervised by: {exp.supervisor}
                      </p>
                    )}
                  </div>
                  
                  <div className="lg:text-right mt-4 lg:mt-0">
                    <Badge variant="secondary" className="mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {exp.period}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {exp.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;