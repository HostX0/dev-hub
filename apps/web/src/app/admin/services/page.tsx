"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Service } from "@/lib/types";
import { ICON_NAMES, ServiceIcon } from "@/components/ui/Icon";
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
  Textarea,
  Toggle,
  useToast,
} from "@/components/admin/ui";

type Draft = Pick<
  Service,
  | "title"
  | "titleEn"
  | "titleCkb"
  | "description"
  | "descriptionEn"
  | "descriptionCkb"
  | "features"
  | "featuresEn"
  | "featuresCkb"
  | "icon"
  | "sortOrder"
  | "published"
>;
const EMPTY: Draft = {
  title: "",
  titleEn: "",
  titleCkb: "",
  description: "",
  descriptionEn: "",
  descriptionCkb: "",
  icon: "Code2",
  features: [],
  featuresEn: [],
  featuresCkb: [],
  sortOrder: 0,
  published: false,
};
const languages = [
  {
    lang: "ar",
    label: "العربية",
    dir: "rtl",
    title: "title",
    description: "description",
    features: "features",
  },
  {
    lang: "en",
    label: "الإنجليزية",
    dir: "ltr",
    title: "titleEn",
    description: "descriptionEn",
    features: "featuresEn",
  },
  {
    lang: "ckb",
    label: "الكوردية (سوراني)",
    dir: "rtl",
    title: "titleCkb",
    description: "descriptionCkb",
    features: "featuresCkb",
  },
] as const;
function toDraft(s: Service): Draft {
  return {
    title: s.title,
    titleEn: s.titleEn ?? "",
    titleCkb: s.titleCkb ?? "",
    description: s.description,
    descriptionEn: s.descriptionEn ?? "",
    descriptionCkb: s.descriptionCkb ?? "",
    features: s.features ?? [],
    featuresEn: s.featuresEn ?? [],
    featuresCkb: s.featuresCkb ?? [],
    icon: s.icon,
    sortOrder: s.sortOrder,
    published: s.published ?? true,
  };
}
const buttonCls =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line px-3 text-sm text-muted hover:border-brand/50 hover:text-fg disabled:opacity-50";

