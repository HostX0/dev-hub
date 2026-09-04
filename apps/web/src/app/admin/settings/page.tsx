"use client";

import { useEffect, useState } from "react";
import { KeyRound, Loader2, MessageSquareQuote, Plus, Save, Trash2, X } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import { DEFAULT_SETTINGS, type SiteSettings, type Stat, type Testimonial } from "@/lib/types";
import { Card, Field, Input, PageHeader, Spinner, TagsInput, Textarea, useToast } from "@/components/admin/ui";

const EMPTY_STAT: Stat = { label: "", labelEn: "", value: "" };
const EMPTY_TESTIMONIAL: Testimonial = { name: "", nameEn: "", role: "", roleEn: "", text: "", textEn: "" };

/** Merge a (possibly partial / older) settings row with the defaults so every key exists. */
function normalize(d: Partial<SiteSettings>): SiteSettings {
  const str = (v: unknown, fallback: string) => (typeof v === "string" ? v : fallback);
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  const merged: SiteSettings = { ...DEFAULT_SETTINGS, ...d, socials: { ...DEFAULT_SETTINGS.socials, ...(d.socials ?? {}) } };
  return {
    ...merged,
    siteName: str(d.siteName, DEFAULT_SETTINGS.siteName),
    siteNameAr: str(d.siteNameAr, DEFAULT_SETTINGS.siteNameAr),
    heroTitleEn: str(d.heroTitleEn, DEFAULT_SETTINGS.heroTitleEn),
    heroSubtitleEn: str(d.heroSubtitleEn, ""),
    bioEn: str(d.bioEn, ""),
    locationEn: str(d.locationEn, ""),
    stats: arr<Partial<Stat>>(d.stats).map((s) => ({ ...EMPTY_STAT, ...s, labelEn: s.labelEn ?? "" })),
    stack: arr<string>(d.stack),
    clients: arr<string>(d.clients),
    testimonials: arr<Partial<Testimonial>>(d.testimonials).map((t) => ({ ...EMPTY_TESTIMONIAL, ...t })),
  };
}

