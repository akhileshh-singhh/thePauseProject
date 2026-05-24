const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

export const API_REVALIDATE_SECONDS = 60;
const API_TIMEOUT_MS = 10_000;

export function isApiEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_API_URL);
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = RequestInit & {
  token?: string | null;
  json?: unknown;
  formData?: FormData;
  revalidate?: number | false;
};

export async function apiRequest<T>(
  path: string,
  { token, json, formData, headers, revalidate, ...init }: RequestOptions = {}
): Promise<T> {
  const url = path.startsWith("http")
    ? path
    : `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  const res = await fetch(url, {
    ...init,
    signal: controller.signal,
    headers: {
      ...(json !== undefined && formData === undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body:
      formData !== undefined
        ? formData
        : json !== undefined
          ? JSON.stringify(json)
          : init.body,
    ...(revalidate !== undefined
      ? { next: { revalidate: revalidate === false ? 0 : revalidate } }
      : { cache: "no-store" }),
  }).finally(() => clearTimeout(timeout));

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "detail" in data &&
      typeof (data as { detail: unknown }).detail === "string"
        ? (data as { detail: string }).detail
        : `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export function getApiBase() {
  return API_BASE;
}

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function unwrapResults<T>(data: Paginated<T> | { results: T[] } | T[]): T[] {
  return Array.isArray(data) ? data : data.results;
}
