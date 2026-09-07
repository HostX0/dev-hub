"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  KeyRound,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { TeamEditor } from "@/components/admin/TeamEditor";
import { useAdmin } from "@/components/admin/AdminSession";
import { auth, clientApi } from "@/lib/client-api";
import {
  DEFAULT_SETTINGS,
  type SiteSettings,
  type SocialLink,
  type Stat,
  type Testimonial,
} from "@/lib/types";
import {
  Card,
  Field,
  Input,
  PageHeader,
  Select,
  Spinner,
  Textarea,
  Toggle,
  useToast,
} from "@/components/admin/ui";

const languages = [
  {
    lang: "ar",
    label: "العربية",
    dir: "rtl",
    heroTitle: "heroTitle",
    heroSubtitle: "heroSubtitle",
    bio: "bio",
    location: "location",
    clients: "clients",
    statLabel: "label",
    name: "name",
    role: "role",
    text: "text",
  },
  {
    lang: "en",
    label: "الإنجليزية",
    dir: "ltr",
    heroTitle: "heroTitleEn",
    heroSubtitle: "heroSubtitleEn",
    bio: "bioEn",
    location: "locationEn",
    clients: "clientsEn",
    statLabel: "labelEn",
    name: "nameEn",
    role: "roleEn",
    text: "textEn",
  },
  {
    lang: "ckb",
    label: "الكوردية (سوراني)",
    dir: "rtl",
    heroTitle: "heroTitleCkb",
    heroSubtitle: "heroSubtitleCkb",
    bio: "bioCkb",
    location: "locationCkb",
    clients: "clientsCkb",
    statLabel: "labelCkb",
    name: "nameCkb",
    role: "roleCkb",
    text: "textCkb",
  },
] as const;
const platforms: { value: SocialLink["platform"]; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "X / Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "custom", label: "رابط مخصص" },
];
const fallbackSocials: SocialLink[] = [
  {
    id: "company-linkedin",
    platform: "linkedin",
    label: "DevsHub.cc — LinkedIn",
    url: "https://www.linkedin.com/company/devshub-cc",
    enabled: true,
  },
  {
    id: "company-facebook",
    platform: "facebook",
    label: "DevsHub.cc — Facebook",
    url: "https://www.facebook.com/dev.point.iq",
    enabled: true,
  },
];
const buttonCls =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm text-muted hover:border-brand/50 hover:text-fg disabled:opacity-40";
const emptyStat: Stat = { value: "", label: "", labelEn: "", labelCkb: "" };
const emptyTestimonial: Testimonial = {
  name: "",
  nameEn: "",
  nameCkb: "",
  role: "",
  roleEn: "",
  roleCkb: "",
  text: "",
  textEn: "",
  textCkb: "",
};
function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
function normalize(data: Partial<SiteSettings>): SiteSettings {
  const socialLinks = Array.isArray(data.socialLinks)
    ? data.socialLinks
    : [
        ...fallbackSocials.map((link) => ({
          ...link,
          url:
            data.socials?.[link.platform as "linkedin" | "facebook"]?.trim() ||
            link.url,
        })),
        ...Object.entries(data.socials ?? {})
          .filter(
            ([key, url]) =>
              !["linkedin", "facebook"].includes(key) &&
              typeof url === "string" &&
              url.trim(),
          )
          .map(([platform, url]) => ({
            id: `legacy-${platform}`,
            platform: platform as SocialLink["platform"],
            label:
              platforms.find((p) => p.value === platform)?.label ?? platform,
            url: url ?? "",
            enabled: true,
          })),
      ];
  return {
    ...DEFAULT_SETTINGS,
    ...data,
    socials: { ...DEFAULT_SETTINGS.socials, ...data.socials },
    socialLinks,
    team: (Array.isArray(data.team)
      ? data.team
      : (DEFAULT_SETTINGS.team ?? [])
    ).map((member) => ({
      ...DEFAULT_SETTINGS.team?.find((d) => d.id === member.id),
      ...member,
      nameEn: member.nameEn ?? member.name,
    })),
    stats: (data.stats ?? []).map((stat) => ({ ...emptyStat, ...stat })),
    stack: data.stack ?? [],
    clients: data.clients ?? [],
    clientsEn: data.clientsEn ?? [],
    clientsCkb: data.clientsCkb ?? [],
    testimonials: (data.testimonials ?? []).map((testimonial) => ({
      ...emptyTestimonial,
      ...testimonial,
    })),
  };
}