export default function AdminSettings() {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwBusy, setPwBusy] = useState(false);
  const toast = useToast();

  useEffect(() => {
    clientApi<Partial<SiteSettings>>("/settings")
      .then((d) => setS(normalize(d ?? {})))
      .catch(() => setS(normalize({})));
  }, []);

  if (!s) return <div className="grid h-64 place-items-center"><Spinner /></div>;

  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => setS((x) => (x ? { ...x, [k]: v } : x));
  const setStat = (i: number, patch: Partial<Stat>) => set("stats", s.stats.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const setTestimonial = (i: number, patch: Partial<Testimonial>) => set("testimonials", s.testimonials.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await clientApi("/settings", { method: "PUT", json: s });
      toast("success", "تم حفظ الإعدادات");
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.next !== pw.confirm) return toast("error", "كلمتا المرور غير متطابقتين");
    setPwBusy(true);
    try {
      await clientApi("/auth/change-password", { method: "POST", json: { current: pw.current, next: pw.next } });
      toast("success", "تم تغيير كلمة المرور");
      setPw({ current: "", next: "", confirm: "" });
    } catch (err) {
      toast("error", (err as Error).message);
    } finally {
      setPwBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title="الإعدادات" description="محتوى الموقع العام (عربي / إنجليزي) وبيانات التواصل." />
      <form onSubmit={save} className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <Card className="space-y-4">
              <h2 className="font-bold">المحتوى العربي</h2>
              <Field label="اسم العلامة بالعربية"><Input value={s.siteNameAr} onChange={(e) => set("siteNameAr", e.target.value)} placeholder="مركز التطوير" /></Field>
              <Field label="عنوان الصفحة الرئيسية (Hero)"><Input value={s.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} /></Field>
              <Field label="الوصف تحت العنوان"><Textarea value={s.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} rows={3} /></Field>
              <Field label="نبذة عن الشركة"><Textarea value={s.bio} onChange={(e) => set("bio", e.target.value)} rows={5} /></Field>
              <Field label="الموقع الجغرافي"><Input value={s.location} onChange={(e) => set("location", e.target.value)} placeholder="الرياض، السعودية" /></Field>
            </Card>

            <Card className="space-y-4 border-brand/25">
              <div>
                <h2 className="font-bold">المحتوى الإنجليزي <span className="font-display text-muted">/ English</span></h2>
                <p className="mt-1 text-xs text-muted-2">يُعرض في النسخة الإنجليزية من الموقع.</p>
              </div>
              <Field label="Brand name"><Input value={s.siteName} onChange={(e) => set("siteName", e.target.value)} dir="ltr" placeholder="Dev Hub" /></Field>
              <Field label="Hero title"><Input value={s.heroTitleEn} onChange={(e) => set("heroTitleEn", e.target.value)} dir="ltr" /></Field>
              <Field label="Hero subtitle"><Textarea value={s.heroSubtitleEn} onChange={(e) => set("heroSubtitleEn", e.target.value)} rows={3} dir="ltr" /></Field>
              <Field label="About"><Textarea value={s.bioEn} onChange={(e) => set("bioEn", e.target.value)} rows={5} dir="ltr" /></Field>
              <Field label="Location"><Input value={s.locationEn} onChange={(e) => set("locationEn", e.target.value)} dir="ltr" placeholder="Riyadh, Saudi Arabia" /></Field>
            </Card>
          </div>

          <Card className="space-y-4">
            <h2 className="font-bold">التقنيات والعملاء</h2>
            <Field label="التقنيات (شريط متحرك)" hint="Enter لإضافة"><TagsInput value={s.stack} onChange={(v) => set("stack", v)} placeholder="Next.js..." /></Field>
            <Field label="العملاء (شريط الثقة)" hint="أسماء العملاء أو الشركاء المعروضة في شريط «موثوق من»">
              <TagsInput value={s.clients} onChange={(v) => set("clients", v)} placeholder="اسم العميل..." />
            </Field>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">الإحصائيات</h2>
                <p className="mt-0.5 text-xs text-muted-2">القيمة، ثم التسمية بالعربية، ثم بالإنجليزية.</p>
              </div>
              <button type="button" onClick={() => set("stats", [...s.stats, { ...EMPTY_STAT }])} className="inline-flex items-center gap-1 text-xs text-brand-2"><Plus className="size-3.5" /> إضافة</button>
            </div>
            {s.stats.length === 0 && <p className="text-sm text-muted">لا توجد إحصائيات بعد.</p>}
            {s.stats.map((st, i) => (
              <div key={i} className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Input value={st.value} onChange={(e) => setStat(i, { value: e.target.value })} placeholder="+40" dir="ltr" className="w-28" />
                <Input value={st.label} onChange={(e) => setStat(i, { label: e.target.value })} placeholder="مشروع منجز" />
                <Input value={st.labelEn} onChange={(e) => setStat(i, { labelEn: e.target.value })} placeholder="Projects delivered" dir="ltr" />
                <button type="button" onClick={() => set("stats", s.stats.filter((_, j) => j !== i))} className="grid size-10 shrink-0 place-items-center rounded-xl text-muted hover:text-danger" aria-label="حذف"><X className="size-4" /></button>
              </div>
            ))}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 font-bold"><MessageSquareQuote className="size-4 text-brand-2" /> آراء العملاء</h2>
                <p className="mt-0.5 text-xs text-muted-2">تُعرض في قسم الشهادات بالصفحة الرئيسية.</p>
              </div>
              <button type="button" onClick={() => set("testimonials", [...s.testimonials, { ...EMPTY_TESTIMONIAL }])} className="inline-flex items-center gap-1 text-xs text-brand-2"><Plus className="size-3.5" /> إضافة</button>
            </div>
            {s.testimonials.length === 0 && <p className="text-sm text-muted">لا توجد آراء بعد.</p>}
            {s.testimonials.map((t, i) => (
              <div key={i} className="space-y-3 rounded-xl border border-line bg-white/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs text-muted-2">#{i + 1}</span>
                  <button type="button" onClick={() => set("testimonials", s.testimonials.filter((_, j) => j !== i))} className="inline-flex items-center gap-1 text-xs text-muted hover:text-danger"><Trash2 className="size-3.5" /> حذف</button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-3">
                    <Field label="الاسم"><Input value={t.name} onChange={(e) => setTestimonial(i, { name: e.target.value })} /></Field>
                    <Field label="المنصب / الشركة"><Input value={t.role} onChange={(e) => setTestimonial(i, { role: e.target.value })} /></Field>
                    <Field label="النص"><Textarea value={t.text} onChange={(e) => setTestimonial(i, { text: e.target.value })} rows={4} /></Field>
                  </div>
                  <div className="space-y-3">
                    <Field label="Name"><Input value={t.nameEn} onChange={(e) => setTestimonial(i, { nameEn: e.target.value })} dir="ltr" /></Field>
                    <Field label="Role / Company"><Input value={t.roleEn} onChange={(e) => setTestimonial(i, { roleEn: e.target.value })} dir="ltr" /></Field>
                    <Field label="Text"><Textarea value={t.textEn} onChange={(e) => setTestimonial(i, { textEn: e.target.value })} rows={4} dir="ltr" /></Field>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <button type="submit" disabled={saving} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-fg font-semibold text-bg hover:bg-white disabled:opacity-60">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} حفظ الإعدادات
            </button>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-bold">التواصل</h2>
            <Field label="البريد الإلكتروني"><Input value={s.email} onChange={(e) => set("email", e.target.value)} dir="ltr" /></Field>
            <Field label="الهاتف"><Input value={s.phone} onChange={(e) => set("phone", e.target.value)} dir="ltr" /></Field>
            <Field label="واتساب (بصيغة دولية بدون +)"><Input value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} dir="ltr" placeholder="9665XXXXXXXX" /></Field>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-bold">حسابات التواصل</h2>
            {(["github", "linkedin", "twitter", "instagram"] as const).map((k) => (
              <Field key={k} label={k === "twitter" ? "X (Twitter)" : k.charAt(0).toUpperCase() + k.slice(1)}>
                <Input value={s.socials[k]} onChange={(e) => set("socials", { ...s.socials, [k]: e.target.value })} dir="ltr" placeholder="https://" />
              </Field>
            ))}
          </Card>
        </div>
      </form>

      <form onSubmit={changePassword} className="mt-6">
        <Card className="space-y-4 lg:max-w-md">
          <h2 className="flex items-center gap-2 font-bold"><KeyRound className="size-4 text-brand-2" /> تغيير كلمة المرور</h2>
          <Field label="كلمة المرور الحالية"><Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} dir="ltr" required /></Field>
          <Field label="كلمة المرور الجديدة" hint="8 أحرف على الأقل"><Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} dir="ltr" required minLength={8} /></Field>
          <Field label="تأكيد كلمة المرور"><Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} dir="ltr" required /></Field>
          <button type="submit" disabled={pwBusy} className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold hover:border-brand/50 disabled:opacity-60">
            {pwBusy && <Loader2 className="size-4 animate-spin" />} تحديث كلمة المرور
          </button>
        </Card>
      </form>
    </div>
  );
}
