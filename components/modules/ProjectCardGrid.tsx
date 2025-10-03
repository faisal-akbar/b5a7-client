"use client";

import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

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

interface ProjectCardGridProps {
  projects: ProjectData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export const ProjectCardGrid = ({
  projects,
  className,
  columns = 3,
}: ProjectCardGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-8 items-stretch", gridCols[columns], className)}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

