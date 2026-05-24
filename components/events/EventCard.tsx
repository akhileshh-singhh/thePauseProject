"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorkshopEvent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { softScale } from "@/animations/variants";

type EventCardProps = {
  event: WorkshopEvent;
  index: number;
};

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.article
      variants={softScale}
      initial="rest"
      whileHover="hover"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tp-charcoal/10 bg-tp-warm-white/70 shadow-[0_20px_60px_rgba(42,40,36,0.06)] backdrop-blur-sm"
    >
      <Link
        href={`/events/${event.slug}`}
        className="block shrink-0 tp-focus-ring rounded-t-3xl"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={`${event.title} — workshop visual`}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tp-charcoal/45 via-transparent to-transparent opacity-80" />
          <span className="absolute left-4 top-4 rounded-full bg-tp-warm-white/90 px-3 py-1 font-accent text-[10px] font-semibold uppercase tracking-widest text-tp-charcoal backdrop-blur-sm">
            {event.category}
          </span>
        </div>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-6 sm:p-7">
        <div className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl leading-snug tracking-tight text-tp-charcoal sm:text-2xl">
              <Link
                href={`/events/${event.slug}`}
                className="line-clamp-2 min-h-[2.75rem] transition hover:text-tp-olive sm:min-h-[3.25rem] tp-focus-ring rounded-sm"
              >
                {event.title}
              </Link>
            </h3>
            <p className="line-clamp-1 font-accent text-sm text-tp-stone" title={`${event.date} · ${event.venue}`}>
              {event.date} · {event.venue}
            </p>
          </div>
          <p className="line-clamp-3 min-h-[4.5rem] flex-1 font-general text-sm leading-relaxed text-tp-charcoal/80">
            {event.shortDescription}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-tp-charcoal/10 pt-4">
          <p className="font-display text-lg text-tp-brown-deep">{event.price}</p>
          <div className="flex flex-wrap gap-2">
            <Button href={`/events/${event.slug}`} variant="ghost" className="!px-4 !py-2 !text-xs">
              Details
            </Button>
            <Button href={event.bookingLink} external variant="primary" className="!px-4 !py-2 !text-xs">
              Book now
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
