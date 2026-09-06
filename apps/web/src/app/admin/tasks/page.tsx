"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  ArrowDown,
  ArrowUp,
  ListChecks,
  MessageSquare,
  Pencil,
  Plus,
  Settings2,
  Trash2,
  UserRound,
} from "lucide-react";
import { clientApi } from "@/lib/client-api";
import { useAdmin } from "@/components/admin/AdminSession";
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
  Textarea,
  useToast,
} from "@/components/admin/ui";

type Profile = { id: number; username: string; displayName: string };
type Stage = {
  id: number;
  name: string;
  nameAr: string;
  nameCkb: string;
  color: string;
  sortOrder: number;
};
type Comment = {
  id: number;
  body: string;
  createdAt: string;
  author: Profile | null;
};
type Task = {
  archived: boolean;
  id: number;
  title: string;
  description: string;
  stageId: number;
  assigneeId: number | null;
  sortOrder: number;
  assignee?: Profile | null;
  createdBy?: Profile | null;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
};
const newTask = { title: "", description: "", stageId: 0, assigneeId: "" };
const newStage = { name: "", nameAr: "", nameCkb: "", color: "#6366F1" };
const button =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50";
const outline =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-semibold hover:border-brand/50 disabled:opacity-50";
const stageName = (stage: Stage) => stage.nameAr || stage.name;

