"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/admin-auth";
import { deleteAdminEvent, fetchAdminEvents, type AdminEvent } from "@/lib/admin-api";
import {
  AdminAlert,
  AdminBadge,
  AdminButton,
  AdminEmpty,
  AdminLinkButton,
  AdminPageHeader,
  AdminSpinner,
} from "@/components/admin/ui";
import { CmsImage } from "@/components/ui/CmsImage";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    try {
      setEvents(await fetchAdminEvents(token));
      setError(null);
    } catch {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this event permanently?")) return;
    const token = getAccessToken();
    if (!token) return;
    try {
      await deleteAdminEvent(token, slug);
      setEvents((prev) => prev.filter((e) => e.slug !== slug));
    } catch {
      setError("Could not delete event.");
    }
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Workshops"
        title="Events"
        description="Create, publish, and reorder your Mumbai gatherings."
        actions={
          <AdminLinkButton href="/admin/events/new" variant="primary">
            New event
          </AdminLinkButton>
        }
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}
      {loading ? <AdminSpinner /> : null}

      {!loading && events.length === 0 ? (
        <AdminEmpty
          title="No events yet"
          description="Seed from JSON or create your first workshop."
          action={
            <AdminLinkButton href="/admin/events/new" variant="primary">
              Create event
            </AdminLinkButton>
          }
        />
      ) : null}

      {!loading && events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col gap-4 rounded-3xl border border-tp-charcoal/8 bg-tp-warm-white/80 p-4 transition hover:border-tp-olive/25 sm:flex-row sm:items-center sm:p-5"
            >
              <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-28">
                <CmsImage
                  src={event.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl text-tp-charcoal">{event.title}</h2>
                  <AdminBadge tone={event.is_published ? "success" : "warning"}>
                    {event.is_published ? "Live" : "Draft"}
                  </AdminBadge>
                  {event.is_featured ? (
                    <AdminBadge tone="neutral">Featured</AdminBadge>
                  ) : null}
                </div>
                <p className="mt-1 font-general text-sm text-tp-stone">
                  {event.event_date} · {event.start_time}
                  {event.end_time ? ` – ${event.end_time}` : ""} · {event.venue}
                </p>
                <p className="mt-1 font-accent text-[0.6rem] uppercase tracking-[0.14em] text-tp-olive">
                  {event.category_name}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <AdminLinkButton href={`/admin/events/${event.slug}`} variant="secondary">
                  Edit
                </AdminLinkButton>
                <Link
                  href={`/events/${event.slug}`}
                  target="_blank"
                  className="inline-flex items-center rounded-full px-4 py-2.5 font-accent text-[0.6rem] uppercase tracking-[0.14em] text-tp-stone hover:text-tp-charcoal"
                >
                  Preview ↗
                </Link>
                <AdminButton variant="ghost" onClick={() => handleDelete(event.slug)}>
                  Delete
                </AdminButton>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
