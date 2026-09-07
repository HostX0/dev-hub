import Image from "next/image";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { getDict } from "@/i18n";
import { safeSocialUrl } from "@/lib/business";
import type { Locale } from "@/i18n/config";
import { teamCopy } from "@/i18n/team";
import type { TeamMember } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
export function Founders({
  team,
  locale,
}: {
  team: TeamMember[];
  locale: Locale;
}) {
  if (!team.length) return null;
  const t = teamCopy[locale];
  const brand = getDict(locale).brand;
  return (
    <section
      id="team"
      className="surface-light section-pad border-b border-line"
    >
      <div className="container-x grid items-start gap-10 lg:grid-cols-[.75fr_1.5fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">
            <span className="size-1.5 bg-brand" />
            {t.eyebrow}
          </p>
          <h2 className="mt-6 text-3xl font-bold leading-[1.25] tracking-tight md:text-4xl">
            {t.headingLead}
            <br />
            <span className="text-brand-2">{t.headingAccent}</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-[1.85] text-muted">
            {t.body}
          </p>
        </Reveal>
        <div className="grid gap-7 sm:grid-cols-2">
          {team
            .filter((member) => member.name.trim())
            .map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#E2E6F0]">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 28vw"
                        className="object-cover object-top transition-transform duration-700 hover:scale-[1.025]"
                        unoptimized={!member.photo.startsWith("/brand/")}
                      />
                    ) : (
                      <div className="grid size-full place-items-center text-muted">
                        {member.name}
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <h3
                      lang={locale}
                      dir={locale === "en" ? "ltr" : "rtl"}
                      className="text-start text-xl font-bold tracking-tight"
                    >
                      {member.name}
                    </h3>
                    {member.role && <p className="mt-2 text-sm font-semibold leading-relaxed text-brand-2">
                      {member.role}
                    </p>}
                    {member.focus && <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-muted">
                      {member.focus}
                    </p>}
                    {safeSocialUrl(member.github) && <a href={safeSocialUrl(member.github)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-2 hover:underline" aria-label={`${brand.githubProfile}: ${member.name}`}><GithubIcon className="size-4" aria-hidden="true" />{brand.githubProfile}</a>}
                  </div>
                </article>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
