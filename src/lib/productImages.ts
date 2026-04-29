import { auth } from "@/lib/firebase";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function safeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUploadId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getUploadErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Upload failed. Please try again.";
}

export function validateProductImage(file: File) {
  if (!auth.currentUser) {
    throw new Error("You must be signed in before uploading product images.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 5MB or smaller.");
  }
}

export async function uploadProductImage(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string> {
  validateProductImage(file);

  const cleanName = safeFileName(file.name) || "product-image";
  const publicId = `products/${createUploadId()}-${cleanName}`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("public_id", publicId);

  onProgress?.(10);

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    xhr.open("POST", uploadUrl);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const progress = 10 + Math.round((event.loaded / event.total) * 80);
      onProgress?.(Math.min(progress, 90));
    };

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(
            new Error(
              `Cloudinary upload failed: ${response?.error?.message || xhr.statusText}`,
            ),
          );
          return;
        }

        onProgress?.(100);
        resolve(response.secure_url);
      } catch {
        reject(new Error("Failed to parse Cloudinary response."));
      }
    };

    xhr.onerror = () => {
      reject(
        new Error(
          "Could not reach Cloudinary. Check your internet connection.",
        ),
      );
    };

    xhr.ontimeout = () => {
      reject(new Error("Upload timed out. Please try again."));
    };

    xhr.send(formData);
  });
}