export default function AdminTasks() {
  const { user, can } = useAdmin();
  const writable = can("tasks:write");
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [people, setPeople] = useState<Profile[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Task | "new" | null>(null);
  const [form, setForm] = useState(newTask);
  const [detail, setDetail] = useState<Task | null>(null);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [stageDialog, setStageDialog] = useState(false);
  const [stageEditing, setStageEditing] = useState<number | null>(null);
  const [stageForm, setStageForm] = useState(newStage);
  const [deleting, setDeleting] = useState<{
    kind: "task" | "stage";
    id: number;
  } | null>(null);
  const load = useCallback(async () => {
    try {
      const [items, columns, assignees] = await Promise.all([
        clientApi<Task[]>("/tasks?includeArchived=1"),
        clientApi<Stage[]>("/tasks/stages"),
        clientApi<Profile[]>("/tasks/assignees"),
      ]);
      setTasks(items);
      setStages(columns.sort((a, b) => a.sortOrder - b.sortOrder));
      setPeople(assignees);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    let active = true;
    Promise.all([
      clientApi<Task[]>("/tasks?includeArchived=1"),
      clientApi<Stage[]>("/tasks/stages"),
      clientApi<Profile[]>("/tasks/assignees"),
    ])
      .then(([items, columns, assignees]) => {
        if (active) {
          setTasks(items);
          setStages(columns.sort((a, b) => a.sortOrder - b.sortOrder));
          setPeople(assignees);
        }
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);

  function edit(task: Task | "new", stageId?: number) {
    setDetail(null);
    setEditing(task);
    setForm(
      task === "new"
        ? {
            ...newTask,
            stageId: stageId ?? stages[0]?.id ?? 0,
            assigneeId: String(user.id),
          }
        : {
            title: task.title,
            description: task.description,
            stageId: task.stageId,
            assigneeId: task.assigneeId == null ? "" : String(task.assigneeId),
          },
    );
  }
  async function saveTask(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    try {
      await clientApi(editing === "new" ? "/tasks" : `/tasks/${editing.id}`, {
        method: editing === "new" ? "POST" : "PUT",
        json: {
          ...form,
          assigneeId: form.assigneeId ? Number(form.assigneeId) : null,
        },
      });
      setEditing(null);
      toast("success", "تم حفظ التاسك");
      await load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function showTask(task: Task) {
    try {
      setComment("");
      setDetail(await clientApi<Task>(`/tasks/${task.id}`));
    } catch (e) {
      toast("error", (e as Error).message);
    }
  }
  async function move(task: Task, stageId: number) {
    if (stageId === task.stageId) return;
    setBusy(true);
    try {
      await clientApi(`/tasks/${task.id}`, {
        method: "PATCH",
        json: { stageId },
      });
      toast("success", "تم نقل التاسك");
      await load();
      if (detail?.id === task.id) await showTask(task);
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function addComment(event: React.FormEvent) {
    event.preventDefault();
    if (!detail || !comment.trim()) return;
    setBusy(true);
    try {
      await clientApi(`/tasks/${detail.id}/comments`, {
        method: "POST",
        json: { body: comment.trim() },
      });
      await showTask(detail);
      toast("success", "تمت إضافة التعليق");
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function saveStage(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await clientApi(
        stageEditing ? `/tasks/stages/${stageEditing}` : "/tasks/stages",
        {
          method: stageEditing ? "PUT" : "POST",
          json: {
            ...stageForm,
            name: stageForm.name.trim() || stageForm.nameAr.trim(),
          },
        },
      );
      setStageEditing(null);
      setStageForm(newStage);
      toast("success", "تم حفظ المرحلة");
      await load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function reorder(index: number, direction: number) {
    const ordered = [...stages];
    [ordered[index], ordered[index + direction]] = [
      ordered[index + direction],
      ordered[index],
    ];
    setBusy(true);
    try {
      await clientApi("/tasks/stages/reorder", {
        method: "PUT",
        json: { ids: ordered.map((s) => s.id) },
      });
      await load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!deleting) return;
    setBusy(true);
    try {
      await clientApi(
        deleting.kind === "stage"
          ? `/tasks/stages/${deleting.id}`
          : `/tasks/${deleting.id}`,
        { method: "DELETE" },
      );
      setDeleting(null);
      setDetail(null);
      toast(
        "success",
        deleting.kind === "task" ? "تمت أرشفة التاسك" : "تم حذف المرحلة",
      );
      await load();
    } catch (e) {
      toast("error", (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const visible = (tasks ?? []).filter(
    (task) =>
      (filter === "archived" ? task.archived : !task.archived) &&
      (filter === "all" ||
        filter === "archived" ||
        (filter === "mine"
          ? task.assigneeId === user.id
          : task.assigneeId == null)) &&
      `${task.title} ${task.description}`
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="التاسكات"
        description="من الفكرة إلى الإنجاز. حدّد المسؤول، رتّب المراحل، وتابع النقاش في مكان واحد."
        actions={
          writable && (
            <>
              <button className={outline} onClick={() => setStageDialog(true)}>
                <Settings2 className="size-4" /> المراحل
              </button>
              <button
                className={button}
                disabled={!stages.length}
                onClick={() => edit("new")}
              >
                <Plus className="size-4" /> تاسك جديد
              </button>
            </>
          )
        }
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px]">
        <Input
          aria-label="البحث في التاسكات"
          placeholder="ابحث عن تاسك..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          aria-label="تصفية التاسكات"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">كل التاسكات</option>
          <option value="mine">التاسكات المسندة إليّ</option>
          <option value="unassigned">بدون مسؤول</option>
          <option value="archived">الأرشيف</option>
        </Select>
      </div>
      {error ? (
        <Card>
          <p role="alert" className="text-danger">
            {error}
          </p>
          <button className={`${outline} mt-4`} onClick={load}>
            إعادة المحاولة
          </button>
        </Card>
      ) : !tasks ? (
        <Spinner />
      ) : !stages.length ? (
        <Empty text="ابدأ بإضافة أول مرحلة للعمل من زر المراحل" />
      ) : (
        <div
          className="flex items-start gap-4 overflow-x-auto pb-6"
          role="region"
          aria-label="لوحة مراحل التاسكات"
          tabIndex={0}
        >
          {stages.map((stage) => {
            const items = visible
              .filter((t) => t.stageId === stage.id)
              .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
            return (
              <section
                key={stage.id}
                className="w-[290px] shrink-0 rounded-2xl border border-line bg-surface/70 p-3"
              >
                <header className="mb-4 flex items-center gap-2 px-1 pt-1">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h2 className="flex-1 text-sm font-bold">
                    {stageName(stage)}
                  </h2>
                  <span className="rounded-lg bg-white/5 px-2 py-1 text-xs text-muted">
                    {items.length}
                  </span>
                  {writable && (
                    <button
                      onClick={() => edit("new", stage.id)}
                      aria-label={`إضافة تاسك إلى ${stageName(stage)}`}
                      className="grid size-8 place-items-center rounded-lg hover:bg-white/5"
                    >
                      <Plus className="size-4" />
                    </button>
                  )}
                </header>
                <div className="space-y-3">
                  {items.map((task) => (
                    <article
                      key={task.id}
                      className="rounded-xl border border-line bg-bg p-4 transition-colors hover:border-brand/40"
                    >
                      <button
                        className="w-full text-start"
                        onClick={() => showTask(task)}
                      >
                        <span className="mb-2 block text-[11px] text-muted">
                          #{task.id}
                        </span>
                        <h3 className="text-sm font-semibold leading-6">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted">
                            {task.description}
                          </p>
                        )}
                      </button>
                      <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-xs text-muted">
                        <UserRound className="size-3.5" />
                        <span>
                          {task.assignee?.displayName ||
                            task.assignee?.username ||
                            people.find((p) => p.id === task.assigneeId)
                              ?.displayName ||
                            (task.assigneeId ? "حساب معطّل" : "بدون مسؤول")}
                        </span>
                      </div>
                      {writable && (
                        <Select
                          className="mt-3 py-1.5 text-xs"
                          disabled={busy}
                          aria-label={`نقل التاسك: ${task.title}`}
                          value={task.stageId}
                          onChange={(e) => move(task, Number(e.target.value))}
                        >
                          {stages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {stageName(s)}
                            </option>
                          ))}
                        </Select>
                      )}
                    </article>
                  ))}
                  {!items.length && (
                    <div className="grid min-h-32 place-items-center rounded-xl border border-dashed border-line text-xs text-muted">
                      <span className="flex items-center gap-2">
                        <ListChecks className="size-4" /> لا توجد تاسكات هنا
                      </span>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
      <Modal
        open={!!editing}
        title={editing === "new" ? "تاسك جديد" : "تعديل التاسك"}
        onClose={() => {
          if (!busy) setEditing(null);
        }}
        wide
      >
        <form onSubmit={saveTask} className="space-y-4">
          <Field label="عنوان التاسك">
            <Input
              required
              autoFocus
              maxLength={200}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>
          <Field label="الوصف ومعايير الإنجاز">
            <Textarea
              rows={5}
              maxLength={10000}
              placeholder="ما المطلوب؟ متى نعتبر التاسك منجزاً؟"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="المرحلة">
              <Select
                required
                value={form.stageId}
                onChange={(e) =>
                  setForm({ ...form, stageId: Number(e.target.value) })
                }
              >
                {stages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {stageName(s)}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="المسؤول">
              <Select
                value={form.assigneeId}
                onChange={(e) =>
                  setForm({ ...form, assigneeId: e.target.value })
                }
              >
                <option value="">بدون مسؤول</option>
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.displayName || p.username}
                    {p.id === user.id ? " (أنا)" : ""}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex justify-end border-t border-line pt-4">
            <button className={button} disabled={busy}>
              {busy && <Spinner />} حفظ التاسك
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={!!detail}
        title={detail?.title ?? "تفاصيل التاسك"}
        onClose={() => {
          if (!busy) setDetail(null);
        }}
        wide
      >
        {detail && (
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs text-brand-2">
                {stages.find((s) => s.id === detail.stageId) &&
                  stageName(stages.find((s) => s.id === detail.stageId)!)}
              </span>
              <span className="text-xs text-muted">
                المسؤول:{" "}
                {detail.assignee?.displayName ||
                  detail.assignee?.username ||
                  "بدون مسؤول"}
              </span>
              {writable && (
                <div className="ms-auto flex gap-2">
                  {detail.archived ? (
                    <button
                      className={outline}
                      disabled={busy}
                      onClick={async () => {
                        setBusy(true);
                        try {
                          await clientApi(`/tasks/${detail.id}`, {
                            method: "PATCH",
                            json: { archived: false },
                          });
                          setDetail(null);
                          toast("success", "تمت استعادة التاسك");
                          await load();
                        } catch (e) {
                          toast("error", (e as Error).message);
                        } finally {
                          setBusy(false);
                        }
                      }}
                    >
                      <ArchiveRestore className="size-4" /> استعادة
                    </button>
                  ) : (
                    <>
                      <button onClick={() => edit(detail)} className={outline}>
                        <Pencil className="size-4" /> تعديل
                      </button>
                      <button
                        className="grid size-10 place-items-center rounded-xl border border-line text-danger"
                        aria-label="أرشفة التاسك"
                        onClick={() =>
                          setDeleting({ kind: "task", id: detail.id })
                        }
                      >
                        <Archive className="size-4" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-8 text-muted">
              {detail.description || "لم يُضف وصف بعد."}
            </p>
            <div className="mt-6 border-t border-line pt-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <MessageSquare className="size-4 text-brand-2" /> التعليقات
                والمستجدات
              </h3>
              <div className="space-y-3">
                {detail.comments?.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-line p-4"
                  >
                    <div className="mb-2 flex flex-wrap justify-between gap-2 text-xs">
                      <span className="font-semibold">
                        {entry.author?.displayName ||
                          entry.author?.username ||
                          "حساب سابق"}
                      </span>
                      <time dateTime={entry.createdAt} className="text-muted">
                        {new Date(entry.createdAt).toLocaleString("ar-IQ")}
                      </time>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-7">
                      {entry.body}
                    </p>
                  </div>
                ))}
                {!detail.comments?.length && (
                  <p className="text-sm text-muted">
                    ابدأ بتحديث عن التقدم أو أضف مشكلة تحتاج مناقشة.
                  </p>
                )}
              </div>
              {writable && !detail.archived && (
                <form onSubmit={addComment} className="mt-5 space-y-3">
                  <Field label="تعليق جديد">
                    <Textarea
                      required
                      maxLength={10000}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="شارك تحديثاً، سؤالاً، أو عائقاً..."
                    />
                  </Field>
                  <button disabled={busy || !comment.trim()} className={button}>
                    {busy && <Spinner />} إضافة تعليق
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={stageDialog}
        title="مراحل العمل"
        onClose={() => {
          if (!busy) setStageDialog(false);
        }}
        wide
      >
        <p className="mb-5 text-sm leading-7 text-muted">
          خصّص المراحل حسب طريقة عمل الفريق. انقل التاسكات من المرحلة قبل حذفها.
        </p>
        <div className="mb-6 space-y-2">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="flex items-center gap-2 rounded-xl border border-line p-3"
            >
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              <span className="flex-1 text-sm font-semibold">
                {stageName(stage)}
              </span>
              <button
                disabled={busy || index === 0}
                aria-label={`تقديم ${stageName(stage)}`}
                onClick={() => reorder(index, -1)}
                className="p-2 disabled:opacity-20"
              >
                <ArrowUp className="size-4" />
              </button>
              <button
                disabled={busy || index === stages.length - 1}
                aria-label={`تأخير ${stageName(stage)}`}
                onClick={() => reorder(index, 1)}
                className="p-2 disabled:opacity-20"
              >
                <ArrowDown className="size-4" />
              </button>
              <button
                aria-label={`تعديل ${stageName(stage)}`}
                onClick={() => {
                  setStageEditing(stage.id);
                  setStageForm({
                    name: stage.name,
                    nameAr: stage.nameAr,
                    nameCkb: stage.nameCkb,
                    color: stage.color,
                  });
                }}
                className="p-2"
              >
                <Pencil className="size-4" />
              </button>
              <button
                disabled={busy}
                aria-label={`حذف ${stageName(stage)}`}
                className="p-2 text-danger"
                onClick={() => setDeleting({ kind: "stage", id: stage.id })}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={saveStage}
          className="space-y-4 border-t border-line pt-5"
        >
          <h3 className="font-semibold">
            {stageEditing ? "تعديل المرحلة" : "إضافة مرحلة"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="اسم المرحلة بالعربية">
              <Input
                required
                maxLength={80}
                value={stageForm.nameAr}
                onChange={(e) =>
                  setStageForm({ ...stageForm, nameAr: e.target.value })
                }
              />
            </Field>
            <Field label="اسم المرحلة بالإنكليزية (اختياري)">
              <Input
                lang="en"
                dir="ltr"
                maxLength={80}
                value={stageForm.name}
                onChange={(e) =>
                  setStageForm({ ...stageForm, name: e.target.value })
                }
              />
            </Field>
            <Field label="اسم المرحلة بالكوردية (اختياري)">
              <Input
                lang="ckb"
                maxLength={80}
                value={stageForm.nameCkb}
                onChange={(e) =>
                  setStageForm({ ...stageForm, nameCkb: e.target.value })
                }
              />
            </Field>
            <Field label="لون المرحلة">
              <Input
                type="color"
                className="h-11 p-1"
                value={stageForm.color}
                onChange={(e) =>
                  setStageForm({ ...stageForm, color: e.target.value })
                }
              />
            </Field>
          </div>
          <div className="flex gap-3">
            <button className={button} disabled={busy}>
              {busy && <Spinner />} حفظ المرحلة
            </button>
            {stageEditing && (
              <button
                type="button"
                className={outline}
                onClick={() => {
                  setStageEditing(null);
                  setStageForm(newStage);
                }}
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>
      </Modal>
      <Confirm
        open={!!deleting}
        title={deleting?.kind === "stage" ? "حذف المرحلة؟" : "أرشفة التاسك؟"}
        text={
          deleting?.kind === "stage"
            ? "يجب نقل جميع التاسكات إلى مرحلة أخرى أولاً."
            : "سيُنقل التاسك إلى الأرشيف مع حفظ جميع تعليقاته. يمكنك استعادته من فلتر الأرشيف."
        }
        confirmLabel={
          deleting?.kind === "task" ? "أرشفة التاسك" : "حذف المرحلة"
        }
        loading={busy}
        onConfirm={remove}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
