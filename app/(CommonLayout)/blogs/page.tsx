import { siteMetadata } from "@/app/siteMetaData";
import { BlogCardGrid } from "@/components/modules/BlogCardGrid";
import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import Information from "@/components/modules/Information";
import { getPublishedBlogs } from "@/services/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Explore Faisal Akbar's collection of blog posts covering software engineering, web development, programming insights, and technical experiences. Discover thoughts, inspiration, and lessons learned in the world of technology.",
  openGraph: {
    title: "Blogs - Faisal Akbar's Technical Writing",
    description:
      "Explore Faisal Akbar's collection of blog posts covering software engineering, web development, programming insights, and technical experiences. Discover thoughts, inspiration, and lessons learned.",
    url: `${siteMetadata.siteUrl}/blogs`,
    siteName: siteMetadata.openGraph.siteName,
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/twitter-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Faisal Akbar's Blog - Technical Writing and Programming Insights",
      },
    ],
    locale: siteMetadata.openGraph.locale,
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Blogs - Faisal Akbar's Technical Writing",
    description:
      "Explore Faisal Akbar's collection of blog posts covering software engineering, web development, programming insights, and technical experiences.",
    images: [`${siteMetadata.siteUrl}/images/twitter-banner.jpg`],
    creator: siteMetadata.twitter.creator,
    site: siteMetadata.twitter.site,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blogs`,
  },
};

export default async function BlogPage() {
  const { data: blogs } = await getPublishedBlogs();

  return (
    <Container className="mt-10 px-3">
      <div className="space-y-6">
        <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-3xl mr-3">
          Blogs
        </Heading>
        <p className="text-left  tracking-tight md:text-zinc-600 dark:text-zinc-400 text-3xl mr-3">
          A collection of thoughts, inspiration, mistakes, and other long-form
          minutia I&#39;ve written.
        </p>

        <div>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!blogs ||
            (!blogs.length && <Information message="No recent blogs found." />)}

          <div className="max-w-7xl mx-auto mt-10">
            <BlogCardGrid blogs={blogs} columns={3} />
          </div>
        </div>
      </div>
    </Container>
  );
}
