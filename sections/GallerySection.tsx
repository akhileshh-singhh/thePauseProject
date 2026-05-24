"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/lib/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type { SiteSettingsData } from "@/lib/types";

type GallerySectionProps = {
  images: GalleryImage[];
  settings?: SiteSettingsData;
};

export function GallerySection({ images, settings }: GallerySectionProps) {
  const s = { ...defaultSiteSettings, ...settings };
  return (
    <section
      id="gallery"
      className="scroll-mt-28 border-b border-tp-charcoal/10 bg-tp-cream py-24 sm:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl space-y-4">
          <SectionLabel>{s.gallery_section_label}</SectionLabel>
          <h2
            id="gallery-heading"
            className="font-display text-4xl tracking-tight text-tp-charcoal sm:text-5xl"
          >
            {s.gallery_section_heading}
          </h2>
          <p className="font-general text-sm leading-relaxed text-tp-charcoal/80 sm:text-base">
            {s.gallery_section_body}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {images.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(i * 0.04, 0.24),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-tp-charcoal/10 bg-tp-warm-white shadow-[0_16px_50px_rgba(42,40,36,0.06)]"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-tp-charcoal/0 transition duration-500 group-hover:bg-tp-charcoal/10" />
              </div>
              {img.caption ? (
                <figcaption className="flex min-h-[3.25rem] items-center px-4 py-3 font-accent text-xs uppercase tracking-widest text-tp-stone">
                  <span className="line-clamp-2">{img.caption}</span>
                </figcaption>
              ) : (
                <div className="min-h-[3.25rem]" aria-hidden />
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
