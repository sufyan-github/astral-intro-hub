// src/sections/Certifications.tsx
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Award, Calendar, Building, ExternalLink } from "lucide-react";

// 1) Put your data in: src/data/certifications.json
//    Shape supports either { "image": "/certs/file.jpg" } OR { "images": { "center": "/certs/file.jpg" } }
import rawCerts from "@/data/certifications.json";

type RawCert = {
  id: number | string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
  image?: string;
  images?: { center?: string };
};

type Cert = Omit<RawCert, "image" | "images"> & { images: { center: string } };

// 2) Optional placeholder (place a file at public/certs/placeholder.png)
const PLACEHOLDER = "/certs/placeholder.png";

const Certifications: React.FC = () => {
  // Normalize JSON so UI always reads cert.images.center
  const certifications = useMemo<Cert[]>(
    () =>
      (rawCerts as RawCert[]).map((c) => ({
        ...c,
        images: {
          center: c.images?.center ?? c.image ?? PLACEHOLDER,
        },
      })),
    []
  );

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and continuous learning achievements
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {certifications.map((cert) => (
                <CarouselItem key={cert.id}>
                  <Card className="hover-lift glow-border bg-card/50 backdrop-blur-sm h-full">
                    {/* Top: compact info */}
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-2">
                        <Award className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{cert.title}</CardTitle>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                        <span className="inline-flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          {cert.issuer}
                        </span>
                        <span className="inline-flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {cert.date}
                        </span>
                        {cert.credentialId && (
                          <Badge variant="secondary" className="border-primary/20">
                            ID: {cert.credentialId}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    {/* Center: certificate image */}
                    <CardContent className="px-4 md:px-6">
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-auto rounded-xl border mx-auto mb-4">
                        <img
                          src={cert.images.center}
                          alt={`${cert.title} — certificate`}
                          className="min-w-full min-h-full object-contain select-none"
                          draggable={false}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER;
                          }}
                        />
                      </div>

                      {/* Bottom: short info + skills + verify */}
                      {cert.description && (
                        <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto mb-3">
                          {cert.description}
                        </p>
                      )}

                      {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {cert.skills.map((skill, i) => (
                            <Badge
                              key={`${cert.id}-${skill}-${i}`}
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {cert.verificationUrl && cert.verificationUrl !== "#" && (
                        <div className="text-center">
                          <Button
                            variant="outline"
                            className="border-primary/20 hover:bg-primary/10"
                            onClick={() => window.open(cert.verificationUrl!, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Verify Certificate
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Dots */}
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
