"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/client";

const inputCls =
  "w-full rounded-lg border border-line-2 bg-white px-4 py-3.5 text-base text-fg placeholder:text-muted-2 outline-none transition-all focus:border-brand/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]";

export function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (state === "done") successRef.current?.focus(); }, [state]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;
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
          <motion.div
            ref={successRef}
            role="status"
            tabIndex={-1}
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[380px] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">{f.doneTitle}</h3>
            <p className="mt-2 text-muted">{f.doneText}</p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => setState("idle")}
            >
              {f.again}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            aria-busy={state === "loading"}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium"
                >
                  {f.name}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  required
                  minLength={2}
                  placeholder={f.namePh}
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium"
                >
                  {f.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  maxLength={160}
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputCls}
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-medium"
              >
                {f.subject}
              </label>
              <input
                id="contact-subject"
                name="subject"
                maxLength={200}
                placeholder={f.subjectPh}
                className={inputCls}
              />
            </div>
            <div>
              <label
                htmlFor="contact-body"
                className="mb-2 block text-sm font-medium"
              >
                {f.body}
              </label>
              <textarea
                id="contact-body"
                name="body"
                maxLength={4000}
                required
                minLength={5}
                rows={5}
                placeholder={f.bodyPh}
                className={inputCls}
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={state === "loading"}
            >
              {state === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4 rtl:-scale-x-100" />
              )}
              {f.submit}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
