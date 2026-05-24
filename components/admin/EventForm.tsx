"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/admin-auth";
import {
  fetchAdminEvent,
  fetchCategories,
  fetchHosts,
  saveAdminEvent,
  type AdminCategory,
  type AdminEvent,
  type AdminHost,
} from "@/lib/admin-api";
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminLabel,
  AdminSelect,
  AdminSpinner,
  AdminTextarea,
} from "@/components/admin/ui";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatPreviewDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPreviewTime(start: string, end: string) {
  if (!start) return "—";
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: m ? "2-digit" : undefined,
      hour12: true,
    });
  };
  if (end && end !== start) return `${fmt(start)} – ${fmt(end)}`;
  return fmt(start);
}

export function EventForm({ slug }: { slug?: string }) {
  const router = useRouter();
  const isNew = !slug;

  const [hosts, setHosts] = useState<AdminHost[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    event_date: todayIso(),
    start_time: "16:00",
    end_time: "19:00",
    venue: "",
    price_display: "",
    image: "",
    booking_link: "",
    short_description: "",
    description: "",
    category: 0,
    host: 0,
    is_published: true,
    is_featured: true,
    sort_order: 0,
    gallery_urls: "",
  });

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    Promise.all([fetchHosts(token), fetchCategories(token)])
      .then(([h, c]) => {
        setHosts(h);
        setCategories(c);
        if (isNew && h[0] && c[0]) {
          setForm((f) => ({ ...f, host: h[0].id, category: c[0].id }));
        }
      })
      .catch(() => setError("Failed to load hosts or categories."));

    if (!slug) return;

    fetchAdminEvent(token, slug)
      .then((event: AdminEvent) => {
        setForm({
          title: event.title,
          slug: event.slug,
          event_date: event.event_date,
          start_time: event.start_time?.slice(0, 5) ?? "10:00",
          end_time: event.end_time?.slice(0, 5) ?? "",
          venue: event.venue,
          price_display: event.price_display,
          image: event.image,
          booking_link: event.booking_link,
          short_description: event.short_description,
          description: event.description,
          category: event.category,
          host: event.host,
          is_published: event.is_published,
          is_featured: event.is_featured,
          sort_order: event.sort_order,
          gallery_urls: event.gallery.map((g) => g.image_url).join("\n"),
        });
      })
      .catch(() => setError("Event not found."))
      .finally(() => setLoading(false));
  }, [slug, isNew]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && isNew) next.slug = slugify(String(value));
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;

    setSaving(true);
    setError(null);
    setSaved(false);

    const gallery = form.gallery_urls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean)
      .map((image_url, sort_order) => ({ image_url, sort_order }));

    const payload = {
      title: form.title,
      slug: form.slug,
      event_date: form.event_date,
      start_time: form.start_time,
      end_time: form.end_time || null,
      venue: form.venue,
      price_display: form.price_display,
      image: form.image,
      booking_link: form.booking_link,
      short_description: form.short_description,
      description: form.description,
      category: form.category,
      host: form.host,
      is_published: form.is_published,
      is_featured: form.is_featured,
      sort_order: form.sort_order,
      gallery,
    };

    try {
      const result = await saveAdminEvent(token, payload, isNew ? undefined : slug);
      setSaved(true);
      if (isNew) router.replace(`/admin/events/${result.slug}`);
    } catch {
      setError("Could not save event. Check slug uniqueness and required fields.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminSpinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <AdminAlert>{error}</AdminAlert> : null}
      {saved ? <AdminAlert tone="success">Saved successfully.</AdminAlert> : null}

      <AdminCard>
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Basics
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <AdminLabel>Title</AdminLabel>
            <AdminInput value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <AdminLabel>Slug</AdminLabel>
            <AdminInput value={form.slug} onChange={(e) => update("slug", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <AdminLabel>Sort order</AdminLabel>
            <AdminInput
              type="number"
              value={form.sort_order}
              onChange={(e) => update("sort_order", Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Category</AdminLabel>
            <AdminSelect
              value={form.category}
              onChange={(e) => update("category", Number(e.target.value))}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </AdminSelect>
          </div>
          <div className="space-y-2">
            <AdminLabel>Host</AdminLabel>
            <AdminSelect value={form.host} onChange={(e) => update("host", Number(e.target.value))}>
              {hosts.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </AdminSelect>
          </div>
          <div className="space-y-2">
            <AdminLabel htmlFor="event_date">Workshop date</AdminLabel>
            <AdminInput
              id="event_date"
              type="date"
              value={form.event_date}
              onChange={(e) => update("event_date", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <AdminLabel htmlFor="start_time">Start time</AdminLabel>
            <AdminInput
              id="start_time"
              type="time"
              value={form.start_time}
              onChange={(e) => update("start_time", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <AdminLabel htmlFor="end_time">End time</AdminLabel>
            <AdminInput
              id="end_time"
              type="time"
              value={form.end_time}
              onChange={(e) => update("end_time", e.target.value)}
            />
          </div>
          <div className="rounded-2xl border border-tp-olive/15 bg-tp-olive/5 px-4 py-3 sm:col-span-2">
            <p className="font-accent text-[0.6rem] uppercase tracking-[0.18em] text-tp-olive">
              Public preview
            </p>
            <p className="mt-1 font-general text-sm text-tp-charcoal">
              {formatPreviewDate(form.event_date)} ·{" "}
              {formatPreviewTime(form.start_time, form.end_time)}
            </p>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <AdminLabel>Venue</AdminLabel>
            <AdminInput value={form.venue} onChange={(e) => update("venue", e.target.value)} />
          </div>
          <div className="space-y-2">
            <AdminLabel>Price (display)</AdminLabel>
            <AdminInput
              value={form.price_display}
              onChange={(e) => update("price_display", e.target.value)}
              placeholder="₹1,499"
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Booking URL</AdminLabel>
            <AdminInput
              value={form.booking_link}
              onChange={(e) => update("booking_link", e.target.value)}
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Media & copy
        </p>
        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <AdminLabel>Hero image URL</AdminLabel>
            <AdminInput value={form.image} onChange={(e) => update("image", e.target.value)} />
          </div>
          <div className="space-y-2">
            <AdminLabel>Short description</AdminLabel>
            <AdminTextarea
              rows={2}
              value={form.short_description}
              onChange={(e) => update("short_description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Full description</AdminLabel>
            <AdminTextarea
              rows={6}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Gallery URLs (one per line)</AdminLabel>
            <AdminTextarea
              rows={4}
              value={form.gallery_urls}
              onChange={(e) => update("gallery_urls", e.target.value)}
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Visibility
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 font-general text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => update("is_published", e.target.checked)}
              className="rounded border-tp-charcoal/20"
            />
            Published on site
          </label>
          <label className="flex items-center gap-2 font-general text-sm">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => update("is_featured", e.target.checked)}
              className="rounded border-tp-charcoal/20"
            />
            Featured on home
          </label>
        </div>
      </AdminCard>

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save event"}
        </AdminButton>
        <AdminButton type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </AdminButton>
      </div>
    </form>
  );
}
