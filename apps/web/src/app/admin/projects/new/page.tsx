"use client";

import { PageHeader } from "@/components/admin/ui";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader title="مشروع جديد" description="أضف مشروعاً إلى معرض الأعمال." />
      <ProjectForm />
    </div>
  );
}
