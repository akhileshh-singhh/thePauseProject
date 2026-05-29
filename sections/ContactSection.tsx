"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

export function ContactSection({ settings }: { settings?: SiteSettingsData }) {
  const s = { ...defaultSiteSettings, ...settings };
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setLoading(true);
    try {
      await apiRequest("/contact/", { method: "POST", json: payload });
      setSent(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try WhatsApp or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-tp-cream py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionLabel>Visit & write</SectionLabel>
            <h2
              id="contact-heading"
              className="mt-6 font-display text-4xl tracking-tight text-tp-charcoal sm:text-5xl"
            >
              {s.contact_heading}
            </h2>
            <p className="mt-6 font-general text-sm leading-relaxed text-tp-charcoal/80 sm:text-base">
              {s.contact_body}
            </p>
            <div className="mt-10 space-y-4 rounded-3xl border border-tp-charcoal/10 bg-tp-warm-white/80 p-6">
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-tp-stone">
                Studio post
              </p>
              <p className="whitespace-pre-line font-general text-sm text-tp-charcoal/90">
                {s.contact_address}
              </p>
              <Button
                href={s.contact_whatsapp_url ?? "https://wa.me/919876543210"}
                external
                variant="outline"
                className="!mt-4 w-full sm:w-auto"
              >
                WhatsApp the studio
              </Button>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-tp-charcoal/10 bg-tp-beige/40 p-8 shadow-[0_20px_60px_rgba(42,40,36,0.05)] backdrop-blur-sm"
          >
            <p className="font-display text-2xl text-tp-charcoal">Send a note</p>
            <p className="mt-2 font-general text-sm text-tp-stone">
              We read every note—usually within a day or two.
            </p>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                  Name
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-2xl border border-tp-charcoal/15 bg-tp-warm-white px-4 py-3 font-general text-sm text-tp-charcoal outline-none ring-tp-olive/30 placeholder:text-tp-stone/60 focus:ring-2"
                  placeholder="How should we greet you?"
                />
              </label>
              <label className="block">
                <span className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-2xl border border-tp-charcoal/15 bg-tp-warm-white px-4 py-3 font-general text-sm text-tp-charcoal outline-none ring-tp-olive/30 placeholder:text-tp-stone/60 focus:ring-2"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full resize-y rounded-2xl border border-tp-charcoal/15 bg-tp-warm-white px-4 py-3 font-general text-sm text-tp-charcoal outline-none ring-tp-olive/30 placeholder:text-tp-stone/60 focus:ring-2"
                  placeholder="Workshop idea, collaboration, or a simple hello."
                />
              </label>
            </div>
            {error ? (
              <p className="mt-6 font-general text-sm text-red-800">{error}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
                disabled={loading || sent}
              >
                {sent
                  ? "Thank you — we’ll be in touch"
                  : loading
                    ? "Sending…"
                    : "Send message"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
