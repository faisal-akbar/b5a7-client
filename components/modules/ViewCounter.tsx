// app/posts/[slug]/ViewCounter.tsx
"use client";
import config from "@/config";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0);
  useEffect(() => {
    const getViews = async () => {
      try {
        const res = await fetch(`${config.baseUrl}/blog/views/${slug}`);
        const { data } = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error("Failed to get view count", error);
      }
    };
    getViews();
  }, [slug]);
  return (
    <span className="flex items-center gap-1.5">
      <Eye className="h-5 w-5" />
      <span className="ml-0">{views ? views.toLocaleString() : "–––"}</span>
    </span>
  );
}
