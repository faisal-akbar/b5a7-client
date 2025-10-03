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
import GithubIcon from "@/icons/github-icon";
import { formatDate } from "@/lib/formatDate";
import { getProjectBySlug, getProjects } from "@/services/Project";
import { IProjectData } from "@/types";
import { CalendarDays, Code, ExternalLink, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const { data: projects } = await getProjects();

    return projects.map((project: IProjectData) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { slug } = await params;
    const { data: project } = await getProjectBySlug(slug);

    if (!project) {
      notFound();
    }

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
                      <dt className="sr-only">Created on</dt>
                      <dd className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        <time dateTime={project.createdAt}>
                          {formatDate(project.createdAt)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <span className="flex items-center gap-1.5">
                    <Wrench className="h-5 w-5" />
                    {project.techStack.length} technologies
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Code className="h-5 w-5" />
                    {project.features.length} features
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h1 className="mb-5 font-extrabold leading-9 tracking-tight text-gray-900 text-3xl dark:text-gray-100 sm:leading-10 sm:text-4xl md:leading-14 md:text-5xl">
                    {project.title}
                  </h1>
                </div>

                {/* Featured Image */}
                <Image
                  alt={project.title}
                  src={project.thumbnail}
                  width={1080}
                  height={810}
                  className="aspect-ratio w-full rounded object-cover"
                  priority
                />

                {/* Tech Stack Tags */}
                {/* <div className="py-3 text-sm sm:text-base xl:py-4">
                  <div className="flex flex-wrap items-center">
                    <div className="">
                      {project.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="mr-3 inline-block cursor-pointer break-words rounded-md border border-gray-800 px-2 py-1 text-center leading-6 text-neutral-900 hover:bg-blue-300 hover:outline-0 focus:outline-offset-2 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-neutral-900"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
            </header>

            {/* Main Content */}
            <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:divide-y-0 space-x-3 xl:grid-cols-4 xl:gap-x-6">
              {/* Project Actions - Hidden on mobile, visible on xl screens */}
              <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Links</CardTitle>
                    <CardDescription>
                      Access the project and its source code
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.liveSite && (
                      <Button asChild className="w-full">
                        <Link
                          href={project.liveSite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.projectLink && (
                      <Button asChild className="w-full">
                        <Link
                          href={project.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon className="mr-2 h-4 w-4" />
                          Source Code
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose max-w-none pb-8 prose-headings:scroll-mt-24 dark:prose-dark">
                  {/* Project Description */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      About This Project
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Features Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Key Features
                    </h2>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Actions - Visible on mobile, hidden on xl screens */}
                  <div className="xl:hidden mt-8 space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Project Links
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {project.liveSite && (
                        <Button asChild variant="outline" className="flex-1 ">
                          <Link
                            href={project.liveSite}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.projectLink && (
                        <Button asChild variant="outline" className="flex-1">
                          <Link
                            href={project.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GithubIcon className="mr-2 h-4 w-4" />
                            Source Code
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    notFound();
  }
}
