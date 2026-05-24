"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const nav = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Voices", href: "#testimonials" },
  { label: "Connect", href: "#contact" },
];

export function Header({ instagramUrl = "https://instagram.com" }: { instagramUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-tp-charcoal tp-focus-ring rounded-sm sm:text-xl"
        >
          The Pause Project
        </Link>

        <nav
          className="hidden items-center gap-8 font-accent text-sm text-tp-charcoal/85 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition-colors hover:text-tp-olive after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-tp-olive after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-tp-charcoal/15 bg-tp-warm-white/70 px-4 py-2 text-xs uppercase tracking-wider backdrop-blur-md transition hover:border-tp-olive/40"
          >
            Instagram
          </a>
        </nav>

        <button
          type="button"
          className="rounded-full border border-tp-charcoal/15 bg-tp-warm-white/80 px-4 py-2 font-accent text-xs uppercase tracking-wider backdrop-blur-md tp-focus-ring md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-tp-charcoal/10 bg-tp-cream/95 px-5 py-6 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-4 font-accent text-base" aria-label="Mobile">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="tp-focus-ring rounded-sm py-1"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
