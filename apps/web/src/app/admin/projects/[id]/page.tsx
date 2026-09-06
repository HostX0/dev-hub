"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clientApi } from "@/lib/client-api";
import type { Project } from "@/lib/types";
import { PageHeader, Spinner } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<{
    id: string;
    project?: Project;
    error?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    clientApi<Project>(`/projects/admin/${encodeURIComponent(id)}`)
      .then((project) => {
        if (active) setResult({ id, project });
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
        aria-label="جارٍ تحميل المشروع"
      >
        <Spinner />
      </div>
    );
  if (result.error || !result.project)
    return (
      <div
        role="alert"
        className="space-y-4 rounded-xl border border-danger/30 p-6"
      >
        <h1 className="text-lg font-bold">تعذر فتح المشروع</h1>
        <p className="text-sm text-muted">{result.error}</p>
        <Link
          href="/admin/projects"
          className="inline-block text-brand-2 underline"
        >
          العودة للمشاريع
        </Link>
      </div>
    );
  const project = result.project;

  return (
    <div>
      <PageHeader title="تعديل المشروع" description={project.title} />
      <ProjectForm key={project.id} initial={project} />
    </div>
  );
}
