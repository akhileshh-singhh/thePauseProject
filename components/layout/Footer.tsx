import Link from "next/link";
import type { SiteSettingsData } from "@/lib/types";

const footerNav = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export function Footer({ settings }: { settings?: SiteSettingsData }) {
  const tagline =
    settings?.footer_tagline ??
    "A Mumbai-based creative studio gathering for anyone who needs a gentler pace—workshops, circles, and community rooted in pause.";

  const socials = [
    { label: "Instagram", href: settings?.instagram_url ?? "https://instagram.com" },
    { label: "WhatsApp", href: settings?.contact_whatsapp_url ?? "https://wa.me/919876543210" },
  ];

  return (
    <footer className="border-t border-tp-charcoal/10 bg-tp-beige/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-16 sm:px-8 lg:flex-row lg:justify-between">
        <div className="max-w-md space-y-4">
          <p className="font-display text-2xl tracking-tight text-tp-charcoal">
            {settings?.site_name ?? "The Pause Project"}
          </p>
          <p className="font-general text-sm leading-relaxed text-tp-stone">{tagline}</p>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-tp-stone">
              Explore
            </p>
            <ul className="mt-4 space-y-2 font-accent text-sm text-tp-charcoal/90">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="tp-focus-ring rounded-sm transition hover:text-tp-olive"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-tp-stone">
              Social
            </p>
            <ul className="mt-4 space-y-2 font-accent text-sm text-tp-charcoal/90">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tp-focus-ring rounded-sm transition hover:text-tp-olive"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-tp-charcoal/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-tp-stone sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} The Pause Project. Mumbai, India.</p>
          <p className="font-accent uppercase tracking-wider">
            Pause often. Make generously.
          </p>
        </div>
      </div>
    </footer>
  );
}
