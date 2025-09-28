// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Code, Database, Brain, Wrench } from "lucide-react";

// import skills from "@/data/skills.json" assert { type: "json" };

// export type SkillItem = { name: string; level: number };
// export type SkillCategory = {
//   title: string;
//   icon: "code" | "brain" | "database" | "wrench";
//   skills: SkillItem[];
// };

// const iconMap = {
//   code: Code,
//   brain: Brain,
//   database: Database,
//   wrench: Wrench,
// } as const;

// // Tech logo emoji with hover animation
// const TechLogo = ({ name }: { name: string }) => {
//   const getTechIcon = (techName: string) => {
//     const n = techName.toLowerCase();
//     if (n.includes("python")) return "🐍";
//     if (n.includes("javascript")) return "⚡";
//     if (n.includes("react")) return "⚛️";
//     if (n.includes("node")) return "💚";
//     if (n.includes("html") || n.includes("css")) return "🌐";
//     if (n.includes("tailwind")) return "🎨";
//     if (n.includes("machine learning") || n.includes("ml")) return "🤖";
//     if (n.includes("deep learning") || n.includes("dl")) return "🧠";
//     if (n.includes("computer vision")) return "👁️";
//     if (n.includes("nlp")) return "💬";
//     if (n.includes("tensorflow") || n.includes("pytorch")) return "📊";
//     if (n.includes("data science")) return "📈";
//     if (n.includes("mysql")) return "🗃️";
//     if (n.includes("mongodb")) return "🍃";
//     if (n.includes("express")) return "🚀";
//     if (n.includes("php") || n.includes("laravel")) return "🐘";
//     if (n.includes("firebase")) return "🔥";
//     if (n.includes("rest api")) return "🌍";
//     if (n.includes("git") || n.includes("github")) return "📚";
//     if (n.includes("vs code")) return "📝";
//     if (n.includes("docker")) return "🐳";
//     if (n.includes("postman")) return "📮";
//     if (n.includes("figma")) return "🎯";
//     if (n.includes("linux")) return "🐧";
//     return "💻";
//   };

//   return (
//     <span className="text-lg mr-2 transition-transform duration-300 hover:scale-125">
//       {getTechIcon(name)}
//     </span>
//   );
// };

// const Skills: React.FC = () => {
//   const skillCategories = skills as SkillCategory[];

//   return (
//     <section id="skills" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
//       <div className="container mx-auto px-6">
//         {/* Section Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold mb-4 gradient-text drop-shadow-sm">
//             Skills & Expertise
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Technical proficiency across multiple domains with a focus on{" "}
//             <span className="text-primary font-semibold">AI</span> and{" "}
//             <span className="text-primary font-semibold">Web Development</span>.
//           </p>
//         </div>

//         {/* Skills Grid */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {skillCategories.map((category, index) => {
//             const Icon = iconMap[category.icon] ?? Code;
//             return (
//               <Card
//                 key={category.title + index}
//                 className="hover:shadow-lg hover:border-primary/40 transition-all duration-300 bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50"
//                 style={{ animationDelay: `${index * 0.2}s` }}
//               >
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center text-xl font-bold text-foreground">
//                     <span className="p-2 rounded-lg bg-primary/10 mr-3">
//                       <Icon className="h-6 w-6 text-primary" />
//                     </span>
//                     {category.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-5">
//                     {category.skills.map((skill, skillIndex) => (
//                       <div key={skill.name + skillIndex} className="space-y-2">
//                         <div className="flex justify-between items-center">
//                           <div className="flex items-center">
//                             <TechLogo name={skill.name} />
//                             <span className="font-medium">{skill.name}</span>
//                           </div>
//                           <span className="text-sm text-muted-foreground font-medium">
//                             {skill.level}%
//                           </span>
//                         </div>
//                         <Progress
//                           value={skill.level}
//                           className="h-2 rounded-full overflow-hidden"
//                         >
//                           <div
//                             className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700 ease-out"
//                             style={{ width: `${skill.level}%` }}
//                           />
//                         </Progress>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Brain, Wrench } from "lucide-react";

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
    <span className="text-xl mr-2 transition-transform duration-300 hover:scale-125">
      {key ? techIconMap[key] : "💻"}
    </span>
  );
};

// ===============================
// Skills Component
// ===============================
const Skills: React.FC = () => {
  const skillCategories = skills as SkillCategory[];

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background via-muted/30 to-background"
    >
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 gradient-text drop-shadow-sm">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical proficiency across multiple domains with a focus on{" "}
            <span className="text-primary font-semibold">AI</span> and{" "}
            <span className="text-primary font-semibold">Web Development</span>.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Code;
            return (
              <Card
                key={category.title + index}
                className="hover:shadow-lg hover:border-primary/40 transition-all duration-300 bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-foreground">
                    <span className="p-2 rounded-lg bg-primary/10 mr-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </span>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name + skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <TechLogo name={skill.name} />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </Progress>
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
