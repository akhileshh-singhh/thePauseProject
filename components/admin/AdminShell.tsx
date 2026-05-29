"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearTokens } from "@/lib/admin-auth";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/admin", label: "Overview", icon: "◦" },
  { href: "/admin/events", label: "Events", icon: "◇" },
  { href: "/admin/categories", label: "Categories", icon: "⌗" },
  { href: "/admin/gallery", label: "Gallery", icon: "▢" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "❝" },
  { href: "/admin/messages", label: "Inbox", icon: "✉" },
  { href: "/admin/settings", label: "Site copy", icon: "◎" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  function logout() {
    clearTokens();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-tp-cream">
      <div className="pointer-events-none fixed inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_20%_10%,rgba(95,107,76,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(196,169,154,0.18),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-tp-charcoal/8 bg-tp-brown-deep/95 px-5 py-8 text-tp-warm-white lg:flex">
          <Link href="/admin" className="block px-2">
            <p className="font-accent text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-tp-rose-mist/80">
              Studio control
            </p>
            <p className="mt-2 font-display text-2xl leading-none tracking-tight">
              The Pause
            </p>
            <p className="mt-1 font-general text-xs text-tp-warm-white/55">
              Admin dashboard
            </p>
          </Link>

          <nav className="mt-10 flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 font-general text-sm transition",
                    active
                      ? "bg-tp-warm-white/12 text-tp-warm-white"
                      : "text-tp-warm-white/65 hover:bg-tp-warm-white/6 hover:text-tp-warm-white"
                  )}
                >
                  <span className="font-accent text-xs opacity-70">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 border-t border-tp-warm-white/10 pt-6">
            <Link
              href="/"
              target="_blank"
              className="block rounded-2xl px-3 py-2 font-general text-sm text-tp-warm-white/60 transition hover:bg-tp-warm-white/6 hover:text-tp-warm-white"
            >
              View live site ↗
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full rounded-2xl px-3 py-2 text-left font-general text-sm text-tp-rose-mist/90 transition hover:bg-tp-warm-white/6"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-tp-charcoal/8 bg-tp-cream/85 px-5 py-4 backdrop-blur-md lg:hidden">
            <div>
              <p className="font-accent text-[0.6rem] uppercase tracking-[0.2em] text-tp-olive">
                Admin
              </p>
              <p className="font-display text-lg text-tp-charcoal">The Pause Project</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="font-accent text-[0.65rem] uppercase tracking-[0.16em] text-tp-stone"
            >
              Sign out
            </button>
          </header>

          <nav className="flex gap-1 overflow-x-auto border-b border-tp-charcoal/8 px-4 py-2 lg:hidden">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 font-accent text-[0.6rem] uppercase tracking-[0.14em]",
                    active
                      ? "bg-tp-olive text-tp-warm-white"
                      : "bg-tp-warm-white text-tp-stone"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <main className="flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
