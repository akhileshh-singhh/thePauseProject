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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ src: "", alt: "", caption: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const token = getAccessToken();
    if (!token) return;
    try {
      setImages(await fetchAdminGallery(token));
    } catch {
      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    try {
      const created = await saveGalleryImage(token, {
        ...form,
        sort_order: images.length,
        is_published: true,
      });
      setImages((prev) => [...prev, created]);
      setForm({ src: "", alt: "", caption: "" });
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
            <AdminLabel>Image URL</AdminLabel>
            <AdminInput
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              required
            />
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
            <AdminButton type="submit" disabled={saving}>
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
