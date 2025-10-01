import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Cpu, Zap } from "lucide-react";
import aboutData from "@/data/about.json";

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Expertise",
    description: "Deep Learning, Computer Vision, NLP",
    color: "text-primary",
  },
  {
    icon: Code,
    title: "Full Stack Dev",
    description: "React, Node.js, Python, Modern Web",
    color: "text-accent",
  },
  {
    icon: Cpu,
    title: "Research Focus",
    description: "Published papers, Active researcher",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Community Leader",
    description: "Tech education & mentorship",
    color: "text-purple-400",
  },
];

const About: React.FC = () => {
  const { personal } = aboutData;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text font-display">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate technologist bridging research and real-world innovation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Highlight Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`inline-flex p-3 rounded-lg bg-secondary mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bio */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="pt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I am <span className="gradient-text font-semibold">{personal.name}</span>, a {personal.degree} graduate from {personal.university}. My expertise centers on <span className="text-primary font-medium">Machine Learning</span>, <span className="text-primary font-medium">Deep Learning</span>, and <span className="text-primary font-medium">Artificial Intelligence</span>—with applications in Bioinformatics, Medical Imaging, and emerging tech domains.
              </p>

              <p className="text-base">
                Throughout my academic journey, I've engaged in research that bridges theory and practice, contributing to projects that address real-world challenges. My passion lies in leveraging AI to build innovative solutions that make a tangible impact.
              </p>

              <p className="text-base">
                As an R&D Engineer and active community leader, I'm committed to advancing the field of AI through continuous learning, mentorship, and collaboration. I'm eager to pursue higher studies and contribute to cutting-edge research that shapes the future of technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
