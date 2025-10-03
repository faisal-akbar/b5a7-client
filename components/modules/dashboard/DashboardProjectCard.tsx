"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { deleteProject } from "@/services/Project";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Edit, ExternalLink, Github, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";

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

interface DashboardProjectCardProps {
  project: ProjectData;
  className?: string;
  index?: number;
}

export const DashboardProjectCard = ({
  project,
  className,
  index = 0,
}: DashboardProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteProject(project.id);
        toast.success("Project deleted successfully");
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete project");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
          "border-border/50 hover:border-primary/20",
          "bg-card/50 backdrop-blur-sm p-0 relative",
          className
        )}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-xl z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.15 } }}
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

          {/* Status badge on image */}
          <div className="absolute top-3 left-3 z-20">
            <Badge
              className={cn(
                project.isPublished ? "bg-emerald-600" : "bg-amber-600"
              )}
            >
              {project.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>

          {/* Actions on image */}
          <div className="absolute top-3 right-3 z-20 flex gap-2">
            <Link href={`/dashboard/projects/edit-project/${project.id}`}>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>

            <DeleteConfirmation
              trigger={
                <Button size="icon" variant="destructive" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
              title="Are you absolutely sure?"
              description={`This action cannot be undone. This will permanently delete the project`}
              onConfirm={() => {
                handleDelete();
              }}
              isLoading={isPending}
            />
          </div>
        </div>

        <CardHeader className="pb-3 flex-shrink-0 px-6 pt-3 relative z-20">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <CardTitle className="line-clamp-2 text-xl font-bold leading-tight">
                {project.title}
              </CardTitle>
            </motion.div>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="pt-0 flex-grow flex flex-col px-6 relative z-20">
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
                <Badge variant="outline" className="text-xs">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex-grow" />

          <motion.div
            className="flex items-center gap-4 text-sm text-muted-foreground mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="ml-auto">
              {project.isPublished ? (
                <span className="text-emerald-600">Ready</span>
              ) : (
                <span className="text-amber-600">Needs review</span>
              )}
            </div>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-0 flex-shrink-0 px-6 pb-6 relative z-20">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.isFeatured && <Badge variant="default">Featured</Badge>}
            </div>
            <div className="flex items-center gap-2">
              {project.isPublished && (
                <>
                  <Link
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                  <Link
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

