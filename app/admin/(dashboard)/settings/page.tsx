"use client";

import { FormEvent, useEffect, useState } from "react";
import { getAccessToken } from "@/lib/admin-auth";
import { fetchSiteSettings, saveSiteSettings } from "@/lib/admin-api";
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

const SECTIONS: { title: string; fields: { key: string; label: string; multiline?: boolean }[] }[] = [
  {
    title: "Hero",
    fields: [
      { key: "hero_eyebrow", label: "Eyebrow" },
      { key: "hero_title", label: "Title" },
      { key: "hero_subtitle", label: "Subtitle", multiline: true },
      { key: "hero_cta_primary_label", label: "Primary CTA label" },
      { key: "hero_cta_primary_href", label: "Primary CTA link" },
      { key: "hero_cta_secondary_label", label: "Secondary CTA label" },
      { key: "hero_cta_secondary_href", label: "Secondary CTA link" },
    ],
  },
  {
    title: "About",
    fields: [
      { key: "about_heading", label: "Heading" },
      { key: "about_body", label: "Body", multiline: true },
      { key: "about_sidebar_heading", label: "Sidebar heading" },
      { key: "about_sidebar_body", label: "Sidebar body", multiline: true },
    ],
  },
  {
    title: "Section intros",
    fields: [
      { key: "events_section_label", label: "Events label" },
      { key: "events_section_heading", label: "Events heading" },
      { key: "events_section_body", label: "Events blurb", multiline: true },
      { key: "gallery_section_label", label: "Gallery label" },
      { key: "gallery_section_heading", label: "Gallery heading" },
      { key: "gallery_section_body", label: "Gallery blurb", multiline: true },
      { key: "testimonials_section_label", label: "Testimonials label" },
      { key: "testimonials_section_heading", label: "Testimonials heading" },
    ],
  },
  {
    title: "Contact & footer",
    fields: [
      { key: "contact_heading", label: "Contact heading" },
      { key: "contact_body", label: "Contact body", multiline: true },
      { key: "contact_address", label: "Address", multiline: true },
      { key: "contact_whatsapp_url", label: "WhatsApp URL" },
      { key: "instagram_url", label: "Instagram URL" },
      { key: "footer_tagline", label: "Footer tagline" },
      { key: "default_meta_description", label: "SEO description", multiline: true },
    ],
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchSiteSettings(token)
      .then((data) => setSettings(data as Record<string, string>))
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  function update(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const data = await saveSiteSettings(token, settings);
      setSettings(data as Record<string, string>);
      setSaved(true);
    } catch {
      setError("Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <AdminSpinner />;

  return (
    <>
      <AdminPageHeader
        eyebrow="Site copy"
        title="Settings"
        description="Hero, about, section headings, contact block, and SEO defaults."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? <AdminAlert>{error}</AdminAlert> : null}
        {saved ? <AdminAlert tone="success">Settings saved.</AdminAlert> : null}

        {SECTIONS.map((section) => (
          <AdminCard key={section.title}>
            <p className="font-accent text-[0.65rem] uppercase tracking-[0.2em] text-tp-olive">
              {section.title}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div
                  key={field.key}
                  className={field.multiline ? "space-y-2 sm:col-span-2" : "space-y-2"}
                >
                  <AdminLabel>{field.label}</AdminLabel>
                  {field.multiline ? (
                    <AdminTextarea
                      rows={3}
                      value={settings[field.key] ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                    />
                  ) : (
                    <AdminInput
                      value={settings[field.key] ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </AdminCard>
        ))}

        <AdminButton type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save all settings"}
        </AdminButton>
      </form>
    </>
  );
}
