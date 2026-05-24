import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Header } from "@/components/layout/Header";
import type { SiteSettingsData } from "@/lib/types";

type SiteShellProps = {
  children: React.ReactNode;
  settings?: SiteSettingsData;
};

export function SiteShell({ children, settings }: SiteShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-0 z-[100] whitespace-nowrap rounded-full bg-tp-warm-white px-4 py-2 font-accent text-sm text-tp-charcoal shadow-lg focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-tp-olive focus:ring-offset-2 focus:ring-offset-tp-cream"
      >
        Skip to content
      </a>
      <GrainOverlay />
      <Header instagramUrl={settings?.instagram_url} />
      <main id="main-content" className="relative z-[2] flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
