"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAbout = async (): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch about data");
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch about data");
    }
    throw new Error("Failed to fetch about data");
  }
};

export const updateAbout = async (aboutData: FormData): Promise<any> => {
  console.log("Updating about with data:", aboutData);
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      method: "PATCH",
      body: aboutData,
      headers: {
        Authorization: token,
      },
    });

    revalidateTag("about");

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update about");
    }
    throw new Error("Failed to update about");
  }
};
