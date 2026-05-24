import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function EventNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-tp-cream">
      <SiteShell>
        <div className="mx-auto flex max-w-lg flex-col items-start gap-6 px-5 py-32 sm:px-8">
          <p className="font-accent text-xs font-semibold uppercase tracking-[0.25em] text-tp-stone">
            404
          </p>
          <h1 className="font-display text-4xl tracking-tight text-tp-charcoal">
            This gathering has stepped out.
          </h1>
          <p className="font-general text-sm leading-relaxed text-tp-charcoal/80">
            The link may be old, or the event has quietly closed. Return home to
            see what&apos;s breathing on the calendar.
          </p>
          <Link
            href="/#events"
            className="rounded-full border border-tp-charcoal/20 bg-tp-warm-white px-6 py-3 font-accent text-sm font-medium tracking-wide text-tp-charcoal transition hover:border-tp-olive/40 tp-focus-ring"
          >
            View upcoming events
          </Link>
        </div>
      </SiteShell>
    </div>
  );
}
