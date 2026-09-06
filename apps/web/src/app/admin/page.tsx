"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  KanbanSquare,
  MessageSquare,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { clientApi } from "@/lib/client-api";
import { useAdmin } from "@/components/admin/AdminSession";
import { Card, PageHeader, Spinner } from "@/components/admin/ui";

const resources = [
  {
    key: "tasks",
    label: "التاسكات",
    path: "/tasks",
    icon: KanbanSquare,
    description: "تابع تقدم الفريق والتعليقات ومراحل العمل.",
  },
  {
    key: "projects",
    label: "المشاريع",
    path: "/projects/admin/all",
    icon: Briefcase,
    description: "نظّم أعمالنا السابقة وظهورها على الموقع.",
  },
  {
    key: "articles",
    label: "المقالات",
    path: "/articles/admin/all",
    icon: BookOpen,
    description: "حرّر المحتوى التقني باللغات الثلاث.",
  },
  {
    key: "services",
    label: "الخدمات",
    path: "/services/admin/all",
    icon: Sparkles,
    description: "حدّث خدمات الشركة ونقاط تميزها.",
  },
  {
    key: "messages",
    label: "الرسائل",
    path: "/messages",
    icon: MessageSquare,
    description: "اطّلع على طلبات التواصل الواردة.",
  },
  {
    key: "users",
    label: "الأدمن",
    path: "/users",
    icon: Users,
    description: "أدر الحسابات وحدود الوصول.",
  },
];

export default function AdminHome() {
  const { user, can } = useAdmin();
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const allowed = resources.filter((r) => can(`${r.key}:read`));
      const results = await Promise.allSettled(
        allowed.map((r) => clientApi<unknown[]>(r.path)),
      );
      if (!cancelled) {
        setCounts(
          Object.fromEntries(
            allowed.map((r, i) => [
              r.key,
              results[i].status === "fulfilled"
                ? results[i].value.length
                : null,
            ]),
          ),
        );
        setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [can]);
  return (
    <div>
      <PageHeader
        title={`أهلاً، ${user.displayName || user.username}`}
        description="مساحة الفريق لإدارة المحتوى والعمل اليومي."
        actions={
          can("projects:write") && (
            <Link
              href="/admin/projects/new"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
            >
              <Plus className="size-4" /> مشروع جديد
            </Link>
          )
        }
      />
      <div className="mb-7 rounded-2xl border border-brand/20 bg-brand/10 p-6 md:p-8">
        <p className="mb-2 text-sm font-semibold text-brand-2">
          نبني أفضل، معاً.
        </p>
        <h2 className="text-xl font-bold">
          وضوح في المحتوى. تنظيم في التنفيذ.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          اختر قسماً لمتابعة العمل. المحتوى المنشور يظهر للزوار، والمسودات تبقى
          داخل لوحة التحكم حتى تصبح جاهزة.
        </p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resources
            .filter((r) => can(`${r.key}:read`))
            .map((r) => (
              <Link href={`/admin/${r.key}`} key={r.key}>
                <Card className="h-full transition-colors hover:border-brand/50">
                  <div className="flex items-center justify-between gap-3">
                    <r.icon className="size-5 text-brand-2" />
                    <span className="text-2xl font-bold">
                      {counts[r.key] ?? "—"}
                    </span>
                  </div>
                  <h2 className="mt-5 font-bold">{r.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {r.description}
                  </p>
                  {counts[r.key] === null && (
                    <p className="mt-3 text-xs text-warning">
                      تعذّر تحميل العدد. افتح القسم لإعادة المحاولة.
                    </p>
                  )}
                </Card>
              </Link>
            ))}
        </div>
      )}
      {can("settings:read") && (
        <Link
          href="/admin/settings"
          className="mt-6 block rounded-2xl border border-line p-6 transition-colors hover:border-brand/50"
        >
          <h2 className="font-bold">هوية الشركة والتواصل</h2>
          <p className="mt-2 text-sm text-muted">
            معلومات التواصل، حسابات التواصل الاجتماعي، المؤسسون والعملاء، ومحتوى
            الصفحة الرئيسية.
          </p>
        </Link>
      )}
      {!resources.some((r) => can(`${r.key}:read`)) &&
        !can("settings:read") && (
          <Card>
            <p className="text-sm text-muted">
              حسابك نشط ولم تُمنح له صلاحيات أقسام بعد. تواصل مع مالك الحساب
              لتحديد دورك.
            </p>
          </Card>
        )}
    </div>
  );
}
