import eventsData from "@/data/events.json";
import galleryData from "@/data/gallery.json";
import testimonialsData from "@/data/testimonials.json";
import {
  API_REVALIDATE_SECONDS,
  apiRequest,
  isApiEnabled,
  unwrapResults,
} from "@/lib/api";
import { defaultSiteSettings } from "@/lib/site-defaults";
import type {
  GalleryImage,
  SiteSettingsData,
  SocialLinkItem,
  Testimonial,
  WorkshopEvent,
} from "@/lib/types";

const revalidate = API_REVALIDATE_SECONDS;

export async function getEventsFromApi(): Promise<WorkshopEvent[]> {
  const data = await apiRequest<WorkshopEvent[] | { results: WorkshopEvent[] }>(
    "/events/",
    { revalidate }
  );
  return unwrapResults(data);
}

export async function getFeaturedEventsFromApi(): Promise<WorkshopEvent[]> {
  const data = await apiRequest<WorkshopEvent[] | { results: WorkshopEvent[] }>(
    "/events/?featured=true",
    { revalidate }
  );
  return unwrapResults(data);
}

export async function getEventBySlugFromApi(slug: string): Promise<WorkshopEvent | null> {
  try {
    return await apiRequest<WorkshopEvent>(`/events/${slug}/`, { revalidate });
  } catch {
    return null;
  }
}

export async function getGalleryFromApi(): Promise<GalleryImage[]> {
  const data = await apiRequest<GalleryImage[] | { results: GalleryImage[] }>(
    "/gallery/",
    { revalidate }
  );
  return unwrapResults(data);
}

export async function getTestimonialsFromApi(): Promise<Testimonial[]> {
  const data = await apiRequest<Testimonial[] | { results: Testimonial[] }>(
    "/testimonials/",
    { revalidate }
  );
  return unwrapResults(data);
}

export async function getSiteSettingsFromApi(): Promise<SiteSettingsData> {
  return apiRequest<SiteSettingsData>("/site/", { revalidate });
}

export async function getSocialLinksFromApi(): Promise<SocialLinkItem[]> {
  const data = await apiRequest<SocialLinkItem[] | { results: SocialLinkItem[] }>(
    "/social/",
    { revalidate }
  );
  return unwrapResults(data);
}

export async function getEvents(): Promise<WorkshopEvent[]> {
  if (isApiEnabled()) {
    try {
      return await getFeaturedEventsFromApi();
    } catch {
      /* fallback */
    }
  }
  return eventsData as WorkshopEvent[];
}

export async function getAllEvents(): Promise<WorkshopEvent[]> {
  if (isApiEnabled()) {
    try {
      return await getEventsFromApi();
    } catch {
      /* fallback */
    }
  }
  return eventsData as WorkshopEvent[];
}

export async function getEventBySlug(slug: string): Promise<WorkshopEvent | undefined> {
  if (isApiEnabled()) {
    try {
      const event = await getEventBySlugFromApi(slug);
      if (event) return event;
    } catch {
      /* fallback */
    }
  }
  return (eventsData as WorkshopEvent[]).find((e) => e.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const events = await getAllEvents();
  return events.map((e) => e.slug);
}

export async function getGallery(): Promise<GalleryImage[]> {
  if (isApiEnabled()) {
    try {
      return await getGalleryFromApi();
    } catch {
      /* fallback */
    }
  }
  return galleryData as GalleryImage[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isApiEnabled()) {
    try {
      return await getTestimonialsFromApi();
    } catch {
      /* fallback */
    }
  }
  return testimonialsData as Testimonial[];
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (isApiEnabled()) {
    try {
      const remote = await getSiteSettingsFromApi();
      return { ...defaultSiteSettings, ...remote };
    } catch {
      /* fallback */
    }
  }
  return defaultSiteSettings;
}

export async function getSocialLinks(): Promise<SocialLinkItem[]> {
  if (isApiEnabled()) {
    try {
      const links = await getSocialLinksFromApi();
      if (links.length) return links;
    } catch {
      /* fallback */
    }
  }
  return [
    {
      platform: "instagram",
      title: "Instagram",
      description: "Film stills from workshops, studio corners, and city light.",
      href: defaultSiteSettings.instagram_url ?? "https://instagram.com",
      cta_label: "Follow along",
    },
    {
      platform: "linktree",
      title: "Linktree",
      description: "All links in one calm place—waitlists, playlists, reads.",
      href: "https://linktr.ee",
      cta_label: "Open tree",
    },
    {
      platform: "whatsapp",
      title: "WhatsApp",
      description: "Say hello for private circles, collaborations, or gentle questions.",
      href: defaultSiteSettings.contact_whatsapp_url ?? "https://wa.me/919876543210",
      cta_label: "Message us",
    },
  ];
}
