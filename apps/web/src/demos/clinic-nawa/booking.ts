import type { FormField } from "@/demos/shared/DemoForm";
import type { ClinicContent } from "./content";

/** Keep the demonstration free of symptom/history fields and live appointment slots. */
export function clinicBookingFields(content: ClinicContent): FormField[] {
  const t = content.booking.fields;
  return [
    { name: "name", label: t.name, placeholder: t.namePlaceholder, half: true },
    {
      name: "email",
      label: t.email,
      type: "email",
      placeholder: t.emailPlaceholder,
      half: true,
    },
    {
      name: "care",
      label: t.care,
      type: "select",
      placeholder: t.carePlaceholder,
      options: content.care.items.map((item) => item.title),
    },
    {
      name: "timePreference",
      label: t.time,
      type: "select",
      placeholder: t.timePlaceholder,
      options: t.timeOptions,
    },
  ];
}
