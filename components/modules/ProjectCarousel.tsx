"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// TypeScript interface for project data
interface ProjectData {
  id: number;
  title: string;
  slug: string;
  description: string;
  projectLink: string;
  liveSite: string;
  thumbnail: string;
  features: string[];
  techStack: string[];
  isFeatured: boolean;
  isPublished: boolean;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    name: string;
  };
}

interface ProjectCarouselProps {
  projects: ProjectData[];
  className?: string;
}

export const ProjectCarousel = ({
  projects,
  className,
}: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects.length) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onSelect={(api) => {
          if (api) {
            setCurrentIndex(api.selectedScrollSnap());
          }
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {projects.map((project, index) => (
            <CarouselItem
              key={project.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard project={project} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
  index?: number;
}

const ProjectCard = ({ project, className, index = 0 }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group h-full relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        className="h-full"
      >
        <Card
          className={cn(
            "h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
            "border-border/50 hover:border-primary/20",
            "bg-card/50 backdrop-blur-sm p-0 relative",
            className
          )}
        >
          {/* Hover Overlay Animation */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-xl z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.15, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>

          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <CardHeader className="pb-3 flex-shrink-0 px-6 pt-3 relative z-20">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </CardTitle>
              </motion.div>
              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {project.description}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-0 flex-grow flex flex-col px-6 relative z-20">
            {/* Tech Stack */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {project.techStack.slice(0, 3).map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Spacer to push footer down */}
            <div className="flex-grow"></div>

            {/* Date Info */}
            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground mt-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(project.createdAt)}</span>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="pt-0 flex-shrink-0 px-6 pb-6 relative z-20">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="capitalize">
                  {project.isFeatured && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="default">Featured</Badge>
                    </motion.div>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  {project.projectLink && (
                    <motion.a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                    </motion.a>
                  )}
                  {project.liveSite && (
                    <motion.a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  )}
                  <motion.span
                    className="text-primary font-medium group-hover:text-primary/80 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View project →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};