export default function AdminServices() {
  const { can } = useAdmin();
  const writable = can("services:write");
  const [list, setList] = useState<Service[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<{ id?: number; draft: Draft } | null>(
    null,
  );
  const [del, setDel] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const editor = useRef<HTMLFormElement>(null);
  const toast = useToast();
  useEffect(() => {
    let active = true;
    clientApi<Service[]>("/services/admin/all")
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
      setList(await clientApi<Service[]>("/services/admin/all"));
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  function start(service?: Service) {
    setEditing(
      service
        ? { id: service.id, draft: toDraft(service) }
        : { draft: { ...EMPTY, sortOrder: (list?.length ?? 0) + 1 } },
    );
    requestAnimationFrame(() => {
      editor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      editor.current
        ?.querySelector<HTMLInputElement>("input")
        ?.focus({ preventScroll: true });
    });
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!editing || !writable || busy) return;
    const d = editing.draft;
    const payload: Draft = {
      ...d,
      title: d.title.trim(),
      titleEn: d.titleEn.trim(),
      titleCkb: d.titleCkb?.trim(),
      description: d.description.trim(),
      descriptionEn: d.descriptionEn.trim(),
      descriptionCkb: d.descriptionCkb?.trim(),
      features: d.features.map((v) => v.trim()).filter(Boolean),
      featuresEn: d.featuresEn.map((v) => v.trim()).filter(Boolean),
      featuresCkb: d.featuresCkb?.map((v) => v.trim()).filter(Boolean),
      sortOrder: Number(d.sortOrder) || 0,
    };
    setBusy(true);
    try {
      await clientApi(editing.id ? `/services/${editing.id}` : "/services", {
        method: editing.id ? "PUT" : "POST",
        json: payload,
      });
      toast(
        "success",
        payload.published ? "تم حفظ الخدمة المنشورة" : "تم حفظ مسودة الخدمة",
      );
      setEditing(null);
      await load();
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!del || !writable || busy) return;
    setBusy(true);
    try {
      await clientApi(`/services/${del.id}`, { method: "DELETE" });
      if (editing?.id === del.id) setEditing(null);
      setList((all) => all?.filter((s) => s.id !== del.id) ?? []);
      setDel(null);
      toast("success", "تم حذف الخدمة");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function visibility(service: Service) {
    if (!writable || busy) return;
    setBusy(true);
    try {
      await clientApi(`/services/${service.id}/visibility`, {
        method: "PATCH",
        json: { published: !service.published },
      });
      if (editing?.id === service.id)
        setEditing((e) =>
          e
            ? { ...e, draft: { ...e.draft, published: !service.published } }
            : e,
        );
      await load();
      toast("success", service.published ? "تم إخفاء الخدمة" : "تم نشر الخدمة");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const d = editing?.draft;
  const setD = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setEditing((e) => (e ? { ...e, draft: { ...e.draft, [key]: value } } : e));
  const filtered = list?.filter((s) =>
    [s.title, s.titleEn, s.titleCkb]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <div lang="ar" dir="rtl">
      <PageHeader
        title="الخدمات"
        description="أضف الخدمات وترجماتها، وحدد ترتيبها وظهورها على الموقع."
        actions={
          writable && (
            <button
              type="button"
              disabled={busy}
              onClick={() => start()}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white"
            >
              <Plus className="size-4" /> خدمة جديدة
            </button>
          )
        }
      />
      {editing && d && (
        <form ref={editor} onSubmit={save} className="mb-6 scroll-mt-24">
          <Card className="space-y-5 border-brand/40">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold">
                {editing.id
                  ? writable
                    ? "تعديل الخدمة"
                    : "قراءة الخدمة"
                  : "خدمة جديدة"}
              </h2>
              <button
                type="button"
                className={buttonCls}
                aria-label="إغلاق محرر الخدمة"
                disabled={busy}
                onClick={() => setEditing(null)}
              >
                <X className="size-4" />
              </button>
            </div>
            {!writable && (
              <p role="status" className="text-sm text-muted">
                صلاحيتك تسمح بالقراءة فقط.
              </p>
            )}
            <fieldset disabled={busy || !writable} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="الأيقونة">
                  <div className="flex items-center gap-2">
                    <ServiceIcon
                      name={d.icon}
                      className="size-6 shrink-0 text-brand-2"
                    />
                    <Select
                      lang="en"
                      dir="ltr"
                      value={d.icon}
                      onChange={(e) => setD("icon", e.target.value)}
                    >
                      {ICON_NAMES.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </Field>
                <Field label="ترتيب العرض">
                  <Input
                    lang="en"
                    dir="ltr"
                    type="number"
                    min={0}
                    max={1000000}
                    step={1}
                    value={d.sortOrder}
                    onChange={(e) => setD("sortOrder", Number(e.target.value))}
                  />
                </Field>
              </div>
              {languages.map((l) => (
                <section
                  key={l.lang}
                  className="space-y-4 rounded-xl border border-line p-4"
                >
                  <h3 className="font-bold">المحتوى — {l.label}</h3>
                  <Field label={`عنوان الخدمة — ${l.label}`}>
                    <Input
                      lang={l.lang}
                      dir={l.dir}
                      required={l.lang === "ar"}
                      value={d[l.title] ?? ""}
                      onChange={(e) => setD(l.title, e.target.value)}
                    />
                  </Field>
                  <Field label={`الوصف — ${l.label}`}>
                    <Textarea
                      lang={l.lang}
                      dir={l.dir}
                      rows={4}
                      value={d[l.description] ?? ""}
                      onChange={(e) => setD(l.description, e.target.value)}
                    />
                  </Field>
                  <Field
                    label={`المميزات — ${l.label}`}
                    hint="اكتب كل ميزة في سطر مستقل."
                  >
                    <Textarea
                      lang={l.lang}
                      dir={l.dir}
                      rows={4}
                      value={(d[l.features] ?? []).join("\n")}
                      onChange={(e) =>
                        setD(l.features, e.target.value.split("\n"))
                      }
                    />
                  </Field>
                </section>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Toggle
                  checked={d.published}
                  onChange={(published) => setD("published", published)}
                  label="منشورة على الموقع"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 font-semibold text-white"
                  disabled={busy}
                >
                  {busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  حفظ الخدمة
                </button>
              </div>
            </fieldset>
          </Card>
        </form>
      )}
      <Card className="mb-5">
        <Field label="البحث في الخدمات">
          <Input
            lang="ar"
            dir="auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بعنوان الخدمة في أي لغة"
          />
        </Field>
      </Card>
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-danger/40 p-4 text-sm text-danger"
        >
          تعذر تحميل الخدمات: {error}
          <button type="button" className="ms-3 underline" onClick={load}>
            إعادة المحاولة
          </button>
        </div>
      )}
      {!list && !error ? (
        <div
          className="grid h-48 place-items-center"
          role="status"
          aria-label="جارٍ تحميل الخدمات"
        >
          <Spinner />
        </div>
      ) : filtered?.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((service) => (
            <Card key={service.id} className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <ServiceIcon
                  name={service.icon}
                  className="mt-1 size-6 shrink-0 text-brand-2"
                />
                <div className="min-w-0">
                  <h3 className="break-words font-bold">{service.title}</h3>
                  <p lang="en" dir="ltr" className="mt-1 text-xs text-muted">
                    {service.titleEn}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
                <span
                  className={`text-xs ${service.published ? "text-success" : "text-muted"}`}
                >
                  {service.published ? "منشورة" : "مسودة"} · الترتيب{" "}
                  {service.sortOrder}
                </span>
                {!writable && (
                  <button
                    type="button"
                    className={buttonCls}
                    onClick={() => start(service)}
                    aria-label={`قراءة ${service.title}`}
                  >
                    <Eye className="size-4" />
                    قراءة الترجمات
                  </button>
                )}
                {writable && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      className={buttonCls}
                      onClick={() => start(service)}
                      aria-label={`تعديل ${service.title}`}
                    >
                      <Pencil className="size-4" />
                      تعديل
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      className={buttonCls}
                      onClick={() => visibility(service)}
                    >
                      {service.published ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                      {service.published ? "إخفاء" : "نشر"}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      className={buttonCls}
                      onClick={() => setDel(service)}
                      aria-label={`حذف ${service.title}`}
                    >
                      <Trash2 className="size-4 text-danger" />
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        list && (
          <Empty
            text={
              query
                ? "لا توجد خدمات تطابق البحث."
                : "لا توجد خدمات بعد. أضف أول خدمة واحفظها كمسودة."
            }
          />
        )
      )}
      <Confirm
        open={!!del}
        title="حذف الخدمة نهائياً؟"
        text={
          del
            ? `سيتم حذف «${del.title}» بكل ترجماتها. يمكنك إخفاؤها بدلاً من حذفها.`
            : ""
        }
        onConfirm={remove}
        onClose={() => {
          if (!busy) setDel(null);
        }}
        loading={busy}
      />
    </div>
  );
}
