"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  useId,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/client-api";

/* ---------- Toasts ---------- */
type Toast = { id: number; type: "success" | "error"; text: string };
const ToastCtx = createContext<(type: Toast["type"], text: string) => void>(
  () => {},
);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((type: Toast["type"], text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              role={t.type === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={cn(
                "glass pointer-events-auto flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium shadow-card",
                t.type === "success" ? "text-success" : "text-danger",
              )}
            >
              {t.type === "success" ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <XCircle className="size-4" />
              )}
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- Primitives ---------- */
export const inputCls =
  "w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg placeholder:text-muted-2 outline-none transition-all focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)] disabled:opacity-50";

export function Field({
  label,
  hint,
  children,
  className,
  lang,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  lang?: string;
}) {
  return (
    <label lang={lang} className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs text-muted-2">{hint}</span>
      )}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      lang={props.lang ?? (props.dir === "ltr" ? "en" : undefined)}
      className={cn(inputCls, props.className)}
    />
  );
}
export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      lang={props.lang ?? (props.dir === "ltr" ? "en" : undefined)}
      className={cn(inputCls, "min-h-[100px]", props.className)}
    />
  );
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(inputCls, "bg-surface", props.className)}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-sm font-medium disabled:opacity-50"
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-brand" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white transition-all",
            checked ? "right-0.5" : "right-[22px]",
          )}
        />
      </span>
      {label}
    </button>
  );
}

export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-line bg-surface p-5 md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("size-5 animate-spin text-muted", className)} />
  );
}

export function Empty({ text }: { text: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-line py-14 text-center text-sm text-muted">
      {text}
    </p>
  );
}

/* ---------- Confirm dialog ---------- */
export function Modal({
  open,
  title,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
    return () => {
      if (element.open) element.close();
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={cn(
        "fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-line bg-surface p-5 text-fg shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm md:p-7",
        wide ? "max-w-3xl" : "max-w-lg",
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-xl font-bold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line hover:bg-white/5"
        >
          <X className="size-4" />
        </button>
      </div>
      {open && children}
    </dialog>
  );
}

export function Confirm({
  open,
  title,
  text,
  onConfirm,
  onClose,
  loading,
  confirmLabel = "حذف",
}: {
  open: boolean;
  title: string;
  text?: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  confirmLabel?: string;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={() => {
        if (!loading) onClose();
      }}
    >
      {text && <p className="mt-2 text-sm text-muted">{text}</p>}
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={loading}
          className="rounded-full px-4 py-2 text-sm text-muted hover:bg-white/5"
        >
          إلغاء
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-danger px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

/* ---------- Image uploader ---------- */
export function ImageUploader({
  value,
  onChange,
  label,
  aspect = "aspect-[16/10]",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspect?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function handle(file?: File | null) {
    if (!file || busy) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {label && (
        <span className="mb-1.5 block text-sm font-medium">{label}</span>
      )}
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border border-dashed border-line-2 bg-white/[0.02] transition-colors hover:border-brand/50",
          aspect,
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handle(e.dataTransfer.files?.[0]);
        }}
      >
        {value ? (
          <SafeImage
            src={value}
            alt={label ?? "صورة"}
            fallback="تعذر تحميل الصورة"
            className="size-full object-cover object-top"
          />
        ) : (
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-muted"
          >
            <ImagePlus className="size-7" />
            اسحب صورة هنا أو اضغط للاختيار
          </button>
        )}
        {value && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-bg/70 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className="rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg"
            >
              تغيير
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full bg-danger px-4 py-2 text-sm font-semibold text-white"
            >
              إزالة
            </button>
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-bg/70">
            <Spinner />
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handle(e.target.files?.[0])}
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="أو الصق رابط الصورة"
          aria-label={label ? `رابط ${label}` : "رابط الصورة"}
          dir="ltr"
          className="text-xs"
        />
      </div>
      {err && (
        <p role="alert" className="mt-1 text-xs text-danger">
          {err}
        </p>
      )}
    </div>
  );
}

/* ---------- Multi-image (gallery) ---------- */
export function GalleryUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  async function handle(files: FileList | null) {
    if (!files?.length || busy) return;
    setBusy(true);
    setError("");
    const urls: string[] = [];
    try {
      for (const f of Array.from(files)) urls.push(await uploadImage(f));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      if (urls.length) onChange([...value, ...urls]);
      if (ref.current) ref.current.value = "";
      setBusy(false);
    }
  }
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium">معرض الصور</span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-line"
          >
            <SafeImage
              src={src}
              alt="صورة من معرض المشروع"
              fallback="تعذر تحميل الصورة"
              className="size-full object-cover object-top"
            />
            <button
              type="button"
              disabled={busy}
              aria-label={`إزالة صورة المعرض ${i + 1}`}
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-bg/80 text-danger transition-opacity sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 disabled:opacity-50"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="flex aspect-[16/10] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-2 text-xs text-muted transition-colors hover:border-brand/50"
        >
          {busy ? <Spinner /> : <ImagePlus className="size-5" />}
          إضافة صور
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handle(e.target.files)}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Tags input ---------- */
export function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  function commit() {
    const parts = draft
      .split(/[,،]/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length)
      onChange([...value, ...parts.filter((p) => !value.includes(p))]);
    setDraft("");
  }
  return (
    <div className={cn(inputCls, "flex flex-wrap items-center gap-1.5 py-1.5")}>
      {value.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-md bg-brand/15 px-2 py-0.5 text-xs text-brand-2"
        >
          {t}
          <button
            type="button"
            onClick={() => onChange(value.filter((x) => x !== t))}
            className="hover:text-fg"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          } else if (e.key === "Backspace" && !draft && value.length)
            onChange(value.slice(0, -1));
        }}
        onBlur={commit}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[120px] flex-1 bg-transparent py-1 text-sm outline-none"
      />
    </div>
  );
}
