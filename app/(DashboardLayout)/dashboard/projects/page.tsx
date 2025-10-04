import { DashboardProjectCardGrid } from "@/components/modules/dashboard/DashboardProjectCardGrid";
import Information from "@/components/modules/Information";
import { getAllProjects } from "@/services/Project";

async function page() {
  const { data: projects } = await getAllProjects();

  if (!projects || projects.length === 0) {
    return <Information message="No projects found." />;
  }

  return (
    <div>
      <DashboardProjectCardGrid projects={projects} columns={3} />
    </div>
  );
}

export default page;
