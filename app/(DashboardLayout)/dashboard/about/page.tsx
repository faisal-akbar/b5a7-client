import { Container } from "@/components/modules/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAbout } from "@/services/About";
import { Edit, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
  const about = await getAbout();

  // If no about data exists, show add button
  if (!about || !about.data) {
    return (
      <div className="space-y-8">
        <Card className="border shadow-lg shadow-primary/5">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">About Me</CardTitle>
              </div>
              <Link href="/dashboard/about/edit">
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Add About
                </Button>
              </Link>
            </div>
            <CardDescription className="text-base">
              No about information found. Click &quot;Add About&quot; to get
              started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No about information available</p>
                <p className="text-sm">
                  Create your professional profile to get started
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const aboutData = about.data;

  return (
    <div className="space-y-8">
      {/* Read-only view */}
      <Card className="border shadow-lg shadow-primary/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Preview About Me
              </CardTitle>
            </div>
            <Link href="/dashboard/about/edit">
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Container className="mt-10 px-3">
            <article>
              <div>
                <header>
                  <div className="mb-10 space-y-2">
                    {/* Title */}
                    <div>
                      <h1 className="mb-5 font-extrabold leading-9 tracking-tight text-gray-900 text-3xl dark:text-gray-100 sm:leading-10 sm:text-4xl md:leading-14 md:text-5xl">
                        {aboutData.title}
                      </h1>
                    </div>

                    {/* Featured Image */}
                    <Image
                      alt={aboutData.title}
                      src={aboutData.thumbnail}
                      width={1080}
                      height={810}
                      className="aspect-ratio w-full rounded object-cover"
                      priority
                    />

                    {/* Skills */}
                    {aboutData.skills && aboutData.skills.length > 0 && (
                      <div className="py-3 xl:py-4">
                        <h2 className="text-2xl font-bold mb-4">Skills</h2>
                        <div className="flex flex-wrap items-center gap-2">
                          {aboutData.skills.map(
                            (skill: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-lg"
                              >
                                {skill}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </header>

                {/* Content */}
                <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:divide-y-0 space-x-3 xl:grid-cols-4 xl:gap-x-6">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                    <div className="prose max-w-none pb-8 prose-headings:scroll-mt-24 dark:prose-dark">
                      <div
                        id="blog-content"
                        dangerouslySetInnerHTML={{ __html: aboutData.content }}
                        className="prose prose-lg max-w-none dark:prose-invert"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}
