"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { clientApi } from "@/lib/client-api";
import type { Project } from "@/lib/types";
import { Empty, PageHeader, Spinner } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    clientApi<Project>(`/projects/admin/${id}`).then(setProject).catch(() => setProject(null));
  }, [id]);

  if (project === undefined) return <div className="grid h-64 place-items-center"><Spinner /></div>;
  if (project === null) return <Empty text="المشروع غير موجود" />;

  return (
    <div>
      <PageHeader title="تعديل المشروع" description={project.title} />
      <ProjectForm key={project.id} initial={project} />
    </div>
  );
}
