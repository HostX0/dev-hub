"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import type { AdminArticle, Article, ArticleContent } from "@/lib/articles";
import type { Locale } from "@/i18n/config";
import { clientApi } from "@/lib/client-api";
import { useAdmin } from "./AdminSession";
import {
  Card,
  Field,
  Input,
  PageHeader,
  Select,
  Textarea,
  Toggle,
  useToast,
} from "./ui";

const LANGUAGES: { value: Locale; label: string; dir: "rtl" | "ltr" }[] = [
  { value: "ar", label: "العربية", dir: "rtl" },
  { value: "en", label: "الإنجليزية", dir: "ltr" },
  { value: "ckb", label: "الكوردية (سوراني)", dir: "rtl" },
];
type Draft = Article & { published: boolean; sortOrder: number };
const actionCls =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm text-muted hover:border-brand/50 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40";
const emptyContent = (): ArticleContent => ({
  title: "",
  description: "",
  excerpt: "",
  takeaways: ["", "", ""],
  sections: [],
  conclusion: "",
});
const cleanLines = (items: string[]) =>
  items.map((v) => v.trim()).filter(Boolean);
function safeUrl(value: string) {
  try {
    const u = new URL(value);
    return (
      ["https:", "http:"].includes(u.protocol) && !u.username && !u.password
    );
  } catch {
    return false;
  }
}

