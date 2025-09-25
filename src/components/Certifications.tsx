import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Award, Calendar, Building, ExternalLink } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "CAPM® Certification",
      issuer: "Project Management Institute (PMI)",
      date: "2024",
      description: "Certified Associate in Project Management - demonstrating knowledge of project management fundamentals and terminology.",
      image: "/placeholder.svg",
      credentialId: "PMI-CAPM-2024-001",
      verificationUrl: "#",
      skills: ["Project Management", "Risk Assessment", "Stakeholder Management"]
    },
    {
      id: 2,
      title: "App Development with Flutter",
      issuer: "Ostad",
      date: "2024",
      description: "Comprehensive course covering Flutter framework, Dart programming, and mobile app development best practices.",
      image: "/placeholder.svg",
      credentialId: "OSTAD-FLUTTER-2024",
      verificationUrl: "#",
      skills: ["Flutter", "Dart", "Mobile Development", "UI/UX"]
    },
    {
      id: 3,
      title: "Introduction to Machine Learning",
      issuer: "Kaggle",
      date: "2024",
      description: "Foundational course covering ML algorithms, data preprocessing, model evaluation, and practical implementation.",
      image: "/placeholder.svg",
      credentialId: "KAGGLE-ML-INTRO",
      verificationUrl: "#",
      skills: ["Machine Learning", "Python", "Data Science", "Model Training"]
    },
    {
      id: 4,
      title: "Basic Networking Exam",
      issuer: "Cisco",
      date: "2023",
      description: "Fundamental networking concepts, protocols, and network configuration principles.",
      image: "/placeholder.svg",
      credentialId: "CISCO-NET-BASIC",
      verificationUrl: "#",
      skills: ["Networking", "TCP/IP", "Network Security", "Routing"]
    },
    {
      id: 5,
      title: "Art of Problem Definition",
      issuer: "Generation Unlimited",
      date: "2024",
      description: "Strategic problem-solving methodologies and analytical thinking for complex challenges.",
      image: "/placeholder.svg",
      credentialId: "GU-PROBLEM-DEF",
      verificationUrl: "#",
      skills: ["Problem Solving", "Critical Thinking", "Analysis", "Strategy"]
    },
    {
      id: 6,
      title: "Workplace Communication Essentials",
      issuer: "Generation Unlimited",
      date: "2024",
      description: "Professional communication skills, presentation techniques, and collaborative work methods.",
      image: "/placeholder.svg",
      credentialId: "GU-COMM-ESS",
      verificationUrl: "#",
      skills: ["Communication", "Presentation", "Leadership", "Collaboration"]
    },
    {
      id: 7,
      title: "The SDG Primer",
      issuer: "UNDP Bangladesh",
      date: "2025",
      description: "Understanding Sustainable Development Goals and their implementation in developing countries.",
      image: "/placeholder.svg",
      credentialId: "UNDP-SDG-PRIMER",
      verificationUrl: "#",
      skills: ["Sustainability", "Development Goals", "Policy", "Social Impact"]
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and continuous learning achievements
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {certifications.map((cert) => (
                <CarouselItem key={cert.id}>
                  <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm h-full">
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Award className="h-12 w-12 text-primary" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{cert.title}</CardTitle>
                      <div className="flex items-center justify-center text-muted-foreground mb-2">
                        <Building className="h-4 w-4 mr-2" />
                        {cert.issuer}
                      </div>
                      <div className="flex items-center justify-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {cert.date}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Award className="h-16 w-16 text-primary-foreground" />
                        </div>
                        <p className="text-muted-foreground mb-4">{cert.description}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          <strong>Credential ID:</strong> {cert.credentialId}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-center">Skills Acquired</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                          {cert.skills.map((skill, index) => (
                            <Badge 
                              key={index}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Verification Button */}
                      <div className="text-center">
                        <Button 
                          variant="outline" 
                          className="border-primary/20 hover:bg-primary/10"
                          onClick={() => window.open(cert.verificationUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Verify Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {certifications.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary cursor-pointer transition-colors"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;