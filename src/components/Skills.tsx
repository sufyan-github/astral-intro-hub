import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Brain, Wrench, Sparkles, Award, TrendingUp } from "lucide-react";
import skills from "@/data/skills.json" assert { type: "json" };

// ===============================
// Type Definitions
// ===============================
export type SkillItem = { name: string; level: number };
export type SkillCategory = {
  title: string;
  icon: "code" | "brain" | "database" | "wrench";
  skills: SkillItem[];
};

// ===============================
// Category Icons (Lucide)
// ===============================
const iconMap = {
  code: Code,
  brain: Brain,
  database: Database,
  wrench: Wrench,
} as const;

// ===============================
// Tech Logos (React Icons)
// ===============================
import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaLaravel,
  FaLinux,
  FaFigma,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiTensorflow,
  SiPytorch,
  SiJavascript,
  SiFirebase,
  SiPostman,
} from "react-icons/si";

const techIconMap: Record<string, JSX.Element> = {
  python: <FaPython className="text-yellow-500" />,
  javascript: <SiJavascript className="text-yellow-400" />,
  react: <FaReact className="text-sky-400" />,
  node: <FaNodeJs className="text-green-600" />,
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-500" />,
  tailwind: <SiTailwindcss className="text-cyan-400" />,
  "machine learning": <SiTensorflow className="text-orange-400" />,
  tensorflow: <SiTensorflow className="text-orange-400" />,
  pytorch: <SiPytorch className="text-red-500" />,
  "data science": <FaDatabase className="text-indigo-500" />,
  mysql: <FaDatabase className="text-blue-600" />,
  mongodb: <SiMongodb className="text-green-500" />,
  express: <SiExpress className="text-gray-500" />,
  php: <FaPhp className="text-indigo-600" />,
  laravel: <FaLaravel className="text-red-500" />,
  firebase: <SiFirebase className="text-yellow-500" />,
  "rest api": <SiPostman className="text-orange-500" />,
  git: <FaGitAlt className="text-orange-600" />,
  github: <FaGitAlt className="text-gray-800" />,
  docker: <FaDocker className="text-blue-500" />,
  postman: <SiPostman className="text-orange-500" />,
  figma: <FaFigma className="text-pink-500" />,
  linux: <FaLinux className="text-black" />,
};

// ===============================
// Tech Logo Component
// ===============================
const TechLogo = ({ name }: { name: string }) => {
  const key = Object.keys(techIconMap).find((k) =>
    name.toLowerCase().includes(k)
  );
  return (
    <span className="text-2xl mr-3 transition-transform duration-300 hover:scale-125">
      {key ? techIconMap[key] : "💻"}
    </span>
  );
};

// ===============================
// Skills Component
// ===============================
const Skills: React.FC = () => {
  const skillCategories = skills as SkillCategory[];

  // Calculate stats
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const avgLevel = Math.round(
    skillCategories.reduce(
      (sum, cat) => sum + cat.skills.reduce((s, sk) => s + sk.level, 0),
      0
    ) / totalSkills
  );

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-5xl font-extrabold gradient-text font-display">
              Skills & Expertise
            </h2>
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technical proficiency across multiple domains with a focus on{" "}
            <span className="text-primary font-semibold">Artificial Intelligence</span> and{" "}
            <span className="text-accent font-semibold">Full-Stack Development</span>
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="text-center hover-lift glow-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-primary/20">
            <CardContent className="p-6">
              <Award className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold gradient-text mb-1">{totalSkills}+</div>
              <div className="text-sm text-muted-foreground font-medium">Technical Skills</div>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift glow-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-accent/20">
            <CardContent className="p-6">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold gradient-text mb-1">{avgLevel}%</div>
              <div className="text-sm text-muted-foreground font-medium">Average Proficiency</div>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift glow-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-primary/20">
            <CardContent className="p-6">
              <Code className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold gradient-text mb-1">{skillCategories.length}</div>
              <div className="text-sm text-muted-foreground font-medium">Core Domains</div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Code;
            return (
              <Card
                key={category.title + index}
                className="hover:shadow-2xl hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl border-2 border-border/50 group overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card Header with Gradient Background */}
                <div className="relative p-6 pb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                  <div className="relative flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
                      <div className="relative p-3 rounded-2xl bg-gradient-primary shadow-lg">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text font-display">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name + skillIndex} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <TechLogo name={skill.name} />
                            <span className="font-semibold text-lg">{skill.name}</span>
                          </div>
                          <Badge 
                            className="bg-primary/10 text-primary border-primary/30 px-3 py-1 text-sm font-bold"
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        
                        {/* Custom Progress Bar */}
                        <div className="relative h-3 bg-muted/50 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000 ease-out animate-shimmer"
                            style={{ 
                              width: `${skill.level}%`,
                              animationDelay: `${(index * 3 + skillIndex) * 0.1}s`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-lg mb-4">
            Continuously learning and expanding my technical expertise
          </p>
          <div className="flex justify-center items-center space-x-2 text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
