"use client";

import { FormEvent, useEffect, useState } from "react";
import { getAccessToken } from "@/lib/admin-auth";
import {
  deleteTestimonial,
  fetchAdminTestimonials,
  saveTestimonial,
  type AdminTestimonial,
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

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ quote: "", name: "", context: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    const token = getAccessToken();
    if (!token) return;
    try {
      setItems(await fetchAdminTestimonials(token));
    } catch {
      setError("Failed to load testimonials.");
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
      const created = await saveTestimonial(token, {
        ...form,
        sort_order: items.length,
        is_published: true,
        event: null,
      });
      setItems((prev) => [...prev, created]);
      setForm({ quote: "", name: "", context: "" });
    } catch {
      setError("Could not add testimonial.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    const token = getAccessToken();
    if (!token) return;
    try {
      await deleteTestimonial(token, id);
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Could not delete.");
    }
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Voices"
        title="Testimonials"
        description="Quotes from guests and community members."
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}

      <AdminCard className="mb-8">
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Add testimonial
        </p>
        <form onSubmit={handleAdd} className="mt-5 space-y-4">
          <div className="space-y-2">
            <AdminLabel>Quote</AdminLabel>
            <AdminTextarea
              rows={3}
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <AdminLabel>Name</AdminLabel>
              <AdminInput
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <AdminLabel>Context</AdminLabel>
              <AdminInput
                value={form.context}
                onChange={(e) => setForm({ ...form, context: e.target.value })}
                placeholder="Pottery & Pause guest"
                required
              />
            </div>
          </div>
          <AdminButton type="submit" disabled={saving}>
            {saving ? "Adding…" : "Add testimonial"}
          </AdminButton>
        </form>
      </AdminCard>

      {loading ? <AdminSpinner /> : null}

      <div className="space-y-4">
        {items.map((t) => (
          <blockquote
            key={t.id}
            className="rounded-3xl border border-tp-charcoal/8 bg-tp-warm-white/80 p-6"
          >
            <p className="font-display text-xl leading-snug text-tp-charcoal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-accent text-xs uppercase tracking-[0.14em] text-tp-olive">
                  {t.name}
                </p>
                <p className="font-general text-sm text-tp-stone">{t.context}</p>
              </div>
              <AdminButton variant="ghost" onClick={() => handleDelete(t.id)}>
                Delete
              </AdminButton>
            </footer>
          </blockquote>
        ))}
      </div>
    </>
  );
}
