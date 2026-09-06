"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { auth, clientApi } from "@/lib/client-api";
import { cn } from "@/lib/utils";
import { Spinner, ToastProvider } from "./ui";
import { Logo } from "@/components/ui/Logo";

const NAV = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/projects", label: "المشاريع", icon: Briefcase },
  { href: "/admin/services", label: "الخدمات", icon: Sparkles },
  { href: "/admin/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

/** Shared brand identity across the public site and content workspace. */
function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col items-start gap-2">
      <Logo />
      {!compact && <span className="text-xs text-muted">لوحة التحكم</span>}
    </span>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(isLogin);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (isLogin) return;
    if (!auth.token) {
      router.replace("/admin/login");
      return;
    }
    clientApi("/auth/me")
      .then(() => setReady(true))
      .catch(() => router.replace("/admin/login"));
  }, [isLogin, router]);

  useEffect(() => {
    if (!ready || isLogin) return;
    clientApi<{ count: number }>("/messages/unread-count")
      .then((r) => setUnread(r.count))
      .catch(() => {});
  }, [ready, isLogin, pathname]);

  if (isLogin) return <ToastProvider>{children}</ToastProvider>;
  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner />
      </div>
    );

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map((n) => {
        const active =
          n.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand/15 text-fg"
                : "text-muted hover:bg-white/5 hover:text-fg",
            )}
          >
            <n.icon className={cn("size-4.5", active && "text-brand-2")} />
            {n.label}
            {n.href === "/admin/messages" && unread > 0 && (
              <span className="ms-auto rounded-full bg-brand px-2 py-0.5 font-display text-[11px] font-bold text-white">
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const bottom = (
    <div className="mt-auto space-y-1 border-t border-line pt-3">
      <a
        href="/ar"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-fg"
      >
        <ExternalLink className="size-4.5" />
        عرض الموقع
      </a>
      <button
        onClick={() => {
          auth.clear();
          router.replace("/admin/login");
        }}
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-danger hover:bg-danger/10"
      >
        <LogOut className="size-4.5" />
        تسجيل الخروج
      </button>
    </div>
  );

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-e border-line bg-surface p-4 md:flex">
          <Link href="/admin" className="mb-6 px-2">
            <Brand />
          </Link>
          {nav}
          {bottom}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-4 py-3 backdrop-blur md:hidden">
            <Link href="/admin">
              <Brand compact />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg border border-line"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </header>
          {open && (
            <div
              className="fixed inset-0 z-30 bg-bg/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            >
              <aside
                className="flex h-full w-72 flex-col bg-surface p-4 pt-20"
                onClick={(e) => e.stopPropagation()}
              >
                {nav}
                {bottom}
              </aside>
            </div>
          )}
          <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
