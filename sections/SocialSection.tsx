"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { SocialLinkItem } from "@/lib/types";

export function SocialSection({ links }: { links: SocialLinkItem[] }) {
  return (
    <section
      id="social"
      className="scroll-mt-28 border-b border-tp-charcoal/10 bg-tp-brown-deep py-24 text-tp-warm-white sm:py-32"
      aria-labelledby="social-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel className="!text-tp-warm-white/60">Stay close</SectionLabel>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="social-heading"
            className="max-w-xl font-display text-4xl tracking-tight sm:text-5xl"
          >
            Find us between feeds and real rooms.
          </h2>
          <p className="max-w-md font-general text-sm leading-relaxed text-tp-warm-white/75">
            Social for us is a moodboard and an open door—not a performance.
            Choose your thread; we respond kindly.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {links.map((item, i) => (
            <motion.a
              key={`${item.title}-${i}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col justify-between rounded-3xl border border-tp-warm-white/15 bg-tp-warm-white/5 p-7 transition-colors hover:border-tp-warm-white/35 hover:bg-tp-warm-white/10 tp-focus-ring"
            >
              <div>
                <p className="font-display text-2xl">{item.title}</p>
                <p className="mt-3 font-general text-sm leading-relaxed text-tp-warm-white/72">
                  {item.description}
                </p>
              </div>
              <p className="mt-8 font-accent text-xs font-semibold uppercase tracking-[0.2em] text-tp-sand">
                {item.cta_label || "Open"}
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
