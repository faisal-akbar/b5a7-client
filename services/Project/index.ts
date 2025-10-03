"use server";
import config from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createProject = async (projectData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/create`, {
      method: "POST",
      body: projectData,
      headers: {
        Authorization: token,
      },
    });

    revalidateTag("projects");

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const getProjectById = async (id: string | number): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/id/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
    console.log("Fetch response:", res);

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
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/project/${id}`, {
      method: "PATCH",
      body: projectData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("projects");
    return res.json();
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
    revalidateTag("projects");
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete project");
    }
    throw new Error("Failed to delete project");
  }
};

