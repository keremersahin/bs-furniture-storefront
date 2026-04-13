import path from "path";
import { createClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/utils";

const STORAGE_BUCKET = "product-images";

function getRequiredEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} tanimlanmamis.`);
  }

  return value;
}

function getSupabaseStorageClient() {
  return createClient(getRequiredEnv("SUPABASE_URL"), getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

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

  const supabase = getSupabaseStorageClient();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = getExtension(file.name, fallbackExtension);
  const baseName = slugify(path.basename(file.name, extension)) || folder;
  const objectPath = `${folder}/${Date.now()}-${baseName}${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(objectPath, buffer, {
      cacheControl: "3600",
      contentType: file.type || undefined,
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Dosya Supabase Storage'a yuklenemedi: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);

  if (!data.publicUrl) {
    throw new Error("Yuklenen dosya icin public URL olusturulamadi.");
  }

  return data.publicUrl;
}

export async function deleteUploadedFile(fileUrl?: string | null) {
  if (!fileUrl) {
    return;
  }

  let objectPath = "";

  try {
    const url = new URL(fileUrl);
    const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
    const pathname = decodeURIComponent(url.pathname);

    if (!pathname.includes(marker)) {
      return;
    }

    objectPath = pathname.split(marker)[1] ?? "";
  } catch {
    return;
  }

  if (!objectPath) {
    return;
  }

  const supabase = getSupabaseStorageClient();

  await supabase.storage.from(STORAGE_BUCKET).remove([objectPath]).catch(() => undefined);
}
