"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import type { Message } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Card, Confirm, Empty, PageHeader, Spinner, useToast } from "@/components/admin/ui";

export default function AdminMessages() {
  const [list, setList] = useState<Message[] | null>(null);
  const [active, setActive] = useState<Message | null>(null);
  const [del, setDel] = useState<Message | null>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = () => clientApi<Message[]>("/messages").then(setList).catch(() => setList([]));
  useEffect(() => {
    load();
  }, []);

  async function open(m: Message) {
    setActive(m);
    if (!m.read) {
      await clientApi(`/messages/${m.id}/read`, { method: "PATCH" }).catch(() => {});
      setList((l) => l?.map((x) => (x.id === m.id ? { ...x, read: true } : x)) ?? l);
    }
  }

  async function remove() {
    if (!del) return;
    setBusy(true);
    try {
      await clientApi(`/messages/${del.id}`, { method: "DELETE" });
      toast("success", "تم حذف الرسالة");
      if (active?.id === del.id) setActive(null);
      setDel(null);
      load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader title="الرسائل" description="الرسائل الواردة من نموذج التواصل." />
      {!list ? (
        <div className="grid h-64 place-items-center"><Spinner /></div>
      ) : list.length === 0 ? (
        <Empty text="لا توجد رسائل بعد" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <ul className="max-h-[70vh] divide-y divide-line overflow-y-auto">
              {list.map((m) => (
                <li key={m.id}>
                  <button onClick={() => open(m)} className={cn("w-full px-4 py-3 text-start transition-colors hover:bg-white/[0.03]", active?.id === m.id && "bg-brand/10")}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("flex items-center gap-2 text-sm", !m.read ? "font-bold" : "font-medium")}>
                        {!m.read && <span className="size-1.5 rounded-full bg-brand-2" />}
                        {m.name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-2">{formatDate(m.createdAt)}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted">{m.subject || m.body}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Card className="min-h-[300px]">
            {!active ? (
              <div className="grid h-full min-h-[260px] place-items-center text-sm text-muted">
                <span className="flex flex-col items-center gap-2"><Mail className="size-8 text-muted-2" /> اختر رسالة لعرضها</span>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <h2 className="text-lg font-bold">{active.subject || "بدون موضوع"}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {active.name} · <a href={`mailto:${active.email}`} className="text-brand-2 hover:underline" dir="ltr">{active.email}</a>
                    </p>
                    <p className="mt-1 text-xs text-muted-2">{formatDate(active.createdAt)}</p>
                  </div>
                  <div className="flex gap-1">
                    <a href={`mailto:${active.email}?subject=Re: ${encodeURIComponent(active.subject)}`} className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-xs font-semibold hover:border-brand/50">
                      <Mail className="size-3.5" /> رد
                    </a>
                    <button onClick={() => setDel(active)} className="grid size-9 place-items-center rounded-full border border-line text-muted hover:border-danger/50 hover:text-danger"><Trash2 className="size-4" /></button>
                  </div>
                </div>
                <p className="mt-5 whitespace-pre-wrap leading-[1.9]">{active.body}</p>
              </div>
            )}
          </Card>
        </div>
      )}
      <Confirm open={!!del} title="حذف الرسالة؟" onConfirm={remove} onClose={() => setDel(null)} loading={busy} />
    </div>
  );
}
