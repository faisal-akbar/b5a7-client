"use client";

import { cn } from "@/lib/utils";
import { DashboardBlogCard } from "./DashboardBlogCard";

interface BlogData {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  excerpt: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

interface DashboardBlogCardGridProps {
  blogs: BlogData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export const DashboardBlogCardGrid = ({
  blogs,
  className,
  columns = 3,
}: DashboardBlogCardGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  } as const;

  return (
    <div
      className={cn("grid gap-8 items-stretch", gridCols[columns], className)}
    >
      {blogs.map((blog, index) => (
        <DashboardBlogCard key={blog.id} blog={blog} index={index} />
      ))}
    </div>
  );
};
