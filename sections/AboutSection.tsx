"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

export function AboutSection({ settings }: { settings?: SiteSettingsData }) {
  const s = { ...defaultSiteSettings, ...settings };
  return (
    <section
      id="about"
      className="relative scroll-mt-28 border-b border-tp-charcoal/10 bg-tp-cream py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>Our story</SectionLabel>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          <div className="space-y-8">
            <motion.h2
              variants={fadeUp}
              id="about-heading"
              className="font-display text-4xl leading-[1.05] tracking-tight text-tp-charcoal sm:text-5xl lg:text-[3.25rem]"
            >
              {s.about_heading}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-general max-w-xl text-base leading-relaxed text-tp-charcoal/85 sm:text-lg"
            >
              {s.about_body}
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="space-y-6 rounded-3xl border border-tp-charcoal/10 bg-tp-warm-white/80 p-8 shadow-[0_24px_80px_rgba(42,40,36,0.06)] backdrop-blur-sm"
          >
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-tp-stone">
              {s.about_sidebar_heading}
            </p>
            <p className="whitespace-pre-line font-general text-sm leading-relaxed text-tp-charcoal/85">
              {s.about_sidebar_body}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
