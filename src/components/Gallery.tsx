import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import galleryData from "@/data/gallery.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  images: string[];
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Conference":
      return "bg-primary/20 text-primary border-primary/50";
    case "Workshop":
      return "bg-secondary/20 text-secondary border-secondary/50";
    case "Exhibition":
      return "bg-accent/20 text-accent border-accent/50";
    case "Hackathon":
      return "bg-purple-500/20 text-purple-300 border-purple-500/50";
    default:
      return "bg-muted/20 text-muted-foreground border-border";
  }
};

const Gallery = () => {
  const events = galleryData.events as Event[];

  return (
    <section className="py-20 bg-gradient-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-40 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {galleryData.title}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {galleryData.subtitle}
          </p>
        </motion.div>

        {/* Events Carousel */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    className="p-2 h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group overflow-hidden bg-card/80 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 h-full flex flex-col">
                      {/* Title and Badge */}
                      <div className="p-4 pb-2 flex items-start justify-between">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex-1 pr-2">
                          {event.title}
                        </h3>
                        <Badge className={`${getCategoryColor(event.category)} border-2 shrink-0`}>
                          {event.category}
                        </Badge>
                      </div>

                      {/* Nested Images Carousel */}
                      <div className="relative w-full">
                        <Carousel
                          opts={{
                            align: "center",
                            loop: true,
                          }}
                          plugins={[
                            Autoplay({
                              delay: 3000,
                              stopOnInteraction: false,
                            }),
                          ]}
                          className="w-full"
                        >
                          <CarouselContent>
                            {event.images.map((image, idx) => (
                              <CarouselItem key={idx}>
                                <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
                                    animate={{
                                      opacity: [0.3, 0.6, 0.3],
                                      scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                      duration: 4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center text-primary/40 font-semibold text-sm">
                                    Photo {idx + 1} of {event.images.length}
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-2 h-8 w-8 border-primary/50 bg-background/90 backdrop-blur-sm hover:bg-primary/20" />
                          <CarouselNext className="right-2 h-8 w-8 border-primary/50 bg-background/90 backdrop-blur-sm hover:bg-primary/20" />
                        </Carousel>
                      </div>

                      {/* Event Info */}
                      <CardContent className="p-4 pt-3 flex-1 flex flex-col">
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                          {event.description}
                        </p>

                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary shrink-0" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-primary/20" />
            <CarouselNext className="right-2 border-primary/50 bg-background/80 backdrop-blur-sm hover:bg-primary/20" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
