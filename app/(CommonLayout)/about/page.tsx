import { Container } from "@/components/modules/Container";
import { TableOfContents } from "@/components/modules/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon } from "@/components/ui/download";
import { calculateReadingTime } from "@/lib/calculateReadingTime";
import { formatDate } from "@/lib/formatDate";
import { getAbout } from "@/services/About";
import { CalendarDays, Clock, Edit3 } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPostPage() {
  const { data: about } = await getAbout();

  if (!about) {
    notFound();
  }

  const readingTime = calculateReadingTime(about.content) || 5;

  return (
    <Container className="mt-10 px-3">
      <article>
        <div>
          <header>
            <div className="mb-10 space-y-2">
              {/* Meta Information */}
              <div className="flex flex-wrap gap-x-5 font-medium leading-6 text-base">
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      <time dateTime={about.createdAt}>
                        {formatDate(about.createdAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <span className="flex items-center gap-1.5">
                  <Edit3 className="h-5 w-5" />
                  {about.content.split(/\s+/).length} words
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-5 w-5" />
                  {readingTime} min read
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="mb-5 font-extrabold leading-9 tracking-tight text-gray-900 text-3xl dark:text-gray-100 sm:leading-10 sm:text-4xl md:leading-14 md:text-5xl">
                  {about.title}
                </h1>
              </div>

              {/* Featured Image */}
              <Image
                alt={about.title}
                src={about.thumbnail}
                width={1080}
                height={810}
                className="aspect-ratio w-full rounded object-cover"
                priority
              />

              {/* Skills */}
              {about.skills && about.skills.length > 0 && (
                <div className="py-3 xl:py-4">
                  <h2 className="text-2xl font-bold mb-4">Skills</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    {about.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-lg"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {about.resume && (
                <div className="py-3 xl:py-4">
                  <h2 className="text-2xl font-bold mb-4">Resume</h2>
                  <Link
                    href={about.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg flex items-center gap-2"
                  >
                    <DownloadIcon size={20} />
                    <span>Download Resume</span>
                  </Link>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:divide-y-0 space-x-3 xl:grid-cols-4 xl:gap-x-6">
            {/* Table of Contents - Hidden on mobile, visible on xl screens */}
            <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
              <TableOfContents contentId="blog-content" />
            </div>

            {/* Main Content */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 prose-headings:scroll-mt-24 dark:prose-dark">
                <div
                  id="blog-content"
                  dangerouslySetInnerHTML={{ __html: about.content }}
                  className="prose prose-lg max-w-none dark:prose-invert"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
