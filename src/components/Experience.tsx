import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';
import experienceData from '@/data/experience.json';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  website?: string;
  supervisor?: string;
  description: string[];
  featured?: boolean;
  logo?: string; // optional logo file name, e.g., "google.png"
};

const toUrl = (site?: string) => {
  if (!site) return undefined;
  if (site.startsWith('http://') || site.startsWith('https://')) return site;
  return `https://${site}`;
};

const Experience: React.FC = () => {
  const experiences = useMemo(() => experienceData as ExperienceItem[], []);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading AI education, research, and community initiatives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <Card
              key={exp.title + exp.company + index}
              className={`mb-8 hover-lift glow-border bg-card/50 backdrop-blur-sm animate-slide-up ${
                exp.featured ? 'border-primary shadow-glow' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-stretch gap-6 mb-6 min-h-[120px]">
                  {/* Company Logo */}
                  <div className="flex-shrink-0 flex items-center">
                    <div className="w-60 h-60 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
                      {exp.logo ? (
                        <img
                          src={exp.logo ? exp.logo : undefined} // Use full path from JSON
                          alt={exp.company}
                          className="object-contain w-full h-full p-2"
                        />
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          {exp.company
                            .split(' ')
                            .map(word => word[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold gradient-text mb-2 break-words">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-lg font-semibold text-primary mb-2 break-words">
                          <Building className="h-5 w-5 mr-2" />
                          {exp.company}
                        </div>
                        {exp.website && (
                          <p className="text-sm text-accent mb-2 truncate">
                            <a
                              href={toUrl(exp.website)}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {exp.website}
                            </a>
                          </p>
                        )}
                        {exp.supervisor && (
                          <p className="text-sm text-muted-foreground mb-2">
                            Supervised by: {exp.supervisor}
                          </p>
                        )}
                      </div>

                      <div className="lg:text-right mt-4 lg:mt-0 flex-shrink-0">
                        <Badge
                          variant="secondary"
                          className="mb-2 bg-primary/10 text-primary border-primary/20"
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.period}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground lg:justify-end">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="break-words">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p className="text-muted-foreground">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
