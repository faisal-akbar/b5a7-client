import { Container } from "@/components/modules/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="mt-10 px-3">
      <article>
        <div>
          <header>
            <div className="mb-10 space-y-2">
              {/* Meta Information Skeleton */}
              <div className="flex flex-wrap gap-x-5">
                {/* Date skeleton */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                {/* Words count skeleton */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
                {/* Reading time skeleton */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-16" />
                </div>
                {/* View counter skeleton */}
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              {/* Title Skeleton */}
              <div>
                <Skeleton className="mb-5 h-12 w-full sm:h-14 md:h-16" />
              </div>

              {/* Featured Image Skeleton */}
              <Skeleton className="aspect-ratio w-full rounded" />

              {/* Tags Skeleton */}
              <div className="py-3">
                <div className="flex flex-wrap items-center gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-16 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:divide-y-0 space-x-3 xl:grid-cols-4 xl:gap-x-6">
            {/* Table of Contents Skeleton - Hidden on mobile, visible on xl screens */}
            <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className={`h-4 ${
                        index % 3 === 0
                          ? "w-24"
                          : index % 3 === 1
                          ? "w-32"
                          : "w-20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8">
                <div className="space-y-4">
                  {/* Blog content paragraphs */}
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      {index % 3 === 0 && <Skeleton className="h-4 w-4/5" />}
                    </div>
                  ))}

                  {/* Code block skeleton */}
                  <div className="my-6">
                    <Skeleton className="h-32 w-full rounded-lg" />
                  </div>

                  {/* More content paragraphs */}
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index + 8} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}

                  {/* Quote block skeleton */}
                  <div className="my-6 border-l-4 border-gray-300 pl-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>

                  {/* Final paragraphs */}
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index + 14} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
