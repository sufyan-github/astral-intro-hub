import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Brain, Wrench } from "lucide-react";

// ================================================
// JSON-DRIVEN SKILLS (Certifications moved elsewhere)
// Data file: src/data/skills.json
// Ensure tsconfig has: "resolveJsonModule": true, "esModuleInterop": true
// ================================================

import skills from "@/data/skills.json" assert { type: "json" };

export type SkillItem = { name: string; level: number };
export type SkillCategory = {
  title: string;
  icon: "code" | "brain" | "database" | "wrench"; // JSON-friendly key
  skills: SkillItem[];
};

// Icon mapping from JSON-friendly keys → Lucide components
const iconMap = {
  code: Code,
  brain: Brain,
  database: Database,
  wrench: Wrench,
} as const;

// Tech logo emoji based on skill name
const TechLogo = ({ name }: { name: string }) => {
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    if (name.includes("python")) return "🐍";
    if (name.includes("javascript")) return "⚡";
    if (name.includes("react")) return "⚛️";
    if (name.includes("node")) return "💚";
    if (name.includes("html") || name.includes("css")) return "🌐";
    if (name.includes("tailwind")) return "🎨";
    if (name.includes("machine learning") || name.includes("ml")) return "🤖";
    if (name.includes("deep learning") || name.includes("dl")) return "🧠";
    if (name.includes("computer vision")) return "👁️";
    if (name.includes("nlp")) return "💬";
    if (name.includes("tensorflow") || name.includes("pytorch")) return "📊";
    if (name.includes("data science")) return "📈";
    if (name.includes("mysql")) return "🗃️";
    if (name.includes("mongodb")) return "🍃";
    if (name.includes("express")) return "🚀";
    if (name.includes("php") || name.includes("laravel")) return "🐘";
    if (name.includes("firebase")) return "🔥";
    if (name.includes("rest api")) return "🌍";
    if (name.includes("git") || name.includes("github")) return "📚";
    if (name.includes("vs code")) return "📝";
    if (name.includes("docker")) return "🐳";
    if (name.includes("postman")) return "📮";
    if (name.includes("figma")) return "🎯";
    if (name.includes("linux")) return "🐧";
    return "💻";
  };

  return <span className="text-lg mr-2 animate-pulse">{getTechIcon(name)}</span>;
};

const Skills: React.FC = () => {
  const skillCategories = skills as SkillCategory[];

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
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Code;
            return (
              <Card
                key={category.title + index}
                className="hover-lift glow-border bg-card/50 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Icon className="h-6 w-6 mr-3 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name + skillIndex} className="space-y-2">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;