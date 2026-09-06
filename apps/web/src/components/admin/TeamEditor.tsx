"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { TeamMember } from "@/lib/types";
import { Card, Field, ImageUploader, Input } from "./ui";

const languages = [
  {
    lang: "ar",
    label: "العربية",
    dir: "rtl",
    name: "nameAr",
    role: "role",
    focus: "focus",
  },
  {
    lang: "en",
    label: "الإنجليزية",
    dir: "ltr",
    name: "nameEn",
    role: "roleEn",
    focus: "focusEn",
  },
  {
    lang: "ckb",
    label: "الكوردية (سوراني)",
    dir: "rtl",
    name: "nameCkb",
    role: "roleCkb",
    focus: "focusCkb",
  },
] as const;
const buttonCls =
  "inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-line px-3 text-xs text-muted hover:border-brand/50 hover:text-fg disabled:opacity-40";
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
  function move(index: number, delta: number) {
    const next = [...value];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  }
  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bold">المؤسسون والفريق</h2>
          <p className="mt-1 text-xs text-muted">
            الصور والأسماء والمناصب والتخصصات بثلاث لغات. تُحفظ مع إعدادات
            الموقع.
          </p>
        </div>
        <button
          type="button"
          className={buttonCls}
          onClick={() =>
            onChange([
              ...value,
              {
                id: crypto.randomUUID(),
                name: "",
                nameAr: "",
                nameEn: "",
                nameCkb: "",
                photo: "",
                github: "",
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
          إضافة عضو
        </button>
      </div>
      {!value.length && (
        <p className="rounded-xl border border-dashed border-line p-6 text-sm text-muted">
          لا يوجد أعضاء في الفريق. أضف عضواً وصورته وترجماته.
        </p>
      )}
      {value.map((member, index) => (
        <section
          key={member.id}
          className="space-y-5 rounded-xl border border-line p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold">
              العضو {index + 1}
              {member.nameAr ? ` — ${member.nameAr}` : ""}
            </h3>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                className={buttonCls}
                aria-label={`تحريك العضو ${index + 1} للأعلى`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                <ArrowUp className="size-4" />
              </button>
              <button
                type="button"
                className={buttonCls}
                aria-label={`تحريك العضو ${index + 1} للأسفل`}
                disabled={index === value.length - 1}
                onClick={() => move(index, 1)}
              >
                <ArrowDown className="size-4" />
              </button>
              <button
                type="button"
                className={buttonCls}
                aria-label={`حذف العضو ${index + 1}`}
                onClick={() =>
                  onChange(value.filter((m) => m.id !== member.id))
                }
              >
                <Trash2 className="size-4 text-danger" />
                حذف
              </button>
            </div>
          </div>
          <div className="grid items-start gap-5 sm:grid-cols-[160px_minmax(0,1fr)]">
            <ImageUploader
              label={`صورة العضو ${index + 1}`}
              aspect="aspect-[4/5]"
              value={member.photo}
              onChange={(photo) => update(member.id, { photo })}
            />
            <Field
              label="حساب GitHub"
              hint="رابط حساب العضو، ويُترك فارغاً إذا لا يوجد حساب."
            >
              <Input
                lang="en"
                dir="ltr"
                type="url"
                value={member.github ?? ""}
                placeholder="https://github.com/username"
                onChange={(e) => update(member.id, { github: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid gap-4 2xl:grid-cols-3">
            {languages.map((l) => (
              <fieldset
                key={l.lang}
                className="space-y-3 rounded-xl border border-line p-4"
              >
                <legend className="px-2 text-sm font-bold">{l.label}</legend>
                <Field label={`الاسم — ${l.label}`}>
                  <Input
                    lang={l.lang}
                    dir={l.dir}
                    value={
                      member[l.name] ?? (l.lang === "en" ? member.name : "")
                    }
                    onChange={(e) =>
                      update(member.id, {
                        [l.name]: e.target.value,
                        ...(l.lang === "en" ? { name: e.target.value } : {}),
                      })
                    }
                  />
                </Field>
                <Field label={`المنصب — ${l.label}`}>
                  <Input
                    lang={l.lang}
                    dir={l.dir}
                    value={member[l.role] ?? ""}
                    onChange={(e) =>
                      update(member.id, { [l.role]: e.target.value })
                    }
                  />
                </Field>
                <Field label={`التخصص — ${l.label}`}>
                  <Input
                    lang={l.lang}
                    dir={l.dir}
                    value={member[l.focus] ?? ""}
                    onChange={(e) =>
                      update(member.id, { [l.focus]: e.target.value })
                    }
                  />
                </Field>
              </fieldset>
            ))}
          </div>
        </section>
      ))}
    </Card>
  );
}
