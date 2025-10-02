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
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

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

interface DashboardBlogCardProps {
  blog: BlogData;
  className?: string;
  index?: number;
}

export const DashboardBlogCard = ({
  blog,
  className,
  index = 0,
}: DashboardBlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Delete this blog? This action cannot be undone.")) return;
    startTransition(async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`, {
          method: "DELETE",
        });
        router.refresh();
      } catch (error) {
        console.error(error);
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
              src={blog.thumbnail}
              alt={blog.title}
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
                blog.isPublished ? "bg-emerald-600" : "bg-amber-600"
              )}
            >
              {blog.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>

          {/* Actions on image */}
          <div className="absolute top-3 right-3 z-20 flex gap-2">
            <Link href={`/dashboard/blogs/edit-blog/${blog.id}`}>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
                {blog.title}
              </CardTitle>
            </motion.div>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {blog.excerpt}
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
            {blog.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.div
                key={tagIndex}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="outline" className="text-xs">
                  {tag}
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
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="ml-auto">
              {blog.isPublished ? (
                <span className="text-emerald-600">Ready</span>
              ) : (
                <span className="text-amber-600">Needs review</span>
              )}
            </div>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-0 flex-shrink-0 px-6 pb-6 relative z-20">
          <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
            <span className="capitalize">
              {blog.isFeatured && <Badge variant="default">Featured</Badge>}
            </span>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-primary font-medium"
            >
              View public →
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
