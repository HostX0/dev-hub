"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Project } from "@/lib/types";
import { categoryLabel, imgUrl } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";
import { useAdmin } from "@/components/admin/AdminSession";
import {
  Card,
  Confirm,
  Empty,
  Field,
  Input,
  PageHeader,
  Select,
  Spinner,
  useToast,
} from "@/components/admin/ui";

const buttonCls =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line px-3 text-sm text-muted hover:border-brand/50 hover:text-fg disabled:opacity-50";
export default function AdminProjects() {
  const { can } = useAdmin();
  const writable = can("projects:write");
  const [list, setList] = useState<Project[] | null>(null);
  const [error, setError] = useState("");
  const [del, setDel] = useState<Project | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const toast = useToast();
  useEffect(() => {
    let active = true;
    clientApi<Project[]>("/projects/admin/all")
      .then((data) => {
        if (active) setList(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);
  async function load() {
    try {
      setList(await clientApi<Project[]>("/projects/admin/all"));
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  async function remove() {
    if (!del || !writable || busy !== null) return;
    setBusy(del.id);
    try {
      await clientApi(`/projects/${del.id}`, { method: "DELETE" });
      setList((all) => all?.filter((p) => p.id !== del.id) ?? []);
      setDel(null);
      toast("success", "تم حذف المشروع");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(null);
    }
  }
  async function toggle(project: Project, key: "featured" | "published") {
    if (!writable || busy !== null) return;
    setBusy(project.id);
    try {
      if (key === "published")
        await clientApi(`/projects/${project.id}/visibility`, {
          method: "PATCH",
          json: { published: !project.published },
        });
      else
        await clientApi(`/projects/${project.id}`, {
          method: "PUT",
          json: { title: project.title, featured: !project.featured },
        });
      await load();
      toast(
        "success",
        key === "published"
          ? project.published
            ? "تم إخفاء المشروع"
            : "تم نشر المشروع"
          : project.featured
            ? "تمت إزالة التمييز"
            : "تم تمييز المشروع",
      );
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(null);
    }
  }
  const filtered = list?.filter(
    (p) =>
      (status === "all" || (status === "published") === p.published) &&
      [p.title, p.titleEn, p.titleCkb, p.client, p.clientEn, p.slug]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div lang="ar" dir="rtl">
      <PageHeader
        title="المشاريع"
        description="إدارة معرض الأعمال والصور وترجمات المشاريع."
        actions={
          writable && (
            <Link
              href="/admin/projects/new"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
            >
              <Plus className="size-4" /> مشروع جديد
            </Link>
          )
        }
      />
      <Card className="mb-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px]">
        <Field label="البحث في المشاريع">
          <Input
            lang="ar"
            dir="auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عنوان المشروع أو العميل أو الرابط"
          />
        </Field>
        <Field label="حالة النشر">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">كل المشاريع</option>
            <option value="published">المنشورة</option>
            <option value="draft">المسودات</option>
          </Select>
        </Field>
      </Card>
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-danger/40 p-4 text-sm text-danger"
        >
          تعذر تحميل المشاريع: {error}
          <button type="button" className="ms-3 underline" onClick={load}>
            إعادة المحاولة
          </button>
        </div>
      )}
      {!list && !error ? (
        <div
          className="grid h-48 place-items-center"
          role="status"
          aria-label="جارٍ تحميل المشاريع"
        >
          <Spinner />
        </div>
      ) : filtered?.length ? (
        <div className="space-y-4">
          {filtered.map((project) => (
            <Card key={project.id} className="flex flex-wrap items-start gap-4">
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2">
                <SafeImage
                  src={imgUrl(project.coverImage)}
                  alt={project.title}
                  fallback="لا توجد صورة"
                  className="size-full object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1 basis-48">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="break-words text-lg font-bold hover:text-brand-2"
                >
                  {project.title || "مشروع بلا عنوان"}
                </Link>
                <p
                  lang="en"
                  dir="ltr"
                  className="mt-1 break-words text-xs text-muted"
                >
                  {project.titleEn}
                </p>
                <p
                  lang="en"
                  dir="ltr"
                  className="mt-1 break-words text-xs text-muted"
                >
                  /{project.slug}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-brand-2">
                    {categoryLabel(project.category)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 ${project.published ? "bg-success/10 text-success" : "bg-white/5 text-muted"}`}
                  >
                    {project.published ? "منشور" : "مسودة"}
                  </span>
                  {project.featured && (
                    <span className="rounded-full bg-warning/10 px-2.5 py-1 text-warning">
                      مميز
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-wrap gap-2 border-t border-line pt-4 xl:w-auto xl:border-0 xl:pt-0">
                {project.published && (
                  <Link
                    href={`/ar/projects/${encodeURIComponent(project.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonCls}
                    aria-label={`عرض ${project.title}`}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className={buttonCls}
                >
                  <Pencil className="size-4" />
                  {writable ? "تعديل" : "قراءة"}
                </Link>
                {writable && (
                  <>
                    <button
                      type="button"
                      disabled={busy !== null}
                      className={buttonCls}
                      onClick={() => toggle(project, "published")}
                    >
                      {project.published ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                      {project.published ? "إخفاء" : "نشر"}
                    </button>
                    <button
                      type="button"
                      disabled={busy !== null}
                      className={buttonCls}
                      aria-label={`تمييز ${project.title}`}
                      aria-pressed={project.featured}
                      onClick={() => toggle(project, "featured")}
                    >
                      <Star
                        className={`size-4 ${project.featured ? "fill-warning text-warning" : ""}`}
                      />
                    </button>
                    <button
                      type="button"
                      disabled={busy !== null}
                      className={buttonCls}
                      aria-label={`حذف ${project.title}`}
                      onClick={() => setDel(project)}
                    >
                      <Trash2 className="size-4 text-danger" />
                    </button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        list && (
          <Empty
            text={
              query || status !== "all"
                ? "لا توجد مشاريع تطابق البحث والفلاتر."
                : "لا توجد مشاريع بعد. أضف أول مشروع واحفظه كمسودة."
            }
          />
        )
      )}
      <Confirm
        open={!!del}
        title="حذف المشروع نهائياً؟"
        text={
          del
            ? `سيتم حذف «${del.title}» وترجماته من معرض الأعمال. يمكنك إخفاؤه بدلاً من حذفه.`
            : ""
        }
        onConfirm={remove}
        onClose={() => {
          if (busy === null) setDel(null);
        }}
        loading={busy !== null}
      />
    </div>
  );
}
