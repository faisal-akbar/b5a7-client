import { siteMetadata } from "@/app/siteMetaData";
import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import Information from "@/components/modules/Information";
import { ProjectCardGrid } from "@/components/modules/ProjectCardGrid";
import { getPublishedProjects } from "@/services/Project";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Faisal Akbar's portfolio of software engineering projects, web applications, and creative solutions. Discover full-stack development projects built with React, Next.js, TypeScript, and modern technologies.",
  openGraph: {
    title: "Projects - Faisal Akbar's Portfolio",
    description:
      "Explore Faisal Akbar's portfolio of software engineering projects, web applications, and creative solutions. Discover full-stack development projects built with modern technologies.",
    url: `${siteMetadata.siteUrl}/projects`,
    siteName: siteMetadata.openGraph.siteName,
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/twitter-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Faisal Akbar's Projects - Software Engineering Portfolio",
      },
    ],
    locale: siteMetadata.openGraph.locale,
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Projects - Faisal Akbar's Portfolio",
    description:
      "Explore Faisal Akbar's portfolio of software engineering projects, web applications, and creative solutions built with modern technologies.",
    images: [`${siteMetadata.siteUrl}/images/twitter-banner.jpg`],
    creator: siteMetadata.twitter.creator,
    site: siteMetadata.twitter.site,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/projects`,
  },
};

export default async function ProjectPage() {
  const { data: projects } = await getPublishedProjects();

  return (
    <Container className="mt-10 px-3">
      <div className="space-y-6">
        <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-3xl mr-3">
          Projects
        </Heading>
        <p className="text-left  tracking-tight md:text-zinc-600 dark:text-zinc-400 text-3xl mr-3">
          A showcase of my projects, experiments, and creative solutions
          I&#39;ve built.
        </p>

        <div>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!projects ||
            (!projects.length && (
              <Information message="No recent projects found." />
            ))}

          <div className="max-w-7xl mx-auto mt-10">
            <ProjectCardGrid projects={projects} columns={3} />
          </div>
        </div>
      </div>
    </Container>
  );
}
