import { test } from "node:test";
import assert from "node:assert/strict";
import { clinicContent } from "./content.ts";
import { clinicBookingFields } from "./booking.ts";

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, shape(nested)]),
    );
  return typeof value;
}
function strings(value) {
  if (typeof value === "string") return [value];
  return Object.values(value).flatMap(strings);
}

test("clinic visitors receive complete native-language care and booking content", () => {
  assert.deepEqual(shape(clinicContent.ar), shape(clinicContent.en));
  for (const lang of ["ar", "en"]) {
    const t = clinicContent[lang];
    assert(strings(t).every((value) => value.trim().length > 0));
    assert.equal(
      new Set(t.care.items.map((item) => item.id)).size,
      t.care.items.length,
    );
    assert.deepEqual(
      t.care.items.map((item) => item.id),
      clinicContent.en.care.items.map((item) => item.id),
    );
    if (lang === "ar") {
      for (const section of [t.hero, t.booking, t.faq, t.contact]) {
        const copy = strings(section);
        assert(
          copy.filter((text) => /[\u0600-\u06FF]/.test(text)).length /
            copy.length >
            0.75,
          "critical Arabic journeys must not fall back to English",
        );
      }
    }
  }
});

test("booking offers every localized care area without collecting medical details or promising live slots", () => {
  for (const lang of ["ar", "en"]) {
    const t = clinicContent[lang];
    const fields = clinicBookingFields(t);
    assert.deepEqual(
      fields.map((field) => field.name),
      ["name", "email", "care", "timePreference"],
    );
    assert.equal(
      fields.find((field) => field.name === "email").type,
      "email",
      "native email validation must remain enabled",
    );
    assert.deepEqual(
      fields.find((field) => field.name === "care").options,
      t.care.items.map((item) => item.title),
    );
    assert.equal(
      fields.find((field) => field.name === "timePreference").type,
      "select",
    );
    assert(
      fields.every(
        (field) => !["textarea", "date", "time"].includes(field.type),
      ),
      "the demo should not collect health history or advertise actual availability",
    );
    assert(
      t.booking.privacy && t.booking.note && t.booking.success.text,
      "both form and completion must disclose demo behavior",
    );
  }
});
