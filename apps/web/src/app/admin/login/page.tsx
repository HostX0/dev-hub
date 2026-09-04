"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Lock } from "lucide-react";
import { auth, clientApi } from "@/lib/client-api";
import { Field, Input } from "@/components/admin/ui";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as { username: string; password: string };
    try {
      const res = await clientApi<{ token: string }>("/auth/login", { method: "POST", json: data });
      auth.set(res.token);
      router.replace("/admin");
    } catch (err) {
      setError((err as Error).message || "فشل تسجيل الدخول");
      setLoading(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden p-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="glow-blob absolute left-1/2 top-1/4 h-[600px] w-[900px] -translate-x-1/2 [--glow-color:rgba(124,108,255,0.3)]" />
      </div>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card w-full max-w-sm p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow">
            <Lock className="size-6" />
          </span>
          <h1 className="mt-4 text-xl font-bold">تسجيل الدخول</h1>
          <p className="mt-1 text-sm text-muted">لوحة تحكم <span className="font-display" dir="ltr">Dev Hub</span> · مركز التطوير</p>
        </div>
        <div className="space-y-4">
          <Field label="اسم المستخدم">
            <Input name="username" required autoComplete="username" dir="ltr" />
          </Field>
          <Field label="كلمة المرور">
            <Input name="password" type="password" required autoComplete="current-password" dir="ltr" />
          </Field>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-fg font-semibold text-bg transition-all hover:bg-white hover:shadow-glow disabled:opacity-60">
            {loading && <Loader2 className="size-4 animate-spin" />}
            دخول
          </button>
        </div>
      </motion.form>
    </div>
  );
}
