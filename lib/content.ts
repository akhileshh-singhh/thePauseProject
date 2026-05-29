import {
  API_REVALIDATE_SECONDS,
  apiRequest,
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
  return getFeaturedEventsFromApi();
}

export async function getAllEvents(): Promise<WorkshopEvent[]> {
  return getEventsFromApi();
}

export async function getEventBySlug(slug: string): Promise<WorkshopEvent | undefined> {
  return (await getEventBySlugFromApi(slug)) ?? undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  const events = await getAllEvents();
  return events.map((e) => e.slug);
}

export async function getGallery(): Promise<GalleryImage[]> {
  return getGalleryFromApi();
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return getTestimonialsFromApi();
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const remote = await getSiteSettingsFromApi();
  return { ...defaultSiteSettings, ...remote };
}

export async function getSocialLinks(): Promise<SocialLinkItem[]> {
  return getSocialLinksFromApi();
}
