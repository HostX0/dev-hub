"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Spinner } from "@/components/admin/ui";
import type { AdminArticle } from "@/lib/articles";
import { clientApi } from "@/lib/client-api";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<{
    id: string;
    article?: AdminArticle;
    error?: string;
  } | null>(null);
  useEffect(() => {
    let active = true;
    clientApi<AdminArticle>(`/articles/admin/${encodeURIComponent(id)}`)
      .then((article) => {
        if (active) setResult({ id, article });
      })
      .catch((err: Error) => {
        if (active) setResult({ id, error: err.message });
      });
    return () => {
      active = false;
    };
  }, [id]);
  if (!result || result.id !== id)
    return (
      <div
        className="grid h-64 place-items-center"
        role="status"
        aria-label="جارٍ تحميل المقال"
      >
        <Spinner />
      </div>
    );
  if (result.error || !result.article)
    return (
      <div
        role="alert"
        className="space-y-4 rounded-xl border border-danger/30 p-6"
      >
        <h1 className="text-lg font-bold">تعذر فتح المقال</h1>
        <p className="text-sm text-muted">{result.error}</p>
        <Link
          href="/admin/articles"
          className="inline-block text-brand-2 underline"
        >
          العودة للمقالات
        </Link>
      </div>
    );
  const article = result.article;
  return <ArticleForm key={article.id} initial={article} />;
}
