"use client";

import { apiRequest } from "@/lib/api";
import type { WorkshopEvent } from "@/lib/types";

export type AdminStats = {
  events: number;
  published_events: number;
  gallery_images: number;
  testimonials: number;
  unread_messages: number;
  hosts: number;
};

export type AdminEvent = {
  id: number;
  title: string;
  slug: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  venue: string;
  price_display: string;
  image: string;
  booking_link: string;
  short_description: string;
  description: string;
  category: number;
  category_name: string;
  host: number;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  gallery: { id?: number; image_url: string; sort_order: number }[];
  created_at: string;
  updated_at: string;
};

export type AdminGalleryImage = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  sort_order: number;
  is_published: boolean;
};

export type AdminTestimonial = {
  id: number;
  quote: string;
  name: string;
  context: string;
  event: number | null;
  sort_order: number;
  is_published: boolean;
};

export type AdminMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type AdminHost = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type AdminCategory = {
  id: number;
  name: string;
  sort_order: number;
};

export type SiteSettingsData = Record<string, string>;

export type Paginated<T> = { count: number; next: string | null; previous: string | null; results: T[] };

function auth(token: string) {
  return { token };
}

export async function login(username: string, password: string) {
  return apiRequest<{ access: string; refresh: string }>("/auth/token/", {
    method: "POST",
    json: { username, password },
  });
}

export async function fetchStats(token: string) {
  return apiRequest<AdminStats>("/admin/stats/", auth(token));
}

export async function fetchAdminEvents(token: string) {
  const data = await apiRequest<Paginated<AdminEvent> | AdminEvent[]>(
    "/admin/events/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function fetchAdminEvent(token: string, slug: string) {
  return apiRequest<AdminEvent>(`/admin/events/${slug}/`, auth(token));
}

export async function saveAdminEvent(
  token: string,
  payload: Partial<AdminEvent> & { slug?: string },
  slug?: string
) {
  const path = slug ? `/admin/events/${slug}/` : "/admin/events/";
  const method = slug ? "PATCH" : "POST";
  return apiRequest<AdminEvent>(path, { method, json: payload, ...auth(token) });
}

export async function deleteAdminEvent(token: string, slug: string) {
  return apiRequest<void>(`/admin/events/${slug}/`, {
    method: "DELETE",
    ...auth(token),
  });
}

export async function fetchHosts(token: string) {
  const data = await apiRequest<Paginated<AdminHost> | AdminHost[]>(
    "/admin/hosts/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function fetchCategories(token: string) {
  const data = await apiRequest<Paginated<AdminCategory> | AdminCategory[]>(
    "/admin/categories/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function fetchAdminGallery(token: string) {
  const data = await apiRequest<Paginated<AdminGalleryImage> | AdminGalleryImage[]>(
    "/admin/gallery/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function saveGalleryImage(
  token: string,
  payload: Partial<AdminGalleryImage>,
  id?: number
) {
  const path = id ? `/admin/gallery/${id}/` : "/admin/gallery/";
  return apiRequest<AdminGalleryImage>(path, {
    method: id ? "PATCH" : "POST",
    json: payload,
    ...auth(token),
  });
}

export async function deleteGalleryImage(token: string, id: number) {
  return apiRequest<void>(`/admin/gallery/${id}/`, {
    method: "DELETE",
    ...auth(token),
  });
}

export async function fetchAdminTestimonials(token: string) {
  const data = await apiRequest<Paginated<AdminTestimonial> | AdminTestimonial[]>(
    "/admin/testimonials/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function saveTestimonial(
  token: string,
  payload: Partial<AdminTestimonial>,
  id?: number
) {
  const path = id ? `/admin/testimonials/${id}/` : "/admin/testimonials/";
  return apiRequest<AdminTestimonial>(path, {
    method: id ? "PATCH" : "POST",
    json: payload,
    ...auth(token),
  });
}

export async function deleteTestimonial(token: string, id: number) {
  return apiRequest<void>(`/admin/testimonials/${id}/`, {
    method: "DELETE",
    ...auth(token),
  });
}

export async function fetchMessages(token: string) {
  const data = await apiRequest<Paginated<AdminMessage> | AdminMessage[]>(
    "/admin/messages/",
    auth(token)
  );
  return Array.isArray(data) ? data : data.results;
}

export async function markMessageRead(token: string, id: number) {
  return apiRequest<AdminMessage>(`/admin/messages/${id}/mark_read/`, {
    method: "POST",
    ...auth(token),
  });
}

export async function fetchSiteSettings(token: string) {
  return apiRequest<SiteSettingsData>("/admin/site/", auth(token));
}

export async function saveSiteSettings(token: string, payload: SiteSettingsData) {
  return apiRequest<SiteSettingsData>("/admin/site/", {
    method: "PATCH",
    json: payload,
    ...auth(token),
  });
}

export type { WorkshopEvent };
