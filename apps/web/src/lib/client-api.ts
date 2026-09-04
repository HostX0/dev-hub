"use client";

const TOKEN_KEY = "dp_admin_token";

export const auth = {
  get token() {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function clientApi<T = unknown>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = auth.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  let body = init.body;
  if (init.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.json);
  }
  const res = await fetch(`/api${path}`, { ...init, headers, body });
  if (res.status === 401 && typeof window !== "undefined" && window.location.pathname.startsWith("/admin") && !path.startsWith("/auth/login")) {
    auth.clear();
    window.location.href = "/admin/login";
  }
  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      message = Array.isArray(data.message) ? data.message.join("، ") : data.message || message;
    } catch {}
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  const data = (await res.json()) as T;
  const method = (init.method ?? "GET").toUpperCase();
  if (method !== "GET" && !path.startsWith("/auth") && !path.startsWith("/messages") && !path.startsWith("/uploads")) {
    fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${auth.token ?? ""}` } }).catch(() => {});
  }
  return data;
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const { url } = await clientApi<{ url: string }>("/uploads", { method: "POST", body: fd });
  return url;
}
