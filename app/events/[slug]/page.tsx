import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { EventDetailView } from "@/components/events/EventDetailView";
import { getAllSlugs, getEventBySlug, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return { title: "Event" };
  }
  return {
    title: event.title,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [{ url: event.image, width: 1200, height: 630, alt: event.title }],
    },
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const [event, settings] = await Promise.all([
    getEventBySlug(slug),
    getSiteSettings(),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-tp-cream">
      <SiteShell settings={settings}>
        <EventDetailView event={event} />
      </SiteShell>
    </div>
  );
}
