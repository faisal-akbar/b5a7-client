import { DashboardProjectCardGrid } from "@/components/modules/dashboard/DashboardProjectCardGrid";
import Information from "@/components/modules/Information";
import config from "@/config";

async function page() {
  const res = await fetch(`${config.baseUrl}/project`, {
    next: {
      tags: ["projects"],
    },
  });
  const { data: projects } = await res.json();

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

