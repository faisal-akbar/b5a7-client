import { Container } from "@/components/modules/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="mt-10 px-3">
      <div className="space-y-11">
        {/* Profile Section */}
        <div className="space-y-9">
          {/* Profile Image Skeleton */}
          <Skeleton className="h-28 w-28 rounded-full" />

          {/* Bio Content Skeleton */}
          <div>
            <div className="max-w-5xl">
              {/* Name and Flipper Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Skeleton className="h-12 w-48 mr-3" />
                <Skeleton className="h-8 w-32 mt-2 sm:mt-0" />
              </div>

              {/* Bio Text Skeleton */}
              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              {/* Social Links Skeleton */}
              <div className="mt-6 flex gap-6">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div>
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-px w-full mb-6" />

          {/* Project Carousel Skeleton */}
          <div className="max-w-7xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* View All Projects Button Skeleton */}
          <Skeleton className="h-10 w-40 mt-6" />
        </div>

        {/* Recent Posts Section */}
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <Skeleton className="h-px w-full mb-6" />

          {/* Blog Grid Skeleton */}
          <div className="max-w-7xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Blogs Button Skeleton */}
          <Skeleton className="h-10 w-36 mt-6" />
        </div>
      </div>
    </Container>
  );
}
