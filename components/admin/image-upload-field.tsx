"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { X } from "lucide-react";

type ExistingImage = {
  id: string;
  url: string;
  alt: string;
};

type ImageUploadFieldProps = {
  required?: boolean;
  existingImages?: ExistingImage[];
};

type SelectedPreview = {
  id: string;
  file: File;
  previewUrl: string;
};

function buildFileList(files: File[]) {
  const transfer = new DataTransfer();

  files.forEach((file) => transfer.items.add(file));

  return transfer.files;
}

export function ImageUploadField({
  required = false,
  existingImages = []
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<SelectedPreview[]>([]);

  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, [selectedImages]);

  function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    setSelectedImages((previous) => {
      previous.forEach((image) => URL.revokeObjectURL(image.previewUrl));

      return files.map((file, index) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file)
      }));
    });
  }

  function removeSelectedImage(imageId: string) {
    setSelectedImages((previous) => {
      const nextImages = previous.filter((image) => image.id !== imageId);
      const removedImage = previous.find((image) => image.id === imageId);

      if (removedImage) {
        URL.revokeObjectURL(removedImage.previewUrl);
      }

      if (fileInputRef.current) {
        fileInputRef.current.files = buildFileList(nextImages.map((image) => image.file));
      }

      return nextImages;
    });
  }

  return (
    <div className="grid gap-5 xl:col-span-2">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Urun gorselleri
        <input
          ref={fileInputRef}
          name="imageFiles"
          type="file"
          accept="image/*"
          multiple
          required={required}
          onChange={handleImageSelection}
          className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 font-normal file:mr-4 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <span className="text-xs font-normal text-slate-500">
          JPG, PNG veya WEBP formatinda, her biri en fazla 4 MB. Vercel canli
          limiti nedeniyle secilen dosyalarin toplam boyutu 4 MB'i asmamalidir.
        </span>
      </label>

      {selectedImages.length > 0 ? (
        <div className="space-y-4 rounded-3xl border border-slate-200 p-5">
          <div>
            <p className="font-semibold text-slate-900">Secilen yeni gorseller</p>
            <p className="mt-1 text-sm text-slate-600">
              Kaydetmeden once istemedigin gorselleri kaldirabilirsin.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {selectedImages.map((image, index) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.previewUrl}
                    alt={`${image.file.name} onizleme`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeSelectedImage(image.id)}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/78 text-white shadow-lg backdrop-blur transition hover:bg-slate-950"
                  aria-label={`${index + 1}. gorseli kaldir`}
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="border-t border-slate-200 px-3 py-3 text-xs text-slate-600">
                  {image.file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {existingImages.length > 0 ? (
        <div className="space-y-4 rounded-3xl border border-slate-200 p-5">
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Mevcut gorseller</p>
            <p>Yeni gorseller secersen mevcut galeri bu yeni liste ile degistirilir.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {existingImages.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-slate-200 px-3 py-3 text-xs text-slate-600">
                  Gorsel {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
