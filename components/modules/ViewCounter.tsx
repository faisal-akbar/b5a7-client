// app/posts/[slug]/ViewCounter.tsx
"use client";
import config from "@/config";
import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasIncremented = useRef<boolean>(false);

  useEffect(() => {
    const handleViewCount = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Only increment once per component mount
        if (!hasIncremented.current) {
          hasIncremented.current = true;

          // First, increment the view count (this should be the primary action)
          const incrementResponse = await fetch(
            `${config.baseUrl}/blog/views/${slug}/increment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!incrementResponse.ok) {
            throw new Error(
              `Failed to increment views: ${incrementResponse.status}`
            );
          }

          await incrementResponse.json();
        }

        // Then get the updated view count
        const getViewsResponse = await fetch(
          `${config.baseUrl}/blog/views/${slug}`
        );

        if (!getViewsResponse.ok) {
          throw new Error(`Failed to get views: ${getViewsResponse.status}`);
        }

        const { data } = await getViewsResponse.json();
        setViews(data.views);
      } catch (error) {
        console.error("Failed to handle view count", error);
        setError(
          error instanceof Error ? error.message : "Failed to load view count"
        );

        // Fallback: try to get views without incrementing
        try {
          const fallbackResponse = await fetch(
            `${config.baseUrl}/blog/views/${slug}`
          );
          if (fallbackResponse.ok) {
            const { data } = await fallbackResponse.json();
            setViews(data.views);
          }
        } catch (fallbackError) {
          console.error("Fallback view fetch also failed", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleViewCount();
  }, [slug]);

  if (isLoading) {
    return (
      <span className="flex items-center gap-1.5">
        <Eye className="h-5 w-5" />
        <span className="ml-0">Loading...</span>
      </span>
    );
  }

  if (error) {
    return (
      <span className="flex items-center gap-1.5">
        <Eye className="h-5 w-5" />
        <span className="ml-0 text-red-500" title={error}>
          Error
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5">
      <Eye className="h-5 w-5" />
      <span className="ml-0">{views ? views.toLocaleString() : "–––"}</span>
    </span>
  );
}
