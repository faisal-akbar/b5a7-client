"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  excerpt?: string;
}

interface TableOfContentsProps {
  contentId?: string;
}

export const TableOfContents = ({
  contentId = "blog-content",
}: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const extractHeadings = () => {
      const contentElement = document.getElementById(contentId);
      if (!contentElement) return;

      const headingElements = contentElement.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((heading, index) => {
        // Create a more meaningful ID based on the heading text
        const text = heading.textContent || "";
        const id =
          text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/^-+|-+$/g, "") || `heading-${index}`;

        heading.id = id;

        // Extract content excerpt for this heading
        let excerpt = "";
        let currentElement = heading.nextElementSibling;
        let contentLength = 0;
        const maxLength = 200; // Maximum characters for excerpt

        // Get content until next heading or end of content
        while (currentElement && contentLength < maxLength) {
          if (
            currentElement.tagName &&
            currentElement.tagName.match(/^H[1-6]$/)
          ) {
            break; // Stop at next heading
          }

          const textContent = currentElement.textContent || "";
          if (textContent.trim()) {
            excerpt += textContent.trim() + " ";
            contentLength = excerpt.length;
          }

          currentElement = currentElement.nextElementSibling;
        }

        // Clean up excerpt
        excerpt = excerpt.trim().substring(0, maxLength);
        if (excerpt.length >= maxLength) {
          excerpt += "...";
        }

        extractedHeadings.push({
          id,
          text: text.trim(),
          level: parseInt(heading.tagName.charAt(1)),
          excerpt: excerpt || undefined,
        });
      });

      setHeadings(extractedHeadings);
      setIsLoading(false);
    };

    // Extract headings after content is loaded
    const timer = setTimeout(extractHeadings, 100);

    return () => clearTimeout(timer);
  }, [contentId]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      let current = "";

      // Find the heading that's currently in view
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        // Adjust the threshold to match our scroll positioning
        if (rect.top <= 100) {
          current = heading.id;
          break;
        }
      }

      setActiveId(current);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the element's position relative to the document
      const elementRect = element.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const elementTop = elementRect.top + currentScrollY;

      // Calculate the exact position we want (accounting for navbar and padding)
      const navbarHeight = 20;
      const targetPosition = elementTop - navbarHeight;

      // Scroll to the calculated position
      window.scrollTo({
        top: Math.max(0, targetPosition), // Ensure we don't scroll above the page
        behavior: "smooth",
      });
    }
  };

  const handleHeadingClick = (heading: Heading) => {
    // Small delay to ensure any layout changes are complete
    setTimeout(() => {
      scrollToHeading(heading.id);
    }, 10);
  };

  if (isLoading) {
    return (
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <h2
          id="on-this-page-title"
          className="text-slate-900 text-sm dark:text-white"
        >
          On this page
        </h2>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </nav>
    );
  }

  if (headings.length === 0) {
    return (
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <h2
          id="on-this-page-title"
          className="text-slate-900 text-sm dark:text-white"
        >
          On this page
        </h2>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No headings found
        </p>
      </nav>
    );
  }

  return (
    <div className="w-56">
      <nav aria-labelledby="on-this-page-title">
        <h2
          id="on-this-page-title"
          className="text-slate-900 text-sm dark:text-white"
        >
          On this page
        </h2>
        <ol role="list" className="mt-4 space-y-3 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleHeadingClick(heading)}
                className={`toc-link w-full text-left ${
                  activeId === heading.id ? "active" : ""
                } ${heading.level > 2 ? "ml-6" : ""}`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