function TextList({
  label,
  value,
  onChange,
  locale,
  multiline = false,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  locale: Locale;
  multiline?: boolean;
}) {
  const dir = locale === "en" ? "ltr" : "rtl";
  const move = (index: number, delta: number) => {
    const next = [...value];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  };
  return (
    <fieldset className="space-y-3">
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      {value.map((text, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {multiline ? (
              <Textarea
                lang={locale}
                dir={dir}
                aria-label={`${label} ${i + 1}`}
                value={text}
                rows={4}
                onChange={(e) =>
                  onChange(value.map((v, j) => (j === i ? e.target.value : v)))
                }
              />
            ) : (
              <Input
                lang={locale}
                dir={dir}
                aria-label={`${label} ${i + 1}`}
                value={text}
                onChange={(e) =>
                  onChange(value.map((v, j) => (j === i ? e.target.value : v)))
                }
              />
            )}
          </div>
          <div className="flex flex-col gap-1 sm:flex-row">
            <button
              type="button"
              className={actionCls}
              aria-label={`تحريك ${label} ${i + 1} للأعلى`}
              disabled={i === 0}
              onClick={() => move(i, -1)}
            >
              <ArrowUp className="size-4" />
            </button>
            <button
              type="button"
              className={actionCls}
              aria-label={`تحريك ${label} ${i + 1} للأسفل`}
              disabled={i === value.length - 1}
              onClick={() => move(i, 1)}
            >
              <ArrowDown className="size-4" />
            </button>
            <button
              type="button"
              className={actionCls}
              aria-label={`حذف ${label} ${i + 1}`}
              onClick={() => onChange(value.filter((_, j) => i !== j))}
            >
              <Trash2 className="size-4 text-danger" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className={actionCls}
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="size-4" /> إضافة {multiline ? "فقرة" : "عنصر"}
      </button>
    </fieldset>
  );
}

export function ArticleForm({ initial }: { initial?: AdminArticle }) {
  const router = useRouter();
  const toast = useToast();
  const { can } = useAdmin();
  const writable = can("articles:write");
  const [locale, setLocale] = useState<Locale>("ar");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedArticle, setSavedArticle] = useState(initial);
  const [draft, setDraft] = useState<Draft>(() =>
    initial
      ? {
          slug: initial.slug,
          category: initial.category,
          publishedAt: initial.publishedAt.slice(0, 10),
          published: initial.published,
          sortOrder: initial.sortOrder ?? 0,
          sources: initial.sources ?? [],
          translations: Object.fromEntries(
            LANGUAGES.map(({ value }) => [
              value,
              { ...emptyContent(), ...initial.translations[value] },
            ]),
          ) as Record<Locale, ArticleContent>,
        }
      : {
          slug: "",
          category: "product",
          publishedAt: new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Baghdad",
          }).format(new Date()),
          published: false,
          sortOrder: 0,
          sources: [],
          translations: {
            en: emptyContent(),
            ar: emptyContent(),
            ckb: emptyContent(),
          },
        },
  );
  const content = draft.translations[locale];
  const dir = locale === "en" ? "ltr" : "rtl";
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));
  const updateContent = (patch: Partial<ArticleContent>) =>
    setDraft((d) => ({
      ...d,
      translations: {
        ...d.translations,
        [locale]: { ...d.translations[locale], ...patch },
      },
    }));
  const updateSection = (
    index: number,
    patch: Partial<ArticleContent["sections"][number]>,
  ) =>
    updateContent({
      sections: content.sections.map((s, i) =>
        i === index ? { ...s, ...patch } : s,
      ),
    });
  const moveSection = (index: number, delta: number) => {
    const next = [...content.sections];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    updateContent({ sections: next });
  };

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!writable || saving) return;
    setError("");
    const payload: Draft = {
      ...draft,
      slug: draft.slug.trim(),
      sortOrder: Number(draft.sortOrder) || 0,
      sources: draft.sources.map((s) => ({
        id: s.id.trim(),
        title: s.title.trim(),
        url: s.url.trim(),
      })),
      translations: Object.fromEntries(
        LANGUAGES.map(({ value }) => {
          const c = draft.translations[value];
          return [
            value,
            {
              title: c.title.trim(),
              description: c.description.trim(),
              excerpt: c.excerpt.trim(),
              conclusion: c.conclusion.trim(),
              takeaways: cleanLines(c.takeaways),
              sections: c.sections.map((s) => ({
                id: s.id.trim(),
                heading: s.heading.trim(),
                paragraphs: cleanLines(s.paragraphs),
                bullets: cleanLines(s.bullets ?? []),
                sourceIds: s.sourceIds ?? [],
              })),
            },
          ];
        }),
      ) as Record<Locale, ArticleContent>,
    };
    const fail = (message: string) => {
      setError(message);
      toast("error", message);
    };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug))
      return fail(
        "اكتب رابطاً بحروف إنجليزية صغيرة وأرقام وشرطات، مثل product-discovery.",
      );
    if (payload.sources.some((s) => !s.id || !s.title || !safeUrl(s.url)))
      return fail("لكل مصدر معرّف وعنوان ورابط يبدأ بـ https:// أو http://.");
    if (
      new Set(payload.sources.map((s) => s.id)).size !== payload.sources.length
    )
      return fail("معرّفات المصادر يجب أن تكون مختلفة.");
    for (const language of LANGUAGES) {
      const c = payload.translations[language.value];
      if (
        c.sections.some((s) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.id)) ||
        new Set(c.sections.map((s) => s.id)).size !== c.sections.length
      ) {
        setLocale(language.value);
        return fail(
          `راجع معرّفات الأقسام في ${language.label}: استخدم حروفاً إنجليزية وأرقاماً وشرطات، دون تكرار.`,
        );
      }
      if (
        c.sections.some((s) =>
          s.sourceIds?.some(
            (id) => !payload.sources.some((source) => source.id === id),
          ),
        )
      ) {
        setLocale(language.value);
        return fail(`يوجد مرجع إلى مصدر غير موجود في ${language.label}.`);
      }
      if (
        payload.published &&
        (!c.title ||
          !c.description ||
          !c.excerpt ||
          !c.conclusion ||
          !c.takeaways.length ||
          !c.sections.length ||
          c.sections.some((s) => !s.heading || !s.paragraphs.length))
      ) {
        setLocale(language.value);
        return fail(
          `أكمل عنوان ووصف ومقدمة وخلاصة ونقاط وأقسام ${language.label} قبل النشر، أو احفظ المقال كمسودة.`,
        );
      }
    }
    setSaving(true);
    try {
      const saved = await clientApi<AdminArticle>(
        initial ? `/articles/${initial.id}` : "/articles",
        { method: initial ? "PUT" : "POST", json: payload },
      );
      toast(
        "success",
        payload.published ? "تم حفظ المقال المنشور" : "تم حفظ المسودة",
      );
      setDraft(payload);
      setSavedArticle(saved);
      if (!initial) router.replace(`/admin/articles/${saved.id}`);
      router.refresh();
    } catch (err) {
      fail((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6" lang="ar" dir="rtl">
      <PageHeader
        title={initial ? "تعديل المقال" : "مقال جديد"}
        description="محتوى منظم بثلاث لغات. احفظ العمل كمسودة ثم انشره عندما تكتمل الترجمات."
        actions={
          <Link href="/admin/articles" className={actionCls}>
            العودة للمقالات
          </Link>
        }
      />
      {!writable && (
        <p
          className="rounded-xl border border-line p-4 text-sm text-muted"
          role="status"
        >
          صلاحيتك تسمح بالقراءة فقط.
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
        >
          {error}
        </p>
      )}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="لغة المقال"
      >
        {LANGUAGES.map((l) => (
          <button
            key={l.value}
            type="button"
            aria-pressed={locale === l.value}
            onClick={() => setLocale(l.value)}
            className={`${actionCls} ${locale === l.value ? "border-brand bg-brand/15 text-brand-2" : ""}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <fieldset
        disabled={!writable || saving}
        className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
      >
        <div className="min-w-0 space-y-6">
          <Card className="space-y-5">
            <p className="text-xs text-muted">
              تغيير اللغة يحفظ ما كتبته داخل النموذج. استخدم زر الحفظ لإرسال
              جميع الترجمات.
            </p>
            <Field
              label={`عنوان المقال — ${LANGUAGES.find((l) => l.value === locale)?.label}`}
            >
              <Input
                lang={locale}
                dir={dir}
                value={content.title}
                onChange={(e) => updateContent({ title: e.target.value })}
              />
            </Field>
            <Field
              label="وصف نتائج البحث"
              hint="وصف مختصر ودقيق لمحتوى المقال."
            >
              <Textarea
                lang={locale}
                dir={dir}
                rows={2}
                value={content.description}
                onChange={(e) => updateContent({ description: e.target.value })}
              />
            </Field>
            <Field
              label="المقدمة المختصرة"
              hint="تظهر في قائمة المقالات وبداية المقال."
            >
              <Textarea
                lang={locale}
                dir={dir}
                rows={3}
                value={content.excerpt}
                onChange={(e) => updateContent({ excerpt: e.target.value })}
              />
            </Field>
            <TextList
              label="النقاط الرئيسية"
              locale={locale}
              value={content.takeaways}
              onChange={(takeaways) => updateContent({ takeaways })}
            />
          </Card>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold">أقسام المقال</h2>
              <button
                type="button"
                className={actionCls}
                onClick={() => {
                  let n = content.sections.length + 1;
                  while (content.sections.some((s) => s.id === `section-${n}`))
                    n++;
                  updateContent({
                    sections: [
                      ...content.sections,
                      {
                        id: `section-${n}`,
                        heading: "",
                        paragraphs: [""],
                        bullets: [],
                        sourceIds: [],
                      },
                    ],
                  });
                }}
              >
                <Plus className="size-4" /> إضافة قسم
              </button>
            </div>
            {!content.sections.length && (
              <p className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
                لا توجد أقسام بهذه اللغة بعد. أضف أول قسم للبدء.
              </p>
            )}
            {content.sections.map((section, index) => (
              <Card key={index} className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-bold">القسم {index + 1}</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className={actionCls}
                      disabled={index === 0}
                      aria-label={`تحريك القسم ${index + 1} للأعلى`}
                      onClick={() => moveSection(index, -1)}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={actionCls}
                      disabled={index === content.sections.length - 1}
                      aria-label={`تحريك القسم ${index + 1} للأسفل`}
                      onClick={() => moveSection(index, 1)}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={actionCls}
                      aria-label={`حذف القسم ${index + 1} من هذه الترجمة`}
                      onClick={() =>
                        updateContent({
                          sections: content.sections.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                    >
                      <Trash2 className="size-4 text-danger" />
                    </button>
                  </div>
                </div>
                <Field
                  label="معرّف القسم"
                  hint="يستخدم في رابط الفهرس. حافظ على نفس المعرّف للقسم المقابل في الترجمات."
                >
                  <Input
                    lang="en"
                    dir="ltr"
                    value={section.id}
                    onChange={(e) =>
                      updateSection(index, { id: e.target.value })
                    }
                  />
                </Field>
                <Field label="عنوان القسم">
                  <Input
                    lang={locale}
                    dir={dir}
                    value={section.heading}
                    onChange={(e) =>
                      updateSection(index, { heading: e.target.value })
                    }
                  />
                </Field>
                <TextList
                  label="الفقرات"
                  multiline
                  locale={locale}
                  value={section.paragraphs}
                  onChange={(paragraphs) =>
                    updateSection(index, { paragraphs })
                  }
                />
                <TextList
                  label="عناصر القائمة"
                  locale={locale}
                  value={section.bullets ?? []}
                  onChange={(bullets) => updateSection(index, { bullets })}
                />
                <fieldset className="space-y-2">
                  <legend className="mb-2 text-sm font-semibold">
                    مصادر هذا القسم
                  </legend>
                  {draft.sources.length ? (
                    draft.sources.map((source, i) => (
                      <label key={i} className="flex items-start gap-2 text-sm">
                        <input
                          className="mt-1 size-4 accent-brand"
                          type="checkbox"
                          checked={
                            section.sourceIds?.includes(source.id) ?? false
                          }
                          disabled={!source.id}
                          onChange={(e) =>
                            updateSection(index, {
                              sourceIds: e.target.checked
                                ? [...(section.sourceIds ?? []), source.id]
                                : section.sourceIds?.filter(
                                    (id) => id !== source.id,
                                  ),
                            })
                          }
                        />
                        <span className="break-words">
                          {source.title || `المصدر ${i + 1}`}{" "}
                          <span
                            lang="en"
                            dir="ltr"
                            className="text-xs text-muted"
                          >
                            ({source.id || "—"})
                          </span>
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-xs text-muted">
                      أضف المصادر أسفل النموذج، ثم اربط المصدر بالقسم الذي يستند
                      إليه.
                    </p>
                  )}
                </fieldset>
              </Card>
            ))}
          </div>
          <Card>
            <Field label="الخلاصة والخطوة التالية">
              <Textarea
                lang={locale}
                dir={dir}
                rows={5}
                value={content.conclusion}
                onChange={(e) => updateContent({ conclusion: e.target.value })}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">المصادر</h2>
                <p className="mt-1 text-xs text-muted">
                  مشتركة بين الترجمات. اربطها بالأقسام أعلاه.
                </p>
              </div>
              <button
                type="button"
                className={actionCls}
                onClick={() => {
                  let n = draft.sources.length + 1;
                  while (draft.sources.some((s) => s.id === `source-${n}`)) n++;
                  set("sources", [
                    ...draft.sources,
                    { id: `source-${n}`, title: "", url: "" },
                  ]);
                }}
              >
                <Plus className="size-4" /> إضافة
              </button>
            </div>
            {draft.sources.map((source, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border border-line p-4"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    className={actionCls}
                    aria-label={`حذف المصدر ${index + 1}`}
                    onClick={() =>
                      setDraft((d) => ({
                        ...d,
                        sources: d.sources.filter((_, i) => i !== index),
                        translations: Object.fromEntries(
                          LANGUAGES.map(({ value }) => [
                            value,
                            {
                              ...d.translations[value],
                              sections: d.translations[value].sections.map(
                                (s) => ({
                                  ...s,
                                  sourceIds: s.sourceIds?.filter(
                                    (id) => id !== source.id,
                                  ),
                                }),
                              ),
                            },
                          ]),
                        ) as Record<Locale, ArticleContent>,
                      }))
                    }
                  >
                    <Trash2 className="size-4 text-danger" />
                  </button>
                </div>
                <Field label="معرّف المصدر">
                  <Input
                    lang="en"
                    dir="ltr"
                    value={source.id}
                    onChange={(e) => {
                      const id = e.target.value;
                      setDraft((d) => ({
                        ...d,
                        sources: d.sources.map((s, i) =>
                          i === index ? { ...s, id } : s,
                        ),
                        translations: Object.fromEntries(
                          LANGUAGES.map(({ value }) => [
                            value,
                            {
                              ...d.translations[value],
                              sections: d.translations[value].sections.map(
                                (s) => ({
                                  ...s,
                                  sourceIds: s.sourceIds?.map((old) =>
                                    old === source.id ? id : old,
                                  ),
                                }),
                              ),
                            },
                          ]),
                        ) as Record<Locale, ArticleContent>,
                      }));
                    }}
                  />
                </Field>
                <Field label="عنوان المصدر">
                  <Input
                    lang={/[\u0600-\u06ff]/.test(source.title) ? "ar" : "en"}
                    dir="auto"
                    value={source.title}
                    onChange={(e) =>
                      set(
                        "sources",
                        draft.sources.map((s, i) =>
                          i === index ? { ...s, title: e.target.value } : s,
                        ),
                      )
                    }
                  />
                </Field>
                <Field label="رابط المصدر">
                  <Input
                    lang="en"
                    dir="ltr"
                    type="url"
                    placeholder="https://"
                    value={source.url}
                    onChange={(e) =>
                      set(
                        "sources",
                        draft.sources.map((s, i) =>
                          i === index ? { ...s, url: e.target.value } : s,
                        ),
                      )
                    }
                  />
                </Field>
              </div>
            ))}
          </Card>
        </div>
        <aside className="space-y-5">
          <Card className="space-y-4 xl:sticky xl:top-6">
            <h2 className="font-bold">النشر</h2>
            <Toggle
              checked={draft.published}
              onChange={(published) => set("published", published)}
              label="منشور على الموقع"
            />
            <p className="text-xs leading-relaxed text-muted">
              المسودة متاحة في لوحة الإدارة فقط. النشر يعرض المقال في اللغات
              الثلاث.
            </p>
            <Field label="رابط المقال" hint="مثال: product-discovery">
              <Input
                lang="en"
                dir="ltr"
                required
                value={draft.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </Field>
            <Field label="التصنيف">
              <Select
                value={draft.category}
                onChange={(e) =>
                  set("category", e.target.value as Article["category"])
                }
              >
                <option value="product">المنتج</option>
                <option value="engineering">الهندسة</option>
                <option value="growth">النمو</option>
              </Select>
            </Field>
            <Field label="تاريخ النشر">
              <Input
                lang="en"
                dir="ltr"
                type="date"
                required
                value={draft.publishedAt}
                onChange={(e) => set("publishedAt", e.target.value)}
              />
            </Field>
            <p className="text-xs text-muted">
              التاريخ هو تاريخ العرض، ولا يؤجل ظهور المقال عند تفعيل النشر.
            </p>
            <Field label="ترتيب العرض">
              <Input
                lang="en"
                dir="ltr"
                type="number"
                min={0}
                max={1000000}
                step={1}
                value={draft.sortOrder}
                onChange={(e) => set("sortOrder", Number(e.target.value))}
              />
            </Field>
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 font-semibold text-white disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "جارٍ الحفظ…" : "حفظ جميع الترجمات"}
            </button>
            {savedArticle?.published && (
              <Link
                href={`/${locale}/blog/${encodeURIComponent(savedArticle.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={actionCls}
              >
                <ExternalLink className="size-4" /> عرض النسخة المنشورة
              </Link>
            )}
          </Card>
        </aside>
      </fieldset>
    </form>
  );
}
