"use client";

import { motion } from "framer-motion";
import type { WorkshopEvent } from "@/lib/types";
import { EventCard } from "@/components/events/EventCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { staggerContainer } from "@/animations/variants";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

type FeaturedEventsSectionProps = {
  events: WorkshopEvent[];
  settings?: SiteSettingsData;
};

export function FeaturedEventsSection({ events, settings }: FeaturedEventsSectionProps) {
  const s = { ...defaultSiteSettings, ...settings };
  return (
    <section
      id="events"
      className="scroll-mt-28 border-b border-tp-charcoal/10 bg-tp-beige/35 py-24 sm:py-32"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl space-y-4">
            <SectionLabel>{s.events_section_label}</SectionLabel>
            <h2
              id="events-heading"
              className="font-display text-4xl tracking-tight text-tp-charcoal sm:text-5xl"
            >
              {s.events_section_heading}
            </h2>
            <p className="font-general text-sm leading-relaxed text-tp-charcoal/80 sm:text-base">
              {s.events_section_body}
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.slug}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <EventCard event={event} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
