"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Briefcase, MessageSquare, Plus, Sparkles, Star } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Message, Project, Service } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Card, Empty, PageHeader, Spinner } from "@/components/admin/ui";

export default function AdminHome() {
  const [data, setData] = useState<{ projects: Project[]; services: Service[]; messages: Message[] } | null>(null);

  useEffect(() => {
    Promise.all([clientApi<Project[]>("/projects/admin/all"), clientApi<Service[]>("/services"), clientApi<Message[]>("/messages")])
      .then(([projects, services, messages]) => setData({ projects, services, messages }))
      .catch(() => setData({ projects: [], services: [], messages: [] }));
  }, []);

  if (!data)
    return (
      <div className="grid h-64 place-items-center">
        <Spinner />
      </div>
    );

  const unread = data.messages.filter((m) => !m.read).length;
  const stats = [
    { label: "المشاريع", value: data.projects.length, icon: Briefcase, href: "/admin/projects" },
    { label: "مشاريع مميزة", value: data.projects.filter((p) => p.featured).length, icon: Star, href: "/admin/projects" },
    { label: "الخدمات", value: data.services.length, icon: Sparkles, href: "/admin/services" },
    { label: "رسائل غير مقروءة", value: unread, icon: MessageSquare, href: "/admin/messages" },
  ];

  return (
    <div>
      <PageHeader
        title="نظرة عامة"
        description="ملخص سريع لمحتوى الموقع."
        actions={
          <Link href="/admin/projects/new" className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-semibold text-bg">
            <Plus className="size-4" /> مشروع جديد
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-colors hover:border-brand/40">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{s.label}</span>
                <s.icon className="size-4.5 text-brand-2" />
              </div>
              <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">آخر الرسائل</h2>
            <Link href="/admin/messages" className="text-xs text-brand-2 hover:underline">عرض الكل</Link>
          </div>
          {data.messages.length === 0 ? (
            <Empty text="لا توجد رسائل بعد" />
          ) : (
            <ul className="divide-y divide-line">
              {data.messages.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      {!m.read && <span className="size-1.5 rounded-full bg-brand-2" />}
                      {m.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">{m.subject || m.body}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-2">{formatDate(m.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">آخر المشاريع</h2>
            <Link href="/admin/projects" className="text-xs text-brand-2 hover:underline">عرض الكل</Link>
          </div>
          {data.projects.length === 0 ? (
            <Empty text="لا توجد مشاريع بعد" />
          ) : (
            <ul className="divide-y divide-line">
              {data.projects.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <Link href={`/admin/projects/${p.id}`} className="min-w-0 truncate text-sm font-semibold hover:text-brand-2">{p.title}</Link>
                  <span className={p.published ? "text-[11px] text-success" : "text-[11px] text-warning"}>{p.published ? "منشور" : "مسودة"}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
