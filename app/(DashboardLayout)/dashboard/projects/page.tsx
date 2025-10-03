import { DashboardProjectCardGrid } from "@/components/modules/dashboard/DashboardProjectCardGrid";
import Information from "@/components/modules/Information";

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
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
