import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Cpu, Zap, Globe } from "lucide-react";
import aboutData from "@/data/about.json";

// Fact cards data
const randomFacts = [
  {
    title: "Passionate about AI",
    description: "Deeply interested in Machine Learning, Deep Learning, and their real-world applications",
    color: "bg-gradient-to-br from-green-400 to-green-600",
    icon: Brain
  },
  {
    title: "Full Stack Developer", 
    description: "Experienced in building end-to-end web applications using modern technologies",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    icon: Code
  },
  {
    title: "Research Enthusiast",
    description: "Actively contributing to research in sentiment analysis and predictive modeling",
    color: "bg-gradient-to-br from-purple-400 to-purple-600", 
    icon: Cpu
  },
  {
    title: "Tech Community Leader",
    description: "Leading AI education initiatives and building technology communities",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    icon: Zap
  },
  {
    title: "Problem Solver",
    description: "Love tackling complex challenges and finding innovative solutions",
    color: "bg-gradient-to-br from-red-400 to-red-600",
    icon: Globe
  }
];

const About: React.FC = () => {
  const { personal } = aboutData;
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-swap facts every 3 seconds
  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    if (!isHovering) {
      intervalRef.current = window.setInterval(() => {
        setCurrentFactIndex(prev => (prev + 1) % randomFacts.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);

  const nextFact = () => setCurrentFactIndex(prev => (prev + 1) % randomFacts.length);
  const prevFact = () => setCurrentFactIndex(prev => (prev - 1 + randomFacts.length) % randomFacts.length);

  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">ABOUT ME</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover who I am and what drives my passion for technology
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Random Facts Cards */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Random Facts</h3>
              <div className="flex justify-center lg:justify-start gap-2 mb-4">
                {randomFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFactIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentFactIndex ? "bg-primary w-8" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Fact Cards Stack */}
            <div
              className="relative h-80 w-full max-w-md mx-auto lg:mx-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {randomFacts.map((fact, index) => {
                const Icon = fact.icon;
                const isActive = index === currentFactIndex;
                const offset = index - currentFactIndex;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                const zIndex = randomFacts.length - Math.abs(offset);
                const scale = isActive ? 1 : 0.95 - Math.abs(offset) * 0.05;
                const translateY = offset * 12;
                const rotate = offset * 8;

                return (
                  <Card
                    key={index}
                    className={`absolute inset-0 cursor-pointer transition-all duration-500 hover-lift ${
                      isActive ? "shadow-2xl shadow-primary/20" : ""
                    }`}
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                      zIndex
                    }}
                    onClick={nextFact}
                  >
                    <CardContent
                      className={`p-6 h-full flex flex-col justify-center text-white ${fact.color} rounded-lg`}
                    >
                      <div className="text-center">
                        <Icon className="h-12 w-12 mx-auto mb-4 opacity-90" />
                        <h4 className="text-xl font-bold mb-4">{fact.title}</h4>
                        <p className="text-sm leading-relaxed opacity-90">{fact.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevFact}
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextFact}
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side - About content */}
          <div className="space-y-6 prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              I am <span className="gradient-text font-semibold">{personal.name}</span>, a dedicated {personal.degree} graduate from {personal.university}. My expertise lies in <span className="text-primary font-medium">Machine Learning</span>, <span className="text-primary font-medium">Deep Learning</span>, and <span className="text-primary font-medium">Artificial Intelligence</span>, with applications spanning Bioinformatics, Medical Imaging, and advanced technological domains.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Throughout my academic journey, I have engaged in intensive research projects that apply theoretical knowledge to real-world challenges, and I am committed to pushing the boundaries of technology to create innovative solutions.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              I am passionate about pursuing higher studies to deepen my knowledge in technology and research, with a strong focus on solving real-life problems through innovation. My continuous drive to explore cutting-edge technologies fuels my ambition to advance in fields like AI, Machine Learning, and Deep Learning. With experience as an R&D Engineer and participation in numerous leadership roles, I am eager to contribute to impactful projects that address complex societal challenges while staying at the forefront of technological advancements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
