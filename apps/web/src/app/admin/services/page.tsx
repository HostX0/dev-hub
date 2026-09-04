"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Service } from "@/lib/types";
import { ICON_NAMES, ServiceIcon } from "@/components/ui/Icon";
import { Card, Confirm, Empty, Field, Input, PageHeader, Select, Spinner, TagsInput, Textarea, useToast } from "@/components/admin/ui";

type Draft = Omit<Service, "id">;
const EMPTY: Draft = { title: "", titleEn: "", description: "", descriptionEn: "", icon: "Code2", features: [], featuresEn: [], sortOrder: 0 };

/** Build a draft from a saved service; older rows may lack the English fields. */
function toDraft(s: Service): Draft {
  return {
    title: s.title,
    titleEn: s.titleEn ?? "",
    description: s.description,
    descriptionEn: s.descriptionEn ?? "",
    icon: s.icon,
    features: s.features ?? [],
    featuresEn: s.featuresEn ?? [],
    sortOrder: s.sortOrder,
  };
}

export default function AdminServices() {
  const [list, setList] = useState<Service[] | null>(null);
  const [editing, setEditing] = useState<{ id?: number; draft: Draft } | null>(null);
  const [del, setDel] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = () => clientApi<Service[]>("/services").then(setList).catch(() => setList([]));
  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setBusy(true);
    try {
      const payload = {
        ...editing.draft,
        titleEn: editing.draft.titleEn.trim(),
        descriptionEn: editing.draft.descriptionEn.trim(),
        sortOrder: Number(editing.draft.sortOrder) || 0,
      };
      if (editing.id) await clientApi(`/services/${editing.id}`, { method: "PUT", json: payload });
      else await clientApi("/services", { method: "POST", json: payload });
      toast("success", "تم الحفظ");
      setEditing(null);
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!del) return;
    setBusy(true);
    try {
      await clientApi(`/services/${del.id}`, { method: "DELETE" });
      toast("success", "تم الحذف");
      setDel(null);
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const d = editing?.draft;
  const setD = <K extends keyof Draft>(k: K, v: Draft[K]) => setEditing((s) => (s ? { ...s, draft: { ...s.draft, [k]: v } } : s));

  return (
    <div>
      <PageHeader
        title="الخدمات"
        description="الخدمات المعروضة في الصفحة الرئيسية."
        actions={
          <button onClick={() => setEditing({ draft: { ...EMPTY, sortOrder: (list?.length ?? 0) + 1 } })} className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-semibold text-bg">
            <Plus className="size-4" /> خدمة جديدة
          </button>
        }
      />

      {editing && d && (
        <Card className="mb-6 space-y-5 border-brand/40">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{editing.id ? "تعديل الخدمة" : "خدمة جديدة"}</h2>
            <button onClick={() => setEditing(null)} className="text-muted hover:text-fg"><X className="size-5" /></button>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_200px_100px]">
            <Field label="العنوان"><Input value={d.title} onChange={(e) => setD("title", e.target.value)} /></Field>
            <Field label="الأيقونة">
              <div className="flex items-center gap-2">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-2"><ServiceIcon name={d.icon} className="size-5" /></span>
                <Select value={d.icon} onChange={(e) => setD("icon", e.target.value)}>
                  {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
              </div>
            </Field>
            <Field label="الترتيب"><Input type="number" value={d.sortOrder} onChange={(e) => setD("sortOrder", Number(e.target.value))} dir="ltr" /></Field>
          </div>
          <Field label="الوصف"><Textarea value={d.description} onChange={(e) => setD("description", e.target.value)} rows={3} /></Field>
          <Field label="المميزات" hint="Enter لإضافة عنصر"><TagsInput value={d.features} onChange={(v) => setD("features", v)} placeholder="ميزة..." /></Field>

          <div className="space-y-4 rounded-xl border border-brand/25 bg-white/[0.02] p-4">
            <div>
              <h3 className="text-sm font-bold">المحتوى الإنجليزي <span className="font-display text-muted">/ English content</span></h3>
              <p className="mt-1 text-xs text-muted-2">يُعرض في النسخة الإنجليزية من الموقع. إن تُرك فارغاً يظهر المحتوى العربي.</p>
            </div>
            <Field label="Title"><Input value={d.titleEn} onChange={(e) => setD("titleEn", e.target.value)} dir="ltr" placeholder="Service title" /></Field>
            <Field label="Description"><Textarea value={d.descriptionEn} onChange={(e) => setD("descriptionEn", e.target.value)} rows={3} dir="ltr" /></Field>
            <Field label="Features" hint="Enter to add an item">
              <div dir="ltr"><TagsInput value={d.featuresEn} onChange={(v) => setD("featuresEn", v)} placeholder="Feature..." /></div>
            </Field>
          </div>

          <div className="flex justify-end">
            <button onClick={save} disabled={busy || !d.title} className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-sm font-semibold text-bg disabled:opacity-60">
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} حفظ
            </button>
          </div>
        </Card>
      )}

      {!list ? (
        <div className="grid h-64 place-items-center"><Spinner /></div>
      ) : list.length === 0 ? (
        <Empty text="لا توجد خدمات بعد" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((s) => (
            <Card key={s.id} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-2"><ServiceIcon name={s.icon} className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold">{s.title}</h3>
                {s.titleEn && <p className="font-display text-xs text-muted-2" dir="ltr">{s.titleEn}</p>}
                <p className="mt-1 line-clamp-2 text-sm text-muted">{s.description}</p>
                {s.features?.length > 0 && <p className="mt-2 text-xs text-muted-2">{s.features.join(" · ")}</p>}
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <button onClick={() => setEditing({ id: s.id, draft: toDraft(s) })} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-fg"><Pencil className="size-4" /></button>
                <button onClick={() => setDel(s)} className="grid size-8 place-items-center rounded-lg text-muted hover:bg-danger/10 hover:text-danger"><Trash2 className="size-4" /></button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Confirm open={!!del} title="حذف الخدمة؟" text={del?.title} onConfirm={remove} onClose={() => setDel(null)} loading={busy} />
    </div>
  );
}
