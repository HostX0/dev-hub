"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, ShieldCheck, UserRoundX } from "lucide-react";
import { clientApi } from "@/lib/client-api";
import {
  useAdmin,
  PERMISSION_RESOURCES,
  type AdminUser,
} from "@/components/admin/AdminSession";
import {
  Card,
  Confirm,
  Empty,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  Spinner,
  Toggle,
  useToast,
} from "@/components/admin/ui";

const blank = {
  username: "",
  displayName: "",
  password: "",
  role: "admin" as "admin" | "owner",
  permissions: [] as string[],
  active: true,
};
const primary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50";

export default function AdminUsers() {
  const { user, can, refresh } = useAdmin();
  const toast = useToast();
  const [list, setList] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<AdminUser | "new" | null>(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [deactivating, setDeactivating] = useState<AdminUser | null>(null);
  const load = useCallback(async () => {
    try {
      setList(await clientApi<AdminUser[]>("/users"));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    let active = true;
    clientApi<AdminUser[]>("/users")
      .then((rows) => {
        if (active) setList(rows);
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);
  const editable = (target: AdminUser) =>
    can("users:write") &&
    (user.role === "owner" ||
      (target.role !== "owner" && target.permissions.every((p) => can(p))));

  function open(target: AdminUser | "new") {
    setEditing(target);
    setForm(
      target === "new"
        ? { ...blank, permissions: [] }
        : {
            username: target.username,
            displayName: target.displayName,
            password: "",
            role: target.role,
            permissions: [...target.permissions],
            active: target.active,
          },
    );
  }
  function permission(resource: string, level: string) {
    setForm((f) => ({
      ...f,
      permissions: [
        ...f.permissions.filter((p) => !p.startsWith(`${resource}:`)),
        ...(level === "none"
          ? []
          : level === "write"
            ? [`${resource}:read`, `${resource}:write`]
            : [`${resource}:read`]),
      ],
    }));
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    try {
      const { password, ...rest } = form;
      await clientApi(editing === "new" ? "/users" : `/users/${editing.id}`, {
        method: editing === "new" ? "POST" : "PUT",
        json: { ...rest, ...(password ? { password } : {}) },
      });
      toast(
        "success",
        editing === "new" ? "تمت إضافة الأدمن" : "تم تحديث الحساب والصلاحيات",
      );
      setEditing(null);
      await Promise.all([load(), refresh()]);
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function deactivate() {
    if (!deactivating) return;
    setBusy(true);
    try {
      await clientApi(`/users/${deactivating.id}`, { method: "DELETE" });
      setDeactivating(null);
      toast("success", "تم تعطيل الحساب مع حفظ سجل مساهماته");
      await load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="الأدمن والصلاحيات"
        description="امنح كل شخص الوصول الذي يحتاجه، وأبقِ مسؤولية العمل واضحة."
        actions={
          can("users:write") && (
            <button className={primary} onClick={() => open("new")}>
              <Plus className="size-4" /> إضافة أدمن
            </button>
          )
        }
      />
      <Card className="mb-6 flex items-start gap-3">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-2" />
        <p className="text-sm leading-7 text-muted">
          المالك يدير جميع الأقسام. للأدمن يمكنك تحديد عرض فقط أو عرض وتعديل لكل
          قسم. تعطيل الحساب يمنع الدخول ويحفظ التعليقات والتاسكات المسندة إليه.
        </p>
      </Card>
      {error ? (
        <p role="alert" className="text-danger">
          {error}{" "}
          <button onClick={load} className="underline">
            إعادة المحاولة
          </button>
        </p>
      ) : !list ? (
        <Spinner />
      ) : !list.length ? (
        <Empty text="لا توجد حسابات" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((account) => (
            <Card key={account.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold">
                    {account.displayName || account.username}{" "}
                    {account.id === user.id && (
                      <span className="text-xs text-brand-2">(أنت)</span>
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-muted" dir="ltr" lang="en">
                    @{account.username}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${account.active ? "bg-success/10 text-success" : "bg-white/5 text-muted"}`}
                >
                  {account.active ? "نشط" : "معطّل"}
                </span>
              </div>
              <p className="mt-4 text-sm text-brand-2">
                {account.role === "owner"
                  ? "مالك الحساب · وصول كامل"
                  : "أدمن · صلاحيات مخصصة"}
              </p>
              {account.role !== "owner" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {PERMISSION_RESOURCES.filter((r) =>
                    account.permissions.some((p) => p.startsWith(`${r.key}:`)),
                  ).map((r) => (
                    <span
                      key={r.key}
                      className="rounded-lg border border-line px-2 py-1 text-xs text-muted"
                    >
                      {r.label} ·{" "}
                      {account.permissions.includes(`${r.key}:write`)
                        ? "تعديل"
                        : "عرض"}
                    </span>
                  ))}
                  {!account.permissions.length && (
                    <span className="text-xs text-muted">
                      لم تُمنح صلاحيات بعد
                    </span>
                  )}
                </div>
              )}
              {editable(account) && (
                <div className="mt-5 flex gap-2 border-t border-line pt-4">
                  <button
                    className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm"
                    onClick={() => open(account)}
                  >
                    <Pencil className="size-4" /> تعديل
                  </button>
                  {account.active && account.id !== user.id && (
                    <button
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger"
                      onClick={() => setDeactivating(account)}
                    >
                      <UserRoundX className="size-4" /> تعطيل
                    </button>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      <Modal
        open={!!editing}
        title={editing === "new" ? "إضافة أدمن" : "تعديل حساب الأدمن"}
        onClose={() => {
          if (!busy) setEditing(null);
        }}
        wide
      >
        <form onSubmit={save} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="اسم العرض">
              <Input
                required
                maxLength={100}
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
              />
            </Field>
            <Field
              label="اسم المستخدم"
              hint="أحرف إنكليزية وأرقام، بدون مسافات"
            >
              <Input
                dir="ltr"
                autoComplete="off"
                required
                pattern="[A-Za-z0-9_.-]+"
                minLength={3}
                maxLength={60}
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </Field>
          </div>
          <Field
            label={
              editing === "new" ? "كلمة المرور" : "كلمة مرور جديدة (اختياري)"
            }
            hint="١٢ حرفاً على الأقل. اترك الحقل فارغاً للاحتفاظ بكلمة المرور الحالية."
          >
            <Input
              type="password"
              dir="ltr"
              autoComplete="new-password"
              required={editing === "new"}
              minLength={12}
              maxLength={72}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>
          <Field label="الدور">
            <Select
              value={form.role}
              disabled={
                user.role !== "owner" ||
                (editing !== "new" && editing?.id === user.id)
              }
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "owner" | "admin" })
              }
            >
              <option value="admin">أدمن بصلاحيات مخصصة</option>
              {user.role === "owner" && (
                <option value="owner">مالك بصلاحيات كاملة</option>
              )}
            </Select>
          </Field>
          {form.role === "admin" && (
            <fieldset className="rounded-xl border border-line p-4">
              <legend className="px-2 text-sm font-semibold">
                صلاحيات الأقسام
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {PERMISSION_RESOURCES.map((r) => (
                  <Field key={r.key} label={r.label}>
                    <Select
                      disabled={!can(`${r.key}:read`)}
                      value={
                        form.permissions.includes(`${r.key}:write`)
                          ? "write"
                          : form.permissions.includes(`${r.key}:read`)
                            ? "read"
                            : "none"
                      }
                      onChange={(e) => permission(r.key, e.target.value)}
                    >
                      <option value="none">بدون وصول</option>
                      {can(`${r.key}:read`) && (
                        <option value="read">عرض فقط</option>
                      )}
                      {can(`${r.key}:write`) && (
                        <option value="write">عرض وإضافة وتعديل وحذف</option>
                      )}
                    </Select>
                  </Field>
                ))}
              </div>
            </fieldset>
          )}
          {editing !== "new" && editing?.id !== user.id && (
            <Toggle
              label="الحساب نشط"
              checked={form.active}
              onChange={(active) => setForm({ ...form, active })}
            />
          )}
          <div className="flex justify-end gap-3 border-t border-line pt-5">
            <button
              type="button"
              disabled={busy}
              onClick={() => setEditing(null)}
              className="px-4 py-2 text-sm text-muted"
            >
              إلغاء
            </button>
            <button disabled={busy} className={primary}>
              {busy && <Spinner />} حفظ الحساب
            </button>
          </div>
        </form>
      </Modal>
      <Confirm
        open={!!deactivating}
        title="تعطيل حساب الأدمن؟"
        text="لن يستطيع الدخول أو تنفيذ أي إجراء. يمكنك إعادة تفعيله لاحقاً، وستبقى مساهماته محفوظة."
        confirmLabel="تعطيل الحساب"
        loading={busy}
        onClose={() => setDeactivating(null)}
        onConfirm={deactivate}
      />
    </div>
  );
}
