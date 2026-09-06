"use client";

const TOKEN_KEY = "dp_admin_token";
export const AUTH_EXPIRED_EVENT = "devshub:session-expired";

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

function adminError(status: number, detail: string) {
  if (/[\u0600-\u06ff]/.test(detail)) return detail;
  if (/stage contains tasks/i.test(detail))
    return "المرحلة تحتوي تاسكات. انقلها أولاً، بما فيها التاسكات الموجودة في الأرشيف.";
  if (/at least one stage/i.test(detail))
    return "يجب الإبقاء على مرحلة عمل واحدة على الأقل.";
  if (/assignee/i.test(detail))
    return "اختر مسؤولاً بحساب نشط ثم أعد المحاولة.";
  if (/translation|published article|section|takeaway|source/i.test(detail))
    return "تحقق من اكتمال ترجمات المحتوى والأقسام والمصادر قبل النشر.";
  if (/password/i.test(detail))
    return "تعذّر تغيير كلمة المرور. تحقق من كلمة المرور الحالية وشروط الكلمة الجديدة، ثم أعد المحاولة.";
  if (/username|already exists|duplicate|slug/i.test(detail))
    return "الاسم أو الرابط مستخدم مسبقاً، أو لا يطابق الصيغة المطلوبة. اختر قيمة أخرى.";
  if (status === 401)
    return "تعذّر تسجيل الدخول أو انتهت الجلسة. تحقق من بيانات الحساب وسجّل الدخول مجدداً.";
  if (status === 403) return "حسابك لا يملك صلاحية تنفيذ هذا الإجراء.";
  if (status === 404) return "العنصر غير موجود، أو تم حذفه. حدّث الصفحة.";
  if (status === 409)
    return "تعذّر تنفيذ الإجراء بسبب حالة العنصر الحالية. حدّث البيانات ثم أعد المحاولة.";
  if (status === 413) return "الملف أكبر من الحجم المسموح. اختر ملفاً أصغر.";
  if (status === 429)
    return "طلبات كثيرة خلال وقت قصير. انتظر قليلاً ثم أعد المحاولة.";
  if (status === 400)
    return "تحقق من الحقول المطلوبة، وصحة الروابط وأطوال النصوص، ثم أعد المحاولة.";
  return "تعذّر الاتصال بالخادم. حاول مرة أخرى بعد قليل.";
}

export async function clientApi<T = unknown>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  const token = auth.token;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  let body = init.body;
  if (init.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(init.json);
  }
  const res = await fetch(`/api${path}`, { ...init, headers, body });
  if (
    res.status === 401 &&
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/admin") &&
    !path.startsWith("/auth/login")
  ) {
    auth.clear();
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }
  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      message = Array.isArray(data.message)
        ? data.message.join("، ")
        : data.message || message;
    } catch {}
    throw new ApiError(
      res.status,
      typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin")
        ? adminError(res.status, message)
        : message,
    );
  }
  if (res.status === 204) return undefined as T;
  const data = (await res.json()) as T;
  const method = (init.method ?? "GET").toUpperCase();
  if (
    method !== "GET" &&
    /^\/(projects|services|articles|settings)(\/|$)/.test(path)
  ) {
    fetch("/api/revalidate", {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.token ?? ""}` },
    }).catch(() => {});
  }
  return data;
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const { url } = await clientApi<{ url: string }>("/uploads", {
    method: "POST",
    body: fd,
  });
  return url;
}
