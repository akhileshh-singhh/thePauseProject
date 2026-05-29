"use client";

import { ApiError, apiRequest, type Paginated } from "@/lib/api";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/admin-auth";
import type { WorkshopEvent } from "@/lib/types";

export class AdminAuthError extends Error {
  constructor(message = "Session expired. Please sign in again.") {
    super(message);
    this.name = "AdminAuthError";
  }
}

type AdminRequestOptions = Omit<Parameters<typeof apiRequest>[1], "token">;

async function refreshAccessToken(): Promise<string> {
  const refresh = getRefreshToken();
  if (!refresh) throw new AdminAuthError();

  const data = await apiRequest<{ access: string }>("/auth/token/refresh/", {
    method: "POST",
    json: { refresh },
  });

  setTokens({ access: data.access, refresh });
  return data.access;
}

function redirectToLogin() {
  if (typeof window === "undefined") return;
  clearTokens();
  const next = `${window.location.pathname}${window.location.search}`;
  window.location.href = `/admin/login?next=${encodeURIComponent(next)}`;
}

async function adminApiRequest<T>(
  path: string,
  options: AdminRequestOptions = {}
): Promise<T> {
  let token = getAccessToken();
  if (!token) {
    redirectToLogin();
    throw new AdminAuthError();
  }

  try {
    return await apiRequest<T>(path, { ...options, token });
  } catch (err) {
    const isExpired =
      err instanceof ApiError &&
      err.status === 401 &&
      typeof err.data === "object" &&
      err.data !== null &&
      "code" in err.data &&
      (err.data as { code: string }).code === "token_not_valid";

    if (!isExpired) throw err;

    try {
      token = await refreshAccessToken();
      return await apiRequest<T>(path, { ...options, token });
    } catch {
      redirectToLogin();
      throw new AdminAuthError();
    }
  }
}

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

export type SaveAdminEventPayload = {
  title: string;
  slug: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  venue: string;
  price_display: string;
  booking_link: string;
  short_description: string;
  description: string;
  category: number;
  host: number;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  image_file?: File;
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

export async function login(username: string, password: string) {
  return apiRequest<{ access: string; refresh: string }>("/auth/token/", {
    method: "POST",
    json: { username, password },
  });
}

export async function fetchStats() {
  return adminApiRequest<AdminStats>("/admin/stats/");
}

export async function fetchAdminEvents() {
  const data = await adminApiRequest<Paginated<AdminEvent> | AdminEvent[]>(
    "/admin/events/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function fetchAdminEvent(slug: string) {
  return adminApiRequest<AdminEvent>(`/admin/events/${slug}/`);
}

export async function saveAdminEvent(payload: SaveAdminEventPayload, slug?: string) {
  const path = slug ? `/admin/events/${slug}/` : "/admin/events/";
  const method = slug ? "PATCH" : "POST";
  const body = new FormData();
  body.append("title", payload.title);
  body.append("slug", payload.slug);
  body.append("event_date", payload.event_date);
  body.append("start_time", payload.start_time);
  if (payload.end_time) body.append("end_time", payload.end_time);
  body.append("venue", payload.venue);
  body.append("price_display", payload.price_display);
  body.append("booking_link", payload.booking_link);
  body.append("short_description", payload.short_description);
  body.append("description", payload.description);
  body.append("category", String(payload.category));
  body.append("host", String(payload.host));
  body.append("is_published", String(payload.is_published));
  body.append("is_featured", String(payload.is_featured));
  body.append("sort_order", String(payload.sort_order));
  if (payload.image_file) body.append("image_file", payload.image_file);

  return adminApiRequest<AdminEvent>(path, { method, body });
}

export async function deleteAdminEvent(slug: string) {
  return adminApiRequest<void>(`/admin/events/${slug}/`, {
    method: "DELETE",
  });
}

export async function fetchHosts() {
  const data = await adminApiRequest<Paginated<AdminHost> | AdminHost[]>(
    "/admin/hosts/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function fetchCategories() {
  const data = await adminApiRequest<Paginated<AdminCategory> | AdminCategory[]>(
    "/admin/categories/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function saveCategory(payload: Partial<AdminCategory>, id?: number) {
  const path = id ? `/admin/categories/${id}/` : "/admin/categories/";
  return adminApiRequest<AdminCategory>(path, {
    method: id ? "PATCH" : "POST",
    json: payload,
  });
}

export async function deleteCategory(id: number) {
  return adminApiRequest<void>(`/admin/categories/${id}/`, {
    method: "DELETE",
  });
}

export async function fetchAdminGallery() {
  const data = await adminApiRequest<Paginated<AdminGalleryImage> | AdminGalleryImage[]>(
    "/admin/gallery/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function saveGalleryImage(
  payload: { alt: string; caption: string; sort_order: number; is_published: boolean; src_file: File },
  id?: number
) {
  const path = id ? `/admin/gallery/${id}/` : "/admin/gallery/";
  const body = new FormData();
  body.append("alt", payload.alt);
  body.append("caption", payload.caption);
  body.append("sort_order", String(payload.sort_order));
  body.append("is_published", String(payload.is_published));
  body.append("src_file", payload.src_file);

  return adminApiRequest<AdminGalleryImage>(path, {
    method: id ? "PATCH" : "POST",
    body,
  });
}

export async function deleteGalleryImage(id: number) {
  return adminApiRequest<void>(`/admin/gallery/${id}/`, {
    method: "DELETE",
  });
}

export async function fetchAdminTestimonials() {
  const data = await adminApiRequest<Paginated<AdminTestimonial> | AdminTestimonial[]>(
    "/admin/testimonials/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function saveTestimonial(payload: Partial<AdminTestimonial>, id?: number) {
  const path = id ? `/admin/testimonials/${id}/` : "/admin/testimonials/";
  return adminApiRequest<AdminTestimonial>(path, {
    method: id ? "PATCH" : "POST",
    json: payload,
  });
}

export async function deleteTestimonial(id: number) {
  return adminApiRequest<void>(`/admin/testimonials/${id}/`, {
    method: "DELETE",
  });
}

export async function fetchMessages() {
  const data = await adminApiRequest<Paginated<AdminMessage> | AdminMessage[]>(
    "/admin/messages/"
  );
  return Array.isArray(data) ? data : data.results;
}

export async function markMessageRead(id: number) {
  return adminApiRequest<AdminMessage>(`/admin/messages/${id}/mark_read/`, {
    method: "POST",
  });
}

export async function fetchSiteSettings() {
  return adminApiRequest<SiteSettingsData>("/admin/site/");
}

export async function saveSiteSettings(payload: SiteSettingsData) {
  return adminApiRequest<SiteSettingsData>("/admin/site/", {
    method: "PATCH",
    json: payload,
  });
}

export type { WorkshopEvent };
