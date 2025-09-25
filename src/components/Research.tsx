import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Users, Calendar } from "lucide-react";

const Research = () => {
  const publications = [
    {
      title: "A Cross-Analyzing Approach to Sentiment and Bias Detection in Social Media: Insights from Geopolitical Conflicts",
      conference: "ICCiT 2024",
      location: "Cox's Bazar, Bangladesh",
      year: "2024",
      type: "Conference Paper",
      description: "Developed advanced ML/DL models for detecting sentiment and geopolitical bias in social media content, providing insights into information warfare and public opinion manipulation during conflicts.",
      keywords: ["Sentiment Analysis", "Bias Detection", "Social Media", "Machine Learning", "NLP"]
    },
    {
      title: "Improving Monkeypox Outbreak Prediction Through Time-Series Forecasting with Machine Learning Models",
      conference: "ICCiT 2024", 
      location: "Cox's Bazar, Bangladesh",
      year: "2024",
      type: "Conference Paper",
      description: "Built sophisticated forecasting models using LSTM, GRU, and ensemble methods to predict Monkeypox outbreak trends, contributing to public health preparedness and response strategies.",
      keywords: ["Time Series Forecasting", "LSTM", "GRU", "Healthcare Analytics", "Predictive Modeling"]
    }
  ];

  const researchInterests = [
    "Machine Learning",
    "Deep Learning", 
    "Computer Vision",
    "Sentiment Analysis",
    "Time-Series Forecasting",
    "Predictive Modeling",
    "Natural Language Processing",
    "AI for Social Good"
  ];

  return (
    <section id="research" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Research & Publications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contributing to AI research with focus on social impact and healthcare applications
          </p>
        </div>

        {/* Research Interests */}
        <Card className="mb-12 hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Research Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3">
              {researchInterests.map((interest, index) => (
                <Badge 
                  key={index}
                  className="bg-gradient-primary text-primary-foreground px-4 py-2 text-sm hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Publications */}
        <div className="space-y-8">
          {publications.map((paper, index) => (
            <Card 
              key={index}
              className="hover-lift glow-border bg-card/50 backdrop-blur-sm border-primary shadow-glow animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3 leading-relaxed">
                      {paper.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        {paper.type}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {paper.conference}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {paper.year}
                      </div>
                    </div>
                    <p className="text-sm text-accent mb-4">{paper.location}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {paper.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {paper.keywords.map((keyword, keyIndex) => (
                    <Badge 
                      key={keyIndex}
                      variant="secondary"
                      className="hover-lift animate-scale-in"
                      style={{ animationDelay: `${(index * 3 + keyIndex) * 0.05}s` }}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="glow-border hover-lift">
                    <FileText className="h-4 w-4 mr-2" />
                    Read Paper
                  </Button>
                  <Button variant="outline" size="sm" className="glow-border hover-lift">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Conference
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research Assistant Info */}
        <Card className="mt-12 hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Current Research Position</h3>
            <p className="text-lg text-muted-foreground mb-4">
              Research Assistant at Machine Learning Research Group
            </p>
            <p className="text-muted-foreground mb-4">
              Department of Computer Science & Engineering, RUET, Rajshahi-6204, Bangladesh
            </p>
            <p className="text-sm text-accent">
              Supervised by: Assistant Prof. SM Mehedi Hasan
            </p>
            <div className="mt-6">
              <Button className="bg-gradient-primary hover:shadow-glow">
                View Research Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Research;