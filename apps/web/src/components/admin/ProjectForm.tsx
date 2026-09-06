"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Project } from "@/lib/types";
import { CATEGORIES, CATEGORY_KEYS } from "@/lib/utils";
import {
  Card,
  Field,
  GalleryUploader,
  ImageUploader,
  Input,
  Select,
  TagsInput,
  Textarea,
  Toggle,
  useToast,
} from "./ui";

type FormState = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "sortOrder"
> & { sortOrder: number };

const EMPTY: FormState = {
  slug: "",
  title: "",
  titleCkb: "",
  titleEn: "",
  tagline: "",
  taglineCkb: "",
  taglineEn: "",
  description: "",
  descriptionCkb: "",
  descriptionEn: "",
  category: "website",
  tags: [],
  liveUrl: "",
  repoUrl: "",
  coverImage: "",
  gallery: [],
  featured: false,
  published: true,
  year: new Date().getFullYear(),
  client: "",
  clientCkb: "",
  sortOrder: 0,
};

export function ProjectForm({ initial }: { initial?: Project }) {
  const router = useRouter();
  const toast = useToast();
  const [f, setF] = useState<FormState>(() => {
    if (!initial) return EMPTY;
    // Older rows may come back with null English fields; keep inputs controlled.
    return {
      ...EMPTY,
      ...initial,
      titleEn: initial.titleEn ?? "",
      taglineEn: initial.taglineEn ?? "",
      descriptionEn: initial.descriptionEn ?? "",
    };
  });
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...f,
        titleEn: f.titleEn.trim(),
        titleCkb: (f.titleCkb ?? "").trim(),
        taglineEn: f.taglineEn.trim(),
        taglineCkb: (f.taglineCkb ?? "").trim(),
        descriptionEn: f.descriptionEn.trim(),
        descriptionCkb: (f.descriptionCkb ?? "").trim(),
        year: f.year ? Number(f.year) : null,
        sortOrder: Number(f.sortOrder) || 0,
        slug: f.slug || undefined,
      };
      if (initial) {
        await clientApi(`/projects/${initial.id}`, {
          method: "PUT",
          json: payload,
        });
        toast("success", "تم حفظ التعديلات");
      } else {
        const created = await clientApi<Project>("/projects", {
          method: "POST",
          json: payload,
        });
        toast("success", "تم إنشاء المشروع");
        router.replace(`/admin/projects/${created.id}`);
      }
      router.refresh();
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Card className="space-y-4">
          <h2 className="font-bold">المحتوى العربي</h2>
          <Field label="عنوان المشروع">
            <Input
              value={f.title}
              onChange={(e) => set("title", e.target.value)}
              required
            />
          </Field>
          <Field label="وصف قصير">
            <Input
              value={f.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="سطر واحد يلخص المشروع"
            />
          </Field>
          <Field label="الوصف الكامل">
            <Textarea
              value={f.description}
              onChange={(e) => set("description", e.target.value)}
              rows={8}
            />
          </Field>
          <Field
            label="التقنيات المستخدمة"
            hint="اضغط Enter أو فاصلة لإضافة تقنية"
          >
            <TagsInput
              value={f.tags}
              onChange={(v) => set("tags", v)}
              placeholder="Next.js, NestJS, PostgreSQL..."
            />
          </Field>
        </Card>

        <Card className="space-y-4 border-brand/25">
          <div>
            <h2 className="font-bold">
              المحتوى الإنجليزي{" "}
              <span className="font-display text-muted">/ English content</span>
            </h2>
            <p className="mt-1 text-xs text-muted-2">
              يُعرض في النسخة الإنجليزية من الموقع. إن تُرك فارغاً يظهر المحتوى
              العربي.
            </p>
          </div>
          <Field lang="en" label="Title">
            <Input
              value={f.titleEn}
              onChange={(e) => set("titleEn", e.target.value)}
              dir="ltr"
              placeholder="Project title"
            />
          </Field>
          <Field lang="en" label="Tagline">
            <Input
              value={f.taglineEn}
              onChange={(e) => set("taglineEn", e.target.value)}
              dir="ltr"
              placeholder="One line that sums up the project"
            />
          </Field>
          <Field lang="en" label="Description">
            <Textarea
              value={f.descriptionEn}
              onChange={(e) => set("descriptionEn", e.target.value)}
              rows={8}
              dir="ltr"
            />
          </Field>
        </Card>

        <Card className="space-y-4 border-brand/25">
          <h2 className="font-bold">
            المحتوى الكوردي / <span lang="ckb">کوردی</span>
          </h2>
          <p className="text-xs text-muted-2">
            ترجمة سورانية. يُستخدم النص العربي عند ترك الترجمة فارغة.
          </p>
          <Field lang="ckb" label="ناونیشانی پڕۆژە">
            <Input
              lang="ckb"
              dir="rtl"
              value={f.titleCkb ?? ""}
              onChange={(e) => set("titleCkb", e.target.value)}
            />
          </Field>
          <Field lang="ckb" label="وەسفی کورت">
            <Input
              lang="ckb"
              dir="rtl"
              value={f.taglineCkb ?? ""}
              onChange={(e) => set("taglineCkb", e.target.value)}
            />
          </Field>
          <Field lang="ckb" label="وەسفی تەواو">
            <Textarea
              lang="ckb"
              dir="rtl"
              value={f.descriptionCkb ?? ""}
              onChange={(e) => set("descriptionCkb", e.target.value)}
              rows={8}
            />
          </Field>
          <Field lang="ckb" label="کڕیار">
            <Input
              lang="ckb"
              dir="rtl"
              value={f.clientCkb ?? ""}
              onChange={(e) => set("clientCkb", e.target.value)}
            />
          </Field>
        </Card>
        <Card className="space-y-4">
          <ImageUploader
            label="صورة الغلاف (لقطة الشاشة الرئيسية)"
            value={f.coverImage}
            onChange={(v) => set("coverImage", v)}
          />
          <GalleryUploader
            value={f.gallery}
            onChange={(v) => set("gallery", v)}
          />
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="space-y-4">
          <Toggle
            checked={f.published}
            onChange={(v) => set("published", v)}
            label="منشور على الموقع"
          />
          <Toggle
            checked={f.featured}
            onChange={(v) => set("featured", v)}
            label="مشروع مميز (يظهر في الرئيسية)"
          />
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-fg font-semibold text-bg hover:bg-white disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {initial ? "حفظ التعديلات" : "إنشاء المشروع"}
          </button>
        </Card>

        <Card className="space-y-4">
          <Field label="التصنيف">
            <Select
              value={f.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {CATEGORY_KEYS.map((k) => (
                <option key={k} value={k}>
                  {CATEGORIES[k].ar}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="رابط المعاينة المباشرة (Live Demo)">
            <Input
              value={f.liveUrl}
              onChange={(e) => set("liveUrl", e.target.value)}
              placeholder="https://"
              dir="ltr"
            />
          </Field>
          <Field label="رابط الكود المصدري">
            <Input
              value={f.repoUrl}
              onChange={(e) => set("repoUrl", e.target.value)}
              placeholder="https://github.com/..."
              dir="ltr"
            />
          </Field>
          <Field label="العميل">
            <Input
              value={f.client}
              onChange={(e) => set("client", e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="السنة">
              <Input
                type="number"
                value={f.year ?? ""}
                onChange={(e) =>
                  set("year", e.target.value ? Number(e.target.value) : null)
                }
                dir="ltr"
              />
            </Field>
            <Field label="الترتيب">
              <Input
                type="number"
                value={f.sortOrder}
                onChange={(e) => set("sortOrder", Number(e.target.value))}
                dir="ltr"
              />
            </Field>
          </div>
          <Field
            label="الرابط (slug)"
            hint="يُولَّد تلقائياً من العنوان إن تُرك فارغاً"
          >
            <Input
              value={f.slug}
              onChange={(e) => set("slug", e.target.value)}
              dir="ltr"
              placeholder="my-project"
            />
          </Field>
        </Card>
      </div>
    </form>
  );
}
