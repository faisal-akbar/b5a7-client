"use server";
import config from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createBlog = async (blogData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/create`, {
      method: "POST",
      body: blogData,
      headers: {
        Authorization: token,
      },
    });

    revalidateTag("blogs");

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const getBlogById = async (id: string | number): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/id/${id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blog data");
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch blog data");
    }
    throw new Error("Failed to fetch blog data");
  }
};

export const updateBlog = async (
  id: string | number,
  blogData: FormData
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/${id}`, {
      method: "PATCH",
      body: blogData,
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("blogs");
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update blog");
    }
    throw new Error("Failed to update blog");
  }
};

export const deleteBlog = async (id: string | number): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("blogs");
    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete blog");
    }
    throw new Error("Failed to delete blog");
  }
};
