import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import { slugify } from "@/lib/utils";

const PUBLIC_ROOT = path.join(process.cwd(), "public");

function getExtension(filename: string, fallback: string) {
  const extension = path.extname(filename);
  return extension ? extension.toLowerCase() : fallback;
}

export async function saveUploadedFile(
  file: File | null,
  folder: "images" | "catalogs",
  fallbackExtension: string
) {
  if (!file || file.size === 0) {
    return null;
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = getExtension(file.name, fallbackExtension);
  const baseName = slugify(path.basename(file.name, extension)) || folder;
  const fileName = `${Date.now()}-${baseName}${extension}`;
  const targetDirectory = path.join(PUBLIC_ROOT, "uploads", folder);
  const targetPath = path.join(targetDirectory, fileName);

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(targetPath, buffer);

  return `/uploads/${folder}/${fileName}`;
}

export async function deleteUploadedFile(fileUrl?: string | null) {
  if (!fileUrl || !fileUrl.startsWith("/uploads/")) {
    return;
  }

  const relativePath = fileUrl.replace(/^\//, "");
  const absolutePath = path.join(PUBLIC_ROOT, relativePath);

  await unlink(absolutePath).catch(() => undefined);
}
