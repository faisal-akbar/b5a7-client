import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import Information from "@/components/modules/Information";
import { ProjectCardGrid } from "@/components/modules/ProjectCardGrid";
import { getProjects } from "@/services/Project";

export default async function ProjectPage() {
  const { data: projects } = await getProjects();

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
          {!projects.length && <Information message="No projects found." />}

          <div className="max-w-7xl mx-auto mt-10">
            <ProjectCardGrid projects={projects} columns={3} />
          </div>
        </div>
      </div>
    </Container>
  );
}
