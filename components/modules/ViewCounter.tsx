// app/posts/[slug]/ViewCounter.tsx
"use client";
import { useEffect } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    // Make a POST request to your API route
    const incrementView = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/increment-views`,
          {
            method: "POST",
            body: JSON.stringify({ slug }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Failed to increment view count", error);
      }
    };
    incrementView();
  }, [slug]);

  return null;
}
