"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { getAccessToken } from "@/lib/admin-auth";
import {
  deleteGalleryImage,
  fetchAdminGallery,
  saveGalleryImage,
  type AdminGalleryImage,
} from "@/lib/admin-api";
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminLabel,
  AdminPageHeader,
  AdminSpinner,
  AdminTextarea,
} from "@/components/admin/ui";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<AdminGalleryImage[]>([]);
  const [loading, setLoading] = useState(() => Boolean(getAccessToken()));
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ alt: "", caption: "", src_file: null as File | null });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const token = getAccessToken();
    if (!token) return;

    void (async () => {
      try {
        const data = await fetchAdminGallery(token);
        if (active) setImages(data);
      } catch {
        if (active) setError("Failed to load gallery.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    if (!form.src_file) {
      setError("Please select an image file.");
      return;
    }
    setSaving(true);
    try {
      const created = await saveGalleryImage(token, {
        alt: form.alt,
        caption: form.caption,
        sort_order: images.length,
        is_published: true,
        src_file: form.src_file,
      });
      setImages((prev) => [...prev, created]);
      setForm({ alt: "", caption: "", src_file: null });
    } catch {
      setError("Could not add image.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Remove this image?")) return;
    const token = getAccessToken();
    if (!token) return;
    try {
      await deleteGalleryImage(token, id);
      setImages((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Could not delete image.");
    }
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Visuals"
        title="Gallery"
        description="Images shown in the home page masonry grid."
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}

      <AdminCard className="mb-8">
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Add image
        </p>
        <form onSubmit={handleAdd} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <AdminLabel htmlFor="gallery_file">Image upload</AdminLabel>
            <AdminInput
              id="gallery_file"
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, src_file: e.target.files?.[0] ?? null })}
              required
            />
            {form.src_file ? (
              <p className="font-general text-xs text-tp-stone">Selected: {form.src_file.name}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <AdminLabel>Alt text</AdminLabel>
            <AdminInput
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Caption (optional)</AdminLabel>
            <AdminTextarea
              rows={1}
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminButton type="submit" disabled={saving || !form.src_file}>
              {saving ? "Adding…" : "Add to gallery"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>

      {loading ? <AdminSpinner /> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((img) => (
          <article
            key={img.id}
            className="overflow-hidden rounded-3xl border border-tp-charcoal/8 bg-tp-warm-white/80"
          >
            <div className="relative aspect-[4/3]">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="400px" />
            </div>
            <div className="p-4">
              <p className="font-general text-sm text-tp-charcoal">{img.alt}</p>
              {img.caption ? (
                <p className="mt-1 font-general text-xs text-tp-stone">{img.caption}</p>
              ) : null}
              <AdminButton
                variant="ghost"
                className="mt-3 !px-0"
                onClick={() => handleDelete(img.id)}
              >
                Remove
              </AdminButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
