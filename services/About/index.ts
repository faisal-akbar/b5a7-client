"use server";
import config from "@/config";
import { getValidToken } from "@/lib/verifyToken";
import { IAbout, IAboutResponse } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAbout = async (): Promise<IAboutResponse<IAbout>> => {
  const res = await fetch(`${config.baseUrl}/about`, {
    next: {
      tags: ["about"],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch about data: ${res.status}`);
  }

  return res.json();
};

// Admin Dashboard

// export const getAbout = async (): Promise<IAboutResponse<IAbout>> => {
//   const token = await getValidToken();

//   try {
//     const res = await fetch(`${config.baseUrl}/about`, {
//       method: "GET",
//       headers: {
//         Authorization: token,
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch about data");
//     }

//     return res.json();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message || "Failed to fetch about data");
//     }
//     throw new Error("Failed to fetch about data");
//   }
// };

export const updateAbout = async (
  aboutData: FormData
): Promise<IAboutResponse<IAbout>> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${config.baseUrl}/about`, {
      method: "PATCH",
      body: aboutData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    // Revalidate about page cache
    if (result.success) {
      revalidateTag("about");
      revalidatePath("/about");
      revalidatePath("/dashboard/about");
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update about");
    }
    throw new Error("Failed to update about");
  }
};
