"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createBlog = async (blogData: FormData): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/create`, {
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
