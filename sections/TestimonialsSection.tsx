"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  settings?: SiteSettingsData;
};

export function TestimonialsSection({ testimonials, settings }: TestimonialsSectionProps) {
  const s = { ...defaultSiteSettings, ...settings };
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 border-b border-tp-charcoal/10 bg-tp-warm-white/70 py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>{s.testimonials_section_label}</SectionLabel>
        <h2
          id="testimonials-heading"
          className="mt-6 max-w-2xl font-display text-4xl tracking-tight text-tp-charcoal sm:text-5xl"
        >
          {s.testimonials_section_heading}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={`${t.name || "testimonial"}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex h-full flex-col justify-between rounded-3xl border border-tp-charcoal/10 bg-tp-cream/60 p-7 shadow-[0_12px_40px_rgba(42,40,36,0.04)]"
            >
              <p className="font-general text-sm leading-relaxed text-tp-charcoal/90 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 border-t border-tp-charcoal/10 pt-6">
                <p className="font-display text-lg text-tp-brown-deep">{t.name}</p>
                <p className="mt-1 font-accent text-xs uppercase tracking-widest text-tp-stone">
                  {t.context}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
