"use server";
import { put } from "@vercel/blob";

export async function uploadToBlob(file) {
  try {
    if (!file || !(file instanceof File)) {
      throw new Error("No file provided or the file is invalid");
    }

    const blob = await put(file.name, file, { access: "public" });

    return { success: true, url: blob.url }; // ✅ Returning an object
  } catch (error) {
    console.error("File upload failed:", error);
    return { success: false, message: "File upload failed" }; // ✅ Handle failure properly
  }
}

