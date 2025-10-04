import { BlogCardGrid } from "@/components/modules/BlogCardGrid";
import ContactForm from "@/components/modules/ContactForm";
import { Container } from "@/components/modules/Container";
import { Flipper } from "@/components/modules/flipper";
import { Heading } from "@/components/modules/Heading";
import Information from "@/components/modules/Information";
import { ProjectCarousel } from "@/components/modules/ProjectCarousel";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { TwitterIcon } from "@/components/ui/twitter";

import { getBlogs } from "@/services/Blog";
import { getProjects } from "@/services/Project";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { personalData, siteMetadata } from "../siteMetaData";

const MAX_BLOG = 6;
const MAX_PROJECT = 4;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Faisal Akbar's portfolio. Software Engineer based in New York City specializing in React, Next.js, TypeScript, and modern web technologies. Explore my projects, blog posts, and professional journey.",
  openGraph: {
    title: "Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Software Engineer based in New York City. Passionate about building high-quality web applications with React, Next.js, TypeScript, and modern technologies. Explore my projects, blog posts, and professional journey.",
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.openGraph.siteName,
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/faisal-akbar.jpg`,
        width: 1200,
        height: 630,
        alt: "Faisal Akbar - Software Engineer Portfolio",
      },
    ],
    locale: siteMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Software Engineer based in New York City. Passionate about building high-quality web applications with React, Next.js, TypeScript, and modern technologies.",
    images: [`${siteMetadata.siteUrl}/images/faisal-akbar.jpg`],
    creator: siteMetadata.twitter.creator,
    site: siteMetadata.twitter.site,
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};

export default async function HomePage() {
  const { data: blogs } = await getBlogs();
  const { data: projects } = await getProjects();

  return (
    <Container className="mt-10 px-3">
      <div className="space-y-16">
        <div className="space-y-9">
          <Image
            src="/images/faisal-akbar.jpg"
            alt=""
            sizes="4rem"
            width={500}
            height={500}
            quality={100}
            className="h-28 w-28 rounded-full bg-zinc-100
                            object-cover dark:bg-zinc-800"
            priority
          />
          <div>
            <div className="max-w-5xl">
              {/* <h1 className="font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-5xl">
                Code. Problem-Solving. Building.
              </h1> */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-5xl mr-3">
                  {siteMetadata.author}
                </Heading>
                <Flipper />
              </div>
              <p className="mt-6 text-zinc-600 text-base dark:text-zinc-300">
                I’m {siteMetadata.author}, Software Engineer based in New York
                City. Passionate, curious, and with zest and problem-solving
                skills, always looking to deliver high-quality products.
                <span className="mt-3 block">
                  Find out more{" "}
                  <Link
                    href="/about"
                    className="underline decoration-wavy underline-offset-1 hover:text-blue-900 dark:hover:text-blue-400"
                  >
                    about me
                  </Link>
                  .
                </span>
              </p>
              <div className="mt-6 flex gap-6">
                <SocialLink
                  href="https://www.linkedin.com/in/md-faisal-akbar/"
                  aria-label="Follow on Instagram"
                  icon={LinkedinIcon}
                />
                <SocialLink
                  href="https://github.com/faisal-akbar"
                  aria-label="Follow on GitHub"
                  icon={GithubIcon}
                />
                <SocialLink
                  href="https://twitter.com/_faisal_akbar"
                  aria-label="Follow on LinkedIn"
                  icon={TwitterIcon}
                />
              </div>
            </div>
          </div>
        </div>
        {personalData.skills.length > 0 && (
          <div>
            <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Skills
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="max-w-7xl mx-auto mt-10 flex flex-wrap gap-3">
              {personalData.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-lg px-3 py-1.5 hover:bg-secondary/80 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div>
          <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
            Recent Project
          </h2>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!projects.length && (
            <Information message="No recent projects found." />
          )}

          <div className="max-w-7xl mx-auto mt-10">
            <ProjectCarousel projects={projects.slice(0, MAX_PROJECT)} />
          </div>
          <Button asChild>
            <Link href="/projects" className="mt-6">
              View All Projects <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div>
          <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
            Recent Posts
          </h2>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!blogs.length && <Information message="No recent blogs found." />}

          <div className="max-w-7xl mx-auto mt-10">
            <BlogCardGrid blogs={blogs.slice(0, MAX_BLOG)} columns={3} />
          </div>
          <Button asChild>
            <Link href="/blogs" className="mt-6">
              View All Blogs <ArrowRightIcon />
            </Link>
          </Button>
        </div>
        <div>
          <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
            Get In Touch
          </h2>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p className="mt-6 text-zinc-600 text-base dark:text-zinc-300">
            I&apos;m always interested in hearing about new opportunities and
            interesting projects. Feel free to reach out if you&apos;d like to
            connect!
          </p>

          <div className="max-w-4xl mx-auto mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}

function SocialLink({
  icon: Icon,
  href,
  ...props
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className="group -m-1 p-1" {...props}>
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}
