"use client";
import { Plus, Trash2 } from "lucide-react";
import type { TeamMember } from "@/lib/types";
import { Card, Field, ImageUploader, Input } from "./ui";
export function TeamEditor({
  value,
  onChange,
}: {
  value: TeamMember[];
  onChange: (team: TeamMember[]) => void;
}) {
  const update = (id: string, patch: Partial<TeamMember>) =>
    onChange(
      value.map((member) =>
        member.id === id ? { ...member, ...patch } : member,
      ),
    );
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-bold">المؤسسون والفريق</h2>
          <p className="mt-1 text-xs text-muted">
            الصور والمناصب والتخصصات في قسم الفريق.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-10 shrink-0 items-center gap-1 text-xs text-brand-2"
          onClick={() =>
            onChange([
              ...value,
              {
                id: crypto.randomUUID(),
                name: "",
                photo: "",
                role: "",
                roleEn: "",
                roleCkb: "",
                focus: "",
                focusEn: "",
                focusCkb: "",
              },
            ])
          }
        >
          <Plus className="size-4" />
          إضافة
        </button>
      </div>
      {value.map((member) => (
        <div
          key={member.id}
          className="space-y-5 rounded-xl border border-line p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 lang="en" dir="ltr" className="font-semibold">
              {member.name || "New team member"}
            </h3>
            <button
              type="button"
              onClick={() => onChange(value.filter((m) => m.id !== member.id))}
              className="inline-flex min-h-10 items-center gap-1 text-xs text-muted hover:text-danger"
            >
              <Trash2 className="size-3.5" />
              حذف
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
            <ImageUploader
              label="الصورة الشخصية"
              aspect="aspect-[4/5]"
              value={member.photo}
              onChange={(photo) => update(member.id, { photo })}
            />
            <Field label="الاسم كما سيظهر">
              <Input
                lang="en"
                dir="ltr"
                value={member.name}
                onChange={(e) => update(member.id, { name: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-bold">العربية</p>
              <Field label="المنصب">
                <Input
                  value={member.role}
                  onChange={(e) => update(member.id, { role: e.target.value })}
                />
              </Field>
              <Field label="التخصص">
                <Input
                  value={member.focus}
                  onChange={(e) => update(member.id, { focus: e.target.value })}
                />
              </Field>
            </div>
            <div lang="en" dir="ltr" className="space-y-3">
              <p className="text-sm font-bold">English</p>
              <Field label="Role">
                <Input
                  value={member.roleEn}
                  onChange={(e) =>
                    update(member.id, { roleEn: e.target.value })
                  }
                />
              </Field>
              <Field label="Specialty">
                <Input
                  value={member.focusEn}
                  onChange={(e) =>
                    update(member.id, { focusEn: e.target.value })
                  }
                />
              </Field>
            </div>
            <div lang="ckb" dir="rtl" className="space-y-3 xl:col-span-2">
              <p className="text-sm font-bold">کوردی</p>
              <Field label="پۆست">
                <Input
                  value={member.roleCkb ?? ""}
                  onChange={(e) =>
                    update(member.id, { roleCkb: e.target.value })
                  }
                />
              </Field>
              <Field label="پسپۆڕی">
                <Input
                  value={member.focusCkb ?? ""}
                  onChange={(e) =>
                    update(member.id, { focusCkb: e.target.value })
                  }
                />
              </Field>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
