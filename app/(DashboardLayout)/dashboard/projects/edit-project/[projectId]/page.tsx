import EditProjectForm from "@/components/modules/dashboard/addProject/EditProjectForm";
import { getProjectById } from "@/services/Project";
import { notFound } from "next/navigation";

type PageProps = {
  params: { projectId: string };
};

export default async function EditProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  console.log(project);
  if (!project || !project.data) {
    return notFound();
  }

  return <EditProjectForm projectId={projectId} />;
}

