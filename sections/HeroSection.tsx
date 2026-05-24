"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

export function HeroSection({ settings }: { settings?: SiteSettingsData }) {
  const reduceMotion = useReducedMotion();
  const s = { ...defaultSiteSettings, ...settings };

  return (
    <section
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-tp-brown-deep pb-16 pt-32 sm:items-center sm:pb-24 sm:pt-28"
      aria-label="Introduction"
    >
      {!reduceMotion ? (
        <>
          <motion.div
            className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-tp-rose-mist/35 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-tp-olive/25 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-tp-cream/25 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-b from-tp-brown-deep via-tp-charcoal to-tp-brown-deep opacity-90"
          aria-hidden
        />
      )}

      <div
        className="tp-grain pointer-events-none absolute inset-0 z-[1] opacity-40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl space-y-8 text-tp-warm-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-accent text-xs font-semibold uppercase tracking-[0.35em] text-tp-warm-white/70"
          >
            {s.hero_eyebrow}
          </motion.p>
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-pre-line font-display text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.95] tracking-tight"
            >
              {s.hero_title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl font-general text-base leading-relaxed text-tp-warm-white/78 sm:text-lg"
            >
              {s.hero_subtitle}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={s.hero_cta_primary_href ?? "#events"}
              variant="primary"
              className="bg-tp-warm-white text-tp-charcoal hover:bg-tp-cream"
            >
              {s.hero_cta_primary_label}
            </Button>
            <Button
              href={s.hero_cta_secondary_href ?? "#social"}
              variant="ghost"
              className="border-tp-warm-white/35 bg-transparent text-tp-warm-white hover:bg-tp-warm-white/10"
            >
              {s.hero_cta_secondary_label}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
