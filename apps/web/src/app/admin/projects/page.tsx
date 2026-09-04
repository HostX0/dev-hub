"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Project } from "@/lib/types";
import { categoryLabel, imgUrl } from "@/lib/utils";
import { Confirm, Empty, PageHeader, Spinner, useToast } from "@/components/admin/ui";

export default function AdminProjects() {
  const [list, setList] = useState<Project[] | null>(null);
  const [del, setDel] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = () => clientApi<Project[]>("/projects/admin/all").then(setList).catch(() => setList([]));
  useEffect(() => {
    load();
  }, []);

  async function remove() {
    if (!del) return;
    setBusy(true);
    try {
      await clientApi(`/projects/${del.id}`, { method: "DELETE" });
      toast("success", "تم حذف المشروع");
      setDel(null);
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function toggle(p: Project, key: "featured" | "published") {
    try {
      await clientApi(`/projects/${p.id}`, { method: "PUT", json: { title: p.title, [key]: !p[key] } });
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }

  return (
    <div>
      <PageHeader
        title="المشاريع"
        description="إدارة معرض الأعمال."
        actions={
          <Link href="/admin/projects/new" className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-semibold text-bg">
            <Plus className="size-4" /> مشروع جديد
          </Link>
        }
      />
      {!list ? (
        <div className="grid h-64 place-items-center"><Spinner /></div>
      ) : list.length === 0 ? (
        <Empty text="لا توجد مشاريع. أضف أول مشروع لك!" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs text-muted">
              <tr>
                <th className="px-4 py-3 text-start font-medium">المشروع</th>
                <th className="hidden px-4 py-3 text-start font-medium md:table-cell">التصنيف</th>
                <th className="hidden px-4 py-3 text-start font-medium sm:table-cell">الحالة</th>
                <th className="px-4 py-3 text-start font-medium">مميز</th>
                <th className="px-4 py-3 text-end font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="hidden h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-2 sm:block">
                        {p.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imgUrl(p.coverImage)} alt="" className="size-full object-cover object-top" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link href={`/admin/projects/${p.id}`} className="block truncate font-semibold hover:text-brand-2">{p.title}</Link>
                        {p.titleEn && <span className="block truncate text-xs text-muted" dir="ltr">{p.titleEn}</span>}
                        <span className="block truncate font-display text-[11px] text-muted-2" dir="ltr">/{p.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted md:table-cell">{categoryLabel(p.category)}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <button onClick={() => toggle(p, "published")} className={p.published ? "rounded-full bg-success/15 px-2.5 py-1 text-xs text-success" : "rounded-full bg-warning/15 px-2.5 py-1 text-xs text-warning"}>
                      {p.published ? "منشور" : "مسودة"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggle(p, "featured")} aria-label="مميز">
                      <Star className={p.featured ? "size-4.5 fill-warning text-warning" : "size-4.5 text-muted-2"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <a href={`/ar/projects/${p.slug}`} target="_blank" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-fg" aria-label="عرض">
                        <ExternalLink className="size-4" />
                      </a>
                      <Link href={`/admin/projects/${p.id}`} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-fg" aria-label="تعديل">
                        <Pencil className="size-4" />
                      </Link>
                      <button onClick={() => setDel(p)} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-danger/10 hover:text-danger" aria-label="حذف">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Confirm open={!!del} title="حذف المشروع؟" text={del?.title} onConfirm={remove} onClose={() => setDel(null)} loading={busy} />
    </div>
  );
}
