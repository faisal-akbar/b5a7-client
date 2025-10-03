import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="mt-10 px-3">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl dark:text-zinc-100 sm:text-3xl mr-3">
            <Skeleton className="h-10 w-48" />
          </Heading>
          <div className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-3xl mr-3">
            <Skeleton className="h-8 w-full max-w-2xl" />
            <Skeleton className="h-8 w-full max-w-xl mt-2" />
          </div>
        </div>

        {/* Divider */}
        <div>
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Blog Cards Grid */}
          <div className="max-w-7xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* Generate 6 skeleton cards */}
              {Array.from({ length: 6 }).map((_, index) => (
                <Card
                  key={index}
                  className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm p-0 relative"
                >
                  {/* Thumbnail Skeleton */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    <Skeleton className="h-full w-full" />
                  </div>

                  <CardHeader className="pb-3 flex-shrink-0 px-6 pt-3 relative z-20">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 flex-grow flex flex-col px-6 relative z-20">
                    {/* Tags Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-5 w-14" />
                    </div>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* Author and Date Info Skeleton */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                      <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 flex-shrink-0 px-6 pb-6 relative z-20">
                    <div className="w-full">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
