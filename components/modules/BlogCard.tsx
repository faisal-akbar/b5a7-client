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
import { calculateReadingTime } from "@/lib/calculateReadingTime";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { IBlogPost } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogCardProps {
  blog: IBlogPost;
  className?: string;
  index?: number;
}

export const BlogCard = ({ blog, className, index = 0 }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const readingTime = calculateReadingTime(blog.content) || 5;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group h-full relative"
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
                  {blog.title}
                </CardTitle>
              </motion.div>
              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {blog.excerpt}
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-0 flex-grow flex flex-col px-6 relative z-20">
            {/* Tags */}
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
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Spacer to push footer down */}
            <div className="flex-grow"></div>

            {/* Author and Date Info */}
            <motion.div
              className="flex items-center gap-4 text-sm text-muted-foreground mt-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              {/* <div className="flex items-center gap-1 ml-auto">
                <Eye className="h-4 w-4" />
                <span>{blog.views}</span>
              </div> */}
              <span className="flex items-center gap-1 ml-auto">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
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
                  {blog.isFeatured && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="default">Featured</Badge>
                    </motion.div>
                  )}
                </span>
                <motion.span
                  className="text-primary font-medium group-hover:text-primary/80 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Read more →
                </motion.span>
              </div>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};
