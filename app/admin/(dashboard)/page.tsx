"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAccessToken } from "@/lib/admin-auth";
import { fetchStats, type AdminStats } from "@/lib/admin-api";
import { StatCard } from "@/components/admin/StatCard";
import {
  AdminAlert,
  AdminCard,
  AdminLinkButton,
  AdminPageHeader,
  AdminSpinner,
} from "@/components/admin/ui";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchStats(token)
      .then(setStats)
      .catch(() => setError("Could not load dashboard stats."));
  }, []);

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Studio at a glance"
        description="Everything that powers the public site—events, gallery, voices, and inbox."
        actions={
          <>
            <AdminLinkButton href="/admin/events/new" variant="primary">
              New event
            </AdminLinkButton>
            <AdminLinkButton href="/">View site</AdminLinkButton>
          </>
        }
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}
      {!stats && !error ? <AdminSpinner /> : null}

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Workshops" value={stats.events} hint={`${stats.published_events} published`} />
            <StatCard label="Gallery" value={stats.gallery_images} />
            <StatCard label="Testimonials" value={stats.testimonials} />
            <StatCard label="Hosts" value={stats.hosts} />
            <StatCard
              label="Unread inbox"
              value={stats.unread_messages}
              hint={stats.unread_messages ? "Needs your attention" : "All caught up"}
            />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <AdminCard>
              <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
                Quick actions
              </p>
              <ul className="mt-5 space-y-3 font-general text-sm">
                {[
                  ["/admin/events", "Manage workshops"],
                  ["/admin/gallery", "Edit gallery grid"],
                  ["/admin/testimonials", "Update voices"],
                  ["/admin/settings", "Hero & contact copy"],
                  ["/admin/messages", "Read contact form"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center justify-between rounded-2xl border border-tp-charcoal/8 bg-tp-cream/40 px-4 py-3 transition hover:border-tp-olive/30 hover:bg-tp-warm-white"
                    >
                      <span className="text-tp-charcoal">{label}</span>
                      <span className="text-tp-stone">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </AdminCard>

            <AdminCard className="bg-gradient-to-br from-tp-brown-deep to-tp-charcoal text-tp-warm-white">
              <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-rose-mist/80">
                Django admin
              </p>
              <p className="mt-4 font-display text-2xl leading-snug">
                Need raw database access?
              </p>
              <p className="mt-3 font-general text-sm text-tp-warm-white/65">
                Use Django&apos;s built-in admin at{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                  /django-admin/
                </code>{" "}
                on port 8000 for advanced edits.
              </p>
            </AdminCard>
          </div>
        </>
      ) : null}
    </>
  );
}
