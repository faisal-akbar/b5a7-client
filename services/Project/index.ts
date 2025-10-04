"use server";
import config from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { IProjectData, IProjectResponse } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

// Public
export const getProjects = async (): Promise<
  IProjectResponse<IProjectData[]>
> => {
  const res = await fetch(`${config.baseUrl}/project?isPublished=true`, {
    next: {
      tags: ["published_projects"],
    },
  });
  return res.json();
};

export const getProjectBySlug = async (
  slug: string
): Promise<IProjectResponse<IProjectData>> => {
  const res = await fetch(`${config.baseUrl}/project/${slug}`, {
    next: {
      tags: [`project_slug_${slug}`],
    },
  });
  return res.json();
};

// Admin Dashboard
export const getAllProjects = async (): Promise<
  IProjectResponse<IProjectData[]>
> => {
  const res = await fetch(`${config.baseUrl}/project`, {
    cache: "no-store",
  });
  return res.json();
};

export const createProject = async (
  projectData: FormData
): Promise<IProjectResponse<IProjectData>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/create`, {
      method: "POST",
      body: projectData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    revalidateTag("published_projects");
    if (result.success && result.data?.slug) {
      revalidateTag(`project_slug_${result.data.slug}`);
      revalidatePath(`/projects/${result.data.slug}`);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const getProjectById = async (
  id: string | number
): Promise<IProjectResponse<IProjectData>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/id/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch project data");
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch project data");
    }
    throw new Error("Failed to fetch project data");
  }
};

export const updateProject = async (
  id: string | number,
  projectData: FormData
): Promise<IProjectResponse<IProjectData>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/${id}`, {
      method: "PATCH",
      body: projectData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    // Revalidate project lists
    revalidateTag("published_projects");
    if (result.success && result.data?.slug) {
      revalidateTag(`project_slug_${result.data.slug}`);
      revalidatePath(`/projects/${result.data.slug}`);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update project");
    }
    throw new Error("Failed to update project");
  }
};

export const deleteProject = async (id: string | number): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("published_projects");
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete project");
    }
    throw new Error("Failed to delete project");
  }
};
