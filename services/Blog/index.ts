"use server";
import config from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { IBlogPost, IBlogPostResponse } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

// Public
export const getPublishedBlogs = async (): Promise<
  IBlogPostResponse<IBlogPost[]>
> => {
  try {
    const res = await fetch(`${config.baseUrl}/blog/published`, {
      next: {
        tags: ["published_blogs"],
      },
    });
    return res.json();
  } catch (error: unknown) {
    return {
      success: false,
      status: false,
      message: error instanceof Error ? error.message : "Failed to fetch blogs",
      data: [],
    };
  }
};

export const getBlogBySlug = async (
  slug: string
): Promise<IBlogPostResponse<IBlogPost>> => {
  const res = await fetch(`${config.baseUrl}/blog/${slug}`, {
    next: {
      tags: [`blog_slug_${slug}`],
    },
  });
  return res.json();
};

// Admin Dashboard
export const getAllBlogs = async (): Promise<
  IBlogPostResponse<IBlogPost[]>
> => {
  const token = await getValidToken();

  const res = await fetch(`${config.baseUrl}/blog`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
    cache: "no-store",
  });
  return res.json();
};

export const createBlog = async (
  blogData: FormData
): Promise<IBlogPostResponse<IBlogPost>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/create`, {
      method: "POST",
      body: blogData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    // Revalidate all blog lists
    revalidateTag("published_blogs");

    // Revalidate individual blog post
    if (result.success && result.data?.slug) {
      revalidateTag(`blog_slug_${result.data.slug}`);
      revalidatePath(`/blogs/${result.data.slug}`);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const getBlogById = async (
  id: string | number
): Promise<IBlogPostResponse<IBlogPost>> => {
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
): Promise<IBlogPostResponse<IBlogPost>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/${id}`, {
      method: "PATCH",
      body: blogData,
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();

    // Revalidate blog lists
    revalidateTag("published_blogs");

    // Revalidate individual blog post if update was successful
    if (result.success && result.data?.slug) {
      revalidateTag(`blog_slug_${result.data.slug}`);
      revalidatePath(`/blogs/${result.data.slug}`);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update blog");
    }
    throw new Error("Failed to update blog");
  }
};

export const deleteBlog = async (
  id: string | number
): Promise<IBlogPostResponse<null>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("published_blogs");

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete blog");
    }
    throw new Error("Failed to delete blog");
  }
};
