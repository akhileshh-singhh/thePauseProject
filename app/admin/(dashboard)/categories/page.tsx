"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  deleteCategory,
  fetchCategories,
  saveCategory,
  type AdminCategory,
} from "@/lib/admin-api";
import {
  AdminAlert,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminLabel,
  AdminPageHeader,
  AdminSpinner,
} from "@/components/admin/ui";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", sort_order: 0 });

  useEffect(() => {
    let active = true;

    void (async () => {
      try {
        const categories = await fetchCategories();
        if (active) {
          setItems(categories);
          setError(null);
        }
      } catch {
        if (active) setError("Failed to load categories.");
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
    setSaving(true);
    setError(null);
    try {
      const created = await saveCategory({
        name: form.name.trim(),
        sort_order: form.sort_order,
      });
      setItems((prev) =>
        [...prev, created].sort((a, b) =>
          a.sort_order === b.sort_order ? a.name.localeCompare(b.name) : a.sort_order - b.sort_order
        )
      );
      setForm({ name: "", sort_order: 0 });
    } catch {
      setError("Could not add category. Name must be unique.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this category? You cannot remove categories used by events.")) return;
    setError(null);
    try {
      await deleteCategory(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Could not delete category. Remove it from linked events first.");
    }
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Categories"
        description="Create event categories used in workshop forms."
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}

      <AdminCard className="mb-8">
        <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
          Add category
        </p>
        <form onSubmit={handleAdd} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <AdminLabel>Name</AdminLabel>
            <AdminInput
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Pottery"
              required
            />
          </div>
          <div className="space-y-2">
            <AdminLabel>Sort order</AdminLabel>
            <AdminInput
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Adding…" : "Add category"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>

      {loading ? <AdminSpinner /> : null}

      {!loading ? (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-tp-charcoal/8 bg-tp-warm-white/80 p-4"
            >
              <div>
                <p className="font-display text-xl text-tp-charcoal">{item.name}</p>
                <p className="font-general text-sm text-tp-stone">Sort order: {item.sort_order}</p>
              </div>
              <AdminButton variant="ghost" onClick={() => handleDelete(item.id)}>
                Delete
              </AdminButton>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}
