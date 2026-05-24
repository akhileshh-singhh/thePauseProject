"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorkshopEvent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { fadeUp, imageReveal, staggerContainer } from "@/animations/variants";

type EventDetailViewProps = {
  event: WorkshopEvent;
};

export function EventDetailView({ event }: EventDetailViewProps) {
  return (
    <article>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageReveal}
        className="relative aspect-[21/9] min-h-[220px] w-full overflow-hidden sm:min-h-[320px] lg:aspect-[24/9]"
      >
        <Image
          src={event.image}
          alt={`${event.title} at The Pause Project`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tp-cream via-tp-cream/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-tp-charcoal/70">
            {event.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight text-tp-charcoal sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="space-y-10">
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-tp-charcoal/10 bg-tp-warm-white/80 p-8 shadow-[0_20px_60px_rgba(42,40,36,0.05)]"
            >
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                    Date
                  </dt>
                  <dd className="mt-2 font-general text-sm text-tp-charcoal">{event.date}</dd>
                </div>
                <div>
                  <dt className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                    Time
                  </dt>
                  <dd className="mt-2 font-general text-sm text-tp-charcoal">{event.time}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                    Venue
                  </dt>
                  <dd className="mt-2 font-general text-sm text-tp-charcoal">{event.venue}</dd>
                </div>
                <div>
                  <dt className="font-accent text-xs font-semibold uppercase tracking-widest text-tp-stone">
                    Exchange
                  </dt>
                  <dd className="mt-2 font-display text-2xl text-tp-brown-deep">{event.price}</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <h2 className="font-display text-2xl text-tp-charcoal">About this gathering</h2>
              <p className="mt-4 whitespace-pre-line font-general text-base leading-relaxed text-tp-charcoal/85">
                {event.description}
              </p>
            </motion.div>

            <motion.section variants={fadeUp} custom={2} aria-labelledby="gallery-label">
              <h2 id="gallery-label" className="font-display text-2xl text-tp-charcoal">
                Moments like these
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {event.gallery.map((src, i) => (
                  <motion.div
                    key={src}
                    variants={fadeUp}
                    custom={i}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-tp-charcoal/10"
                  >
                    <Image
                      src={src}
                      alt={`${event.title} gallery ${i + 1}`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <motion.aside
            variants={fadeUp}
            custom={1}
            className="h-fit space-y-6 rounded-3xl border border-tp-charcoal/10 bg-tp-beige/40 p-8 backdrop-blur-sm lg:sticky lg:top-28"
          >
            <div>
              <h2 className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-tp-stone">
                Your host
              </h2>
              <div className="mt-6 flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-tp-charcoal/10">
                  <Image
                    src={event.host.image}
                    alt={`Portrait of ${event.host.name}`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-xl text-tp-charcoal">{event.host.name}</p>
                  <p className="mt-1 font-accent text-xs uppercase tracking-wider text-tp-stone">
                    {event.host.role}
                  </p>
                </div>
              </div>
              <p className="mt-6 font-general text-sm leading-relaxed text-tp-charcoal/85">
                {event.host.bio}
              </p>
            </div>
            <Button href={event.bookingLink} external variant="primary" className="w-full">
              Book on partner site
            </Button>
            <p className="font-general text-xs leading-relaxed text-tp-stone">
              You&apos;ll complete payment and confirmations on District or BookMyShow—
              we keep this page as a calm preview.
            </p>
            <Link
              href="/#events"
              className="inline-flex font-accent text-xs font-semibold uppercase tracking-widest text-tp-olive transition hover:text-tp-brown-deep tp-focus-ring rounded-sm"
            >
              ← All events
            </Link>
          </motion.aside>
        </motion.div>
      </div>
    </article>
  );
}
