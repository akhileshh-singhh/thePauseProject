"use client";

import { AdminLabel } from "@/components/admin/ui";
import { CmsImage } from "@/components/ui/CmsImage";

type ImageFileInputProps = {
  label: string;
  previewUrl?: string;
  onFileChange: (file: File | null) => void;
  required?: boolean;
  hint?: string;
};

export function ImageFileInput({
  label,
  previewUrl,
  onFileChange,
  required,
  hint,
}: ImageFileInputProps) {
  return (
    <div className="space-y-2">
      <AdminLabel>{label}</AdminLabel>
      {previewUrl ? (
        <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-2xl border border-tp-charcoal/10">
          <CmsImage
            src={previewUrl}
            alt=""
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={previewUrl.startsWith("blob:")}
          />
        </div>
      ) : null}
      <input
        type="file"
        accept="image/*"
        required={required}
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        className="block w-full font-general text-sm text-tp-charcoal file:mr-4 file:rounded-full file:border-0 file:bg-tp-olive/15 file:px-4 file:py-2 file:font-accent file:text-[0.65rem] file:uppercase file:tracking-[0.15em] file:text-tp-olive"
      />
      {hint ? <p className="font-general text-xs text-tp-stone">{hint}</p> : null}
    </div>
  );
}

export function GalleryFileInput({
  label,
  existingUrls,
  onFilesChange,
  hint,
}: {
  label: string;
  existingUrls: string[];
  onFilesChange: (files: File[]) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <AdminLabel>{label}</AdminLabel>
      {existingUrls.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {existingUrls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-square overflow-hidden rounded-xl border border-tp-charcoal/10"
            >
              <CmsImage
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          ))}
        </div>
      ) : null}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => onFilesChange(Array.from(e.target.files ?? []))}
        className="block w-full font-general text-sm text-tp-charcoal file:mr-4 file:rounded-full file:border-0 file:bg-tp-olive/15 file:px-4 file:py-2 file:font-accent file:text-[0.65rem] file:uppercase file:tracking-[0.15em] file:text-tp-olive"
      />
      {hint ? <p className="font-general text-xs text-tp-stone">{hint}</p> : null}
    </div>
  );
}
