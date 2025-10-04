import { siteMetadata } from "@/app/siteMetaData";
import { Container } from "@/components/modules/Container";
import { TableOfContents } from "@/components/modules/TableOfContents";
import ViewCounter from "@/components/modules/ViewCounter";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/calculateReadingTime";
import { formatDate } from "@/lib/formatDate";
import { getBlogBySlug, getPublishedBlogs } from "@/services/Blog";
import { IBlogPost } from "@/types/blog";
import { CalendarDays, Clock, Edit3 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const response = await getPublishedBlogs();
    const blogs = response?.data || [];
    if (!blogs || !Array.isArray(blogs)) {
      return [];
    }
    return blogs.map((blog: IBlogPost) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data: blog } = await getBlogBySlug(slug);

    if (!blog) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const readingTime = calculateReadingTime(blog.content) || 5;
    const publishedDate = new Date(blog.createdAt).toISOString();
    const blogUrl = `${siteMetadata.siteUrl}/blogs/${slug}`;

    // Create a clean description from blog content (first 160 characters)
    const cleanContent = blog.content
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const description =
      cleanContent.length > 160
        ? cleanContent.substring(0, 160) + "..."
        : cleanContent;

    return {
      title: blog.title,
      description,
      keywords: blog.tags,
      authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
      creator: siteMetadata.author,
      openGraph: {
        title: blog.title,
        description,
        url: blogUrl,
        siteName: siteMetadata.openGraph.siteName,
        images: [
          {
            url: blog.thumbnail,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        locale: siteMetadata.openGraph.locale,
        type: "article" as const,
        publishedTime: publishedDate,
        authors: [siteMetadata.author],
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image" as const,
        title: blog.title,
        description,
        images: [blog.thumbnail],
        creator: siteMetadata.twitter.creator,
        site: siteMetadata.twitter.site,
      },
      alternates: {
        canonical: blogUrl,
      },
      other: {
        "article:author": siteMetadata.author,
        "article:published_time": publishedDate,
        "article:section": "Technology",
        "article:tag": blog.tags.join(", "),
        "article:reading_time": `${readingTime} min read`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "A blog post by Faisal Akbar",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { data: blog } = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const readingTime = calculateReadingTime(blog.content) || 5;

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
                      <time dateTime={blog.createdAt}>
                        {formatDate(blog.createdAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <span className="flex items-center gap-1.5">
                  <Edit3 className="h-5 w-5" />
                  {blog.content.split(/\s+/).length} words
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-5 w-5" />
                  {readingTime} min read
                </span>
                <Suspense fallback={<div>Loading views...</div>}>
                  <ViewCounter slug={blog.slug} />
                </Suspense>
              </div>

              {/* Title */}
              <div>
                <h1 className="mb-5 font-extrabold leading-9 tracking-tight text-gray-900 text-3xl dark:text-gray-100 sm:leading-10 sm:text-4xl md:leading-14 md:text-5xl">
                  {blog.title}
                </h1>
              </div>

              {/* Featured Image */}
              <Image
                alt={blog.title}
                src={blog.thumbnail}
                width={1080}
                height={810}
                className="aspect-ratio w-full rounded object-cover"
                priority
              />

              {/* Tags */}
              <div className="py-3 text-sm sm:text-base xl:py-4">
                <div className="flex flex-wrap items-center">
                  <div className="">
                    {blog.tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="mr-3 inline-block cursor-pointer break-words rounded-md border border-gray-800 px-2 py-1 text-center leading-6 text-neutral-900 hover:bg-yellow-300 hover:outline-0 focus:outline-offset-2 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-yellow-300 dark:hover:text-neutral-900"
                      >
                        # {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
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
                  dangerouslySetInnerHTML={{ __html: blog.content }}
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
