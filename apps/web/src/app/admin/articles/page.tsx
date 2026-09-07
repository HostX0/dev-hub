"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { AdminArticle } from "@/lib/articles";
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

const labels = { product: "المنتج", engineering: "الهندسة", growth: "النمو" };
export default function AdminArticles() {
  const { can } = useAdmin();
  const writable = can("articles:write");
  const toast = useToast();
  const [articles, setArticles] = useState<AdminArticle[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [deleting, setDeleting] = useState<AdminArticle | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    clientApi<AdminArticle[]>("/articles/admin/all")
      .then((data) => {
        if (active) setArticles(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);
  async function reload() {
    try {
      setArticles(await clientApi<AdminArticle[]>("/articles/admin/all"));
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  async function visibility(article: AdminArticle) {
    if (!writable || busy !== null) return;
    setBusy(article.id);
    try {
      await clientApi(`/articles/${article.id}/visibility`, {
        method: "PATCH",
        json: { published: !article.published },
      });
      await reload();
      toast("success", article.published ? "تم إخفاء المقال" : "تم نشر المقال");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(null);
    }
  }
  async function remove() {
    if (!deleting || !writable || busy !== null) return;
    setBusy(deleting.id);
    try {
      await clientApi(`/articles/${deleting.id}`, { method: "DELETE" });
      setArticles((all) => all?.filter((a) => a.id !== deleting.id) ?? []);
      setDeleting(null);
      toast("success", "تم حذف المقال");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(null);
    }
  }
  const filtered = articles?.filter(
    (a) =>
      (status === "all" || (status === "published") === a.published) &&
      [a.slug, ...Object.values(a.translations).map((c) => c.title)]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div lang="ar" dir="rtl">
      <PageHeader
        title="المقالات"
        description="إدارة المقالات وترجماتها ومصادرها وحالة ظهورها على الموقع."
        actions={
          writable && (
            <Link
              href="/admin/articles/new"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
            >
              <Plus className="size-4" /> مقال جديد
            </Link>
          )
        }
      />
      <Card className="mb-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px]">
        <Field label="البحث في المقالات">
          <Input
            lang="ar"
            dir="auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عنوان المقال أو رابطه"
          />
        </Field>
        <Field label="حالة النشر">
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">كل المقالات</option>
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
          تعذر تحميل المقالات: {error}
          <button type="button" className="ms-3 underline" onClick={reload}>
            إعادة المحاولة
          </button>
        </div>
      )}
      {!articles && !error ? (
        <div
          className="grid h-48 place-items-center"
          role="status"
          aria-label="جارٍ تحميل المقالات"
        >
          <Spinner />
        </div>
      ) : filtered?.length ? (
        <div className="space-y-4">
          {filtered.map((article) => (
            <Card
              key={article.id}
              className="flex flex-wrap items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1 basis-64">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs text-brand-2">
                    {labels[article.category]}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${article.published ? "bg-success/10 text-success" : "bg-white/5 text-muted"}`}
                  >
                    {article.published ? "منشور" : "مسودة"}
                  </span>
                  <time lang="en" dir="ltr" className="text-xs text-muted">
                    {article.publishedAt.slice(0, 10)}
                  </time>
                </div>
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="break-words text-lg font-bold hover:text-brand-2"
                >
                  {article.translations.ar?.title ||
                    article.translations.en?.title ||
                    "مقال بلا عنوان"}
                </Link>
                <p
                  lang="en"
                  dir="ltr"
                  className="mt-1 break-words text-xs text-muted"
                >
                  /{article.slug}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                  {article.translations.ar?.excerpt ||
                    "لم تتم إضافة المقدمة العربية بعد."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {article.published && (
                  <Link
                    href={`/ar/blog/${encodeURIComponent(article.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-xl border border-line text-muted hover:text-fg"
                    aria-label={`عرض ${article.translations.ar?.title || article.slug}`}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm"
                >
                  <Pencil className="size-4" />
                  {writable ? "تعديل" : "قراءة"}
                </Link>
                {writable && (
                  <>
                    <button
                      type="button"
                      disabled={busy !== null}
                      onClick={() => visibility(article)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm disabled:opacity-50"
                    >
                      {article.published ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                      {article.published ? "إخفاء" : "نشر"}
                    </button>
                    <button
                      type="button"
                      disabled={busy !== null}
                      onClick={() => setDeleting(article)}
                      className="grid size-11 place-items-center rounded-xl border border-line text-danger disabled:opacity-50"
                      aria-label={`حذف ${article.translations.ar?.title || article.slug}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        articles && (
          <Empty
            text={
              query || status !== "all"
                ? "لا توجد مقالات تطابق البحث والفلاتر."
                : "لا توجد مقالات بعد. أضف مقالاً واحفظه كمسودة للبدء."
            }
          />
        )
      )}
      <Confirm
        open={!!deleting}
        title="حذف المقال نهائياً؟"
        text={`سيُحذف المقال بكل ترجماته: ${deleting?.translations.ar?.title || deleting?.slug || ""}. يمكنك إخفاؤه بدلاً من حذفه.`}
        loading={busy !== null}
        onConfirm={remove}
        onClose={() => {
          if (busy === null) setDeleting(null);
        }}
      />
    </div>
  );
}
