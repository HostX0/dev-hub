"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/client";

const inputCls =
  "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3.5 text-sm text-fg placeholder:text-muted-2 outline-none transition-all focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(124,108,255,0.12)]";

export function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("loading");
    setError("");
    try {
      await clientApi("/messages", { method: "POST", json: data });
      setState("done");
      form.reset();
    } catch (err) {
      setError((err as Error).message || f.error);
      setState("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[380px] flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">{f.doneTitle}</h3>
            <p className="mt-2 text-muted">{f.doneText}</p>
            <Button variant="secondary" className="mt-6" onClick={() => setState("idle")}>
              {f.again}
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">{f.name}</label>
                <input name="name" required minLength={2} placeholder={f.namePh} className={inputCls} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">{f.email}</label>
                <input name="email" type="email" required placeholder="you@company.com" className={inputCls} dir="ltr" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">{f.subject}</label>
              <input name="subject" placeholder={f.subjectPh} className={inputCls} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">{f.body}</label>
              <textarea name="body" required minLength={5} rows={5} placeholder={f.bodyPh} className={inputCls} />
            </div>
            {error && <p className="text-sm text-danger">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={state === "loading"}>
              {state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 rtl:-scale-x-100" />}
              {f.submit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