export default function AdminSettings() {
  const router = useRouter();
  const { can } = useAdmin();
  const writable = can("settings:write");
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordBusy, setPasswordBusy] = useState(false);
  useEffect(() => {
    let active = true;
    clientApi<Partial<SiteSettings>>("/settings")
      .then((data) => {
        if (active) setSettings(normalize(data));
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
      setSettings(
        normalize(await clientApi<Partial<SiteSettings>>("/settings")),
      );
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSettings((s) => (s ? { ...s, [key]: value } : s));
  function updateSocial(index: number, patch: Partial<SocialLink>) {
    if (settings)
      set(
        "socialLinks",
        settings.socialLinks?.map((s, i) =>
          i === index ? { ...s, ...patch } : s,
        ) ?? [],
      );
  }
  function moveSocial(index: number, delta: number) {
    const next = [...(settings?.socialLinks ?? [])];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    set("socialLinks", next);
  }
  function modifyClients(action: "add" | "remove" | "up" | "down", index = 0) {
    setSettings((s) => {
      if (!s) return s;
      const next = { ...s };
      const length = Math.max(
        s.clients.length,
        s.clientsEn?.length ?? 0,
        s.clientsCkb?.length ?? 0,
      );
      for (const l of languages) {
        const values = Array.from(
          { length },
          (_, i) => s[l.clients]?.[i] ?? "",
        );
        if (action === "add") values.push("");
        if (action === "remove") values.splice(index, 1);
        if (action === "up" || action === "down") {
          const target = index + (action === "up" ? -1 : 1);
          [values[index], values[target]] = [values[target], values[index]];
        }
        next[l.clients] = values;
      }
      return next;
    });
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!settings || !writable || saving) return;
    const links = (settings.socialLinks ?? []).map((s) => ({
      ...s,
      label: s.label.trim(),
      url: s.url.trim(),
    }));
    if (
      links.some(
        (s) =>
          (s.enabled && (!s.label || !s.url)) || (s.url && !safeUrl(s.url)),
      )
    )
      return toast(
        "error",
        "راجع روابط التواصل: الروابط المفعّلة تحتاج اسماً ورابط http:// أو https:// صالحاً.",
      );
    if (
      settings.team?.some(
        (member) => member.github?.trim() && !safeUrl(member.github.trim()),
      )
    )
      return toast(
        "error",
        "راجع رابط GitHub لكل عضو. يجب أن يبدأ بـ https:// أو http:// دون بيانات دخول.",
      );
    const count = Math.max(
      settings.clients.length,
      settings.clientsEn?.length ?? 0,
      settings.clientsCkb?.length ?? 0,
    );
    const rows = Array.from({ length: count }, (_, i) =>
      languages.map((l) => settings[l.clients]?.[i]?.trim() ?? ""),
    ).filter((row) => row.some(Boolean));
    const payload: SiteSettings = {
      ...settings,
      socialLinks: links,
      team: settings.team?.map((m) => ({
        ...m,
        github: m.github?.trim(),
        name: m.nameEn?.trim() || m.name.trim(),
      })),
      stack: settings.stack.map((v) => v.trim()).filter(Boolean),
      clients: rows.map((r) => r[0]),
      clientsEn: rows.map((r) => r[1]),
      clientsCkb: rows.map((r) => r[2]),
    };
    setSaving(true);
    try {
      await clientApi("/settings", { method: "PUT", json: payload });
      setSettings(payload);
      toast("success", "تم حفظ إعدادات الموقع والترجمات");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setSaving(false);
    }
  }
  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    if (passwordBusy) return;
    if (password.next !== password.confirm)
      return toast("error", "كلمتا المرور غير متطابقتين");
    setPasswordBusy(true);
    try {
      await clientApi("/auth/change-password", {
        method: "POST",
        json: { current: password.current, next: password.next },
      });
      auth.clear();
      setPassword({ current: "", next: "", confirm: "" });
      toast("success", "تم تغيير كلمة المرور. سجّل الدخول بالكلمة الجديدة.");
      router.replace("/admin/login");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setPasswordBusy(false);
    }
  }
  if (error && !settings)
    return (
      <div
        role="alert"
        className="space-y-3 rounded-xl border border-danger/40 p-6"
      >
        <h1 className="text-lg font-bold">تعذر تحميل الإعدادات</h1>
        <p className="text-sm text-muted">{error}</p>
        <button type="button" onClick={reload} className={buttonCls}>
          إعادة المحاولة
        </button>
      </div>
    );
  if (!settings)
    return (
      <div
        className="grid h-64 place-items-center"
        role="status"
        aria-label="جارٍ تحميل الإعدادات"
      >
        <Spinner />
      </div>
    );
  const clientCount = Math.max(
    settings.clients.length,
    settings.clientsEn?.length ?? 0,
    settings.clientsCkb?.length ?? 0,
  );
  return (
    <div lang="ar" dir="rtl">
      <PageHeader
        title="إعدادات الموقع"
        description="المحتوى والترجمات والفريق وبيانات التواصل. احفظ جميع التغييرات من زر الحفظ."
      />
      {!writable && (
        <p
          role="status"
          className="mb-5 rounded-xl border border-line p-4 text-sm text-muted"
        >
          صلاحيتك تسمح بقراءة إعدادات الموقع فقط.
        </p>
      )}
      <form onSubmit={save} className="space-y-6">
        <fieldset disabled={!writable || saving} className="min-w-0 space-y-6">
          <Card className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              تُحفظ التعديلات في كل اللغات معاً.
            </p>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 font-semibold text-white disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "جارٍ الحفظ…" : "حفظ الإعدادات"}
            </button>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-bold">اسم العلامة</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الاسم العربي">
                <Input
                  lang="ar"
                  dir="rtl"
                  required
                  value={settings.siteNameAr}
                  onChange={(e) => set("siteNameAr", e.target.value)}
                />
              </Field>
              <Field label="الاسم الإنجليزي">
                <Input
                  lang="en"
                  dir="ltr"
                  required
                  value={settings.siteName}
                  onChange={(e) => set("siteName", e.target.value)}
                />
              </Field>
            </div>
          </Card>
          <div className="grid gap-5 2xl:grid-cols-3">
            {languages.map((l) => (
              <Card key={l.lang} className="space-y-4">
                <h2 className="font-bold">المحتوى — {l.label}</h2>
                <Field label={`عنوان الصفحة الرئيسية — ${l.label}`}>
                  <Input
                    lang={l.lang}
                    dir={l.dir}
                    value={settings[l.heroTitle] ?? ""}
                    onChange={(e) => set(l.heroTitle, e.target.value)}
                  />
                </Field>
                <Field label={`الوصف تحت العنوان — ${l.label}`}>
                  <Textarea
                    lang={l.lang}
                    dir={l.dir}
                    rows={4}
                    value={settings[l.heroSubtitle] ?? ""}
                    onChange={(e) => set(l.heroSubtitle, e.target.value)}
                  />
                </Field>
                <Field label={`نبذة عن الشركة — ${l.label}`}>
                  <Textarea
                    lang={l.lang}
                    dir={l.dir}
                    rows={6}
                    value={settings[l.bio] ?? ""}
                    onChange={(e) => set(l.bio, e.target.value)}
                  />
                </Field>
                <Field label={`العنوان الجغرافي — ${l.label}`}>
                  <Textarea
                    lang={l.lang}
                    dir={l.dir}
                    rows={3}
                    value={settings[l.location] ?? ""}
                    onChange={(e) => set(l.location, e.target.value)}
                  />
                </Field>
              </Card>
            ))}
          </div>
          <Card className="space-y-4">
            <h2 className="font-bold">التواصل المباشر</h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <Field label="البريد الإلكتروني">
                <Input
                  lang="en"
                  dir="ltr"
                  type="email"
                  value={settings.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="الهاتف">
                <Input
                  lang="en"
                  dir="ltr"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+964 770 854 0899"
                />
              </Field>
              <Field
                label="واتساب"
                hint="الرقم الدولي دون علامة +، ويُترك فارغاً لإخفائه."
              >
                <Input
                  lang="en"
                  dir="ltr"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={settings.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  placeholder="9647708540899"
                />
              </Field>
            </div>
          </Card>
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">روابط التواصل الاجتماعي</h2>
                <p className="mt-1 text-xs text-muted">
                  أضف أي منصة، وعدّل الاسم والرابط وترتيب الظهور. الروابط
                  المعطلة لا تظهر للزوار.
                </p>
              </div>
              <button
                type="button"
                className={buttonCls}
                onClick={() =>
                  set("socialLinks", [
                    ...(settings.socialLinks ?? []),
                    {
                      id: crypto.randomUUID(),
                      platform: "custom",
                      label: "",
                      url: "",
                      enabled: false,
                    },
                  ])
                }
              >
                <Plus className="size-4" />
                إضافة رابط
              </button>
            </div>
            {!settings.socialLinks?.length && (
              <p className="rounded-xl border border-dashed border-line p-6 text-sm text-muted">
                لا توجد روابط. أضف أول حساب للتواصل.
              </p>
            )}
            {settings.socialLinks?.map((social, index) => (
              <section
                key={social.id}
                className="space-y-4 rounded-xl border border-line p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold">الرابط {index + 1}</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className={buttonCls}
                      disabled={index === 0}
                      aria-label={`تحريك الرابط ${index + 1} للأعلى`}
                      onClick={() => moveSocial(index, -1)}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={buttonCls}
                      disabled={
                        index === (settings.socialLinks?.length ?? 0) - 1
                      }
                      aria-label={`تحريك الرابط ${index + 1} للأسفل`}
                      onClick={() => moveSocial(index, 1)}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={buttonCls}
                      aria-label={`حذف الرابط ${index + 1}`}
                      onClick={() =>
                        set(
                          "socialLinks",
                          settings.socialLinks?.filter((_, i) => i !== index) ??
                            [],
                        )
                      }
                    >
                      <Trash2 className="size-4 text-danger" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label={`المنصة — الرابط ${index + 1}`}>
                    <Select
                      value={social.platform}
                      onChange={(e) => {
                        const platform = e.target
                          .value as SocialLink["platform"];
                        updateSocial(index, {
                          platform,
                          ...(social.label
                            ? {}
                            : {
                                label:
                                  platforms.find((p) => p.value === platform)
                                    ?.label ?? "",
                              }),
                        });
                      }}
                    >
                      {platforms.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label={`الاسم الظاهر — الرابط ${index + 1}`}>
                    <Input
                      lang={/[\u0600-\u06ff]/.test(social.label) ? "ar" : "en"}
                      dir="auto"
                      value={social.label}
                      onChange={(e) =>
                        updateSocial(index, { label: e.target.value })
                      }
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label={`عنوان الرابط ${index + 1}`}>
                      <Input
                        lang="en"
                        dir="ltr"
                        type="url"
                        placeholder="https://"
                        value={social.url}
                        onChange={(e) =>
                          updateSocial(index, { url: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </div>
                <Toggle
                  checked={social.enabled}
                  onChange={(enabled) => updateSocial(index, { enabled })}
                  label={`إظهار الرابط ${index + 1} على الموقع`}
                />
              </section>
            ))}
          </Card>
          <TeamEditor
            value={settings.team ?? []}
            onChange={(team) => set("team", team)}
          />
          <Card className="space-y-4">
            <h2 className="font-bold">التقنيات المستخدمة</h2>
            <Field
              label="أسماء التقنيات في الشريط المتحرك"
              hint="كل تقنية في سطر مستقل."
            >
              <Textarea
                lang="en"
                dir="ltr"
                rows={5}
                value={settings.stack.join("\n")}
                onChange={(e) => set("stack", e.target.value.split("\n"))}
              />
            </Field>
          </Card>
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">العملاء والشركاء</h2>
                <p className="mt-1 text-xs text-muted">
                  كل صف يمثل جهة واحدة وترجماتها. تحريك الصف ينقل اللغات معاً.
                </p>
              </div>
              <button
                type="button"
                className={buttonCls}
                onClick={() => modifyClients("add")}
              >
                <Plus className="size-4" />
                إضافة عميل
              </button>
            </div>
            {!clientCount && (
              <p className="text-sm text-muted">لا توجد أسماء عملاء بعد.</p>
            )}
            {Array.from({ length: clientCount }, (_, index) => (
              <section
                key={index}
                className="space-y-4 rounded-xl border border-line p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold">العميل {index + 1}</h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className={buttonCls}
                      disabled={index === 0}
                      aria-label={`تحريك العميل ${index + 1} للأعلى`}
                      onClick={() => modifyClients("up", index)}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={buttonCls}
                      disabled={index === clientCount - 1}
                      aria-label={`تحريك العميل ${index + 1} للأسفل`}
                      onClick={() => modifyClients("down", index)}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      className={buttonCls}
                      aria-label={`حذف العميل ${index + 1}`}
                      onClick={() => modifyClients("remove", index)}
                    >
                      <Trash2 className="size-4 text-danger" />
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 xl:grid-cols-3">
                  {languages.map((l) => (
                    <Field key={l.lang} label={`اسم العميل — ${l.label}`}>
                      <Input
                        lang={l.lang}
                        dir={l.dir}
                        value={settings[l.clients]?.[index] ?? ""}
                        onChange={(e) =>
                          set(
                            l.clients,
                            Array.from({ length: clientCount }, (_, i) =>
                              i === index
                                ? e.target.value
                                : (settings[l.clients]?.[i] ?? ""),
                            ),
                          )
                        }
                      />
                    </Field>
                  ))}
                </div>
              </section>
            ))}
          </Card>
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold">الإحصائيات</h2>
              <button
                type="button"
                className={buttonCls}
                onClick={() =>
                  set("stats", [...settings.stats, { ...emptyStat }])
                }
              >
                <Plus className="size-4" />
                إضافة إحصائية
              </button>
            </div>
            {!settings.stats.length && (
              <p className="text-sm text-muted">لا توجد إحصائيات معروضة.</p>
            )}
            {settings.stats.map((stat, index) => (
              <section
                key={index}
                className="space-y-4 rounded-xl border border-line p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">الإحصائية {index + 1}</h3>
                  <button
                    type="button"
                    className={buttonCls}
                    aria-label={`حذف الإحصائية ${index + 1}`}
                    onClick={() =>
                      set(
                        "stats",
                        settings.stats.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 className="size-4 text-danger" />
                  </button>
                </div>
                <Field label={`القيمة — الإحصائية ${index + 1}`}>
                  <Input
                    lang="en"
                    dir="ltr"
                    value={stat.value}
                    onChange={(e) =>
                      set(
                        "stats",
                        settings.stats.map((s, i) =>
                          i === index ? { ...s, value: e.target.value } : s,
                        ),
                      )
                    }
                  />
                </Field>
                <div className="grid gap-4 xl:grid-cols-3">
                  {languages.map((l) => (
                    <Field key={l.lang} label={`التسمية — ${l.label}`}>
                      <Input
                        lang={l.lang}
                        dir={l.dir}
                        value={stat[l.statLabel] ?? ""}
                        onChange={(e) =>
                          set(
                            "stats",
                            settings.stats.map((s, i) =>
                              i === index
                                ? { ...s, [l.statLabel]: e.target.value }
                                : s,
                            ),
                          )
                        }
                      />
                    </Field>
                  ))}
                </div>
              </section>
            ))}
          </Card>
          <Card className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold">آراء العملاء</h2>
              <button
                type="button"
                className={buttonCls}
                onClick={() =>
                  set("testimonials", [
                    ...settings.testimonials,
                    { ...emptyTestimonial },
                  ])
                }
              >
                <Plus className="size-4" />
                إضافة رأي
              </button>
            </div>
            {!settings.testimonials.length && (
              <p className="text-sm text-muted">لا توجد آراء معروضة.</p>
            )}
            {settings.testimonials.map((testimonial, index) => (
              <section
                key={index}
                className="space-y-4 rounded-xl border border-line p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">الرأي {index + 1}</h3>
                  <button
                    type="button"
                    className={buttonCls}
                    aria-label={`حذف الرأي ${index + 1}`}
                    onClick={() =>
                      set(
                        "testimonials",
                        settings.testimonials.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Trash2 className="size-4 text-danger" />
                  </button>
                </div>
                <div className="grid gap-4 2xl:grid-cols-3">
                  {languages.map((l) => (
                    <fieldset
                      key={l.lang}
                      className="space-y-3 rounded-xl border border-line p-4"
                    >
                      <legend className="px-2 text-sm font-bold">
                        {l.label}
                      </legend>
                      <Field label={`الاسم — ${l.label}`}>
                        <Input
                          lang={l.lang}
                          dir={l.dir}
                          value={testimonial[l.name] ?? ""}
                          onChange={(e) =>
                            set(
                              "testimonials",
                              settings.testimonials.map((t, i) =>
                                i === index
                                  ? { ...t, [l.name]: e.target.value }
                                  : t,
                              ),
                            )
                          }
                        />
                      </Field>
                      <Field label={`المنصب أو الشركة — ${l.label}`}>
                        <Input
                          lang={l.lang}
                          dir={l.dir}
                          value={testimonial[l.role] ?? ""}
                          onChange={(e) =>
                            set(
                              "testimonials",
                              settings.testimonials.map((t, i) =>
                                i === index
                                  ? { ...t, [l.role]: e.target.value }
                                  : t,
                              ),
                            )
                          }
                        />
                      </Field>
                      <Field label={`نص الرأي — ${l.label}`}>
                        <Textarea
                          lang={l.lang}
                          dir={l.dir}
                          rows={5}
                          value={testimonial[l.text] ?? ""}
                          onChange={(e) =>
                            set(
                              "testimonials",
                              settings.testimonials.map((t, i) =>
                                i === index
                                  ? { ...t, [l.text]: e.target.value }
                                  : t,
                              ),
                            )
                          }
                        />
                      </Field>
                    </fieldset>
                  ))}
                </div>
              </section>
            ))}
          </Card>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 font-semibold text-white"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {saving ? "جارٍ الحفظ…" : "حفظ الإعدادات"}
            </button>
          </div>
        </fieldset>
      </form>
      <form onSubmit={changePassword} className="mt-8 max-w-lg">
        <Card className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold">
            <KeyRound className="size-4 text-brand-2" />
            تغيير كلمة مروري
          </h2>
          <fieldset disabled={passwordBusy} className="space-y-4">
            <Field label="كلمة المرور الحالية">
              <Input
                lang="en"
                dir="ltr"
                type="password"
                autoComplete="current-password"
                required
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
              />
            </Field>
            <Field label="كلمة المرور الجديدة" hint="8 أحرف على الأقل.">
              <Input
                lang="en"
                dir="ltr"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password.next}
                onChange={(e) =>
                  setPassword({ ...password, next: e.target.value })
                }
              />
            </Field>
            <Field label="تأكيد كلمة المرور">
              <Input
                lang="en"
                dir="ltr"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
              />
            </Field>
            <button type="submit" className={buttonCls}>
              {passwordBusy && <Loader2 className="size-4 animate-spin" />}تحديث
              كلمة المرور
            </button>
          </fieldset>
        </Card>
      </form>
    </div>
  );
}
