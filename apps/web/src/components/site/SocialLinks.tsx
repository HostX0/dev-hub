import { Globe } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { getDict, type Locale } from "@/i18n";
import { normalizeSocialLinks } from "@/lib/business";
import type { SiteSettings } from "@/lib/types";

type IconProps = React.SVGProps<SVGSVGElement>;
const FacebookIcon = (props: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.5 22v-8.7h2.9l.4-3.4h-3.3V7.7c0-1 .3-1.7 1.7-1.7H17V3a22 22 0 0 0-2.6-.1c-2.6 0-4.4 1.6-4.4 4.5v2.5H7v3.4h3V22z" /></svg>;
const YoutubeIcon = (props: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.7 15.3V8.7l5.8 3.3-5.8 3.3Z" /></svg>;
const TiktokIcon = (props: IconProps) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M16.6 2c.4 2.1 1.7 3.5 4 3.8v3.4a9 9 0 0 1-4-1.2v7.4a6.4 6.4 0 1 1-5.6-6.3v3.5a3 3 0 1 0 2.2 2.8V2h3.4Z" /></svg>;
const platforms = {
  github: { label: "GitHub", icon: GithubIcon },
  linkedin: { label: "LinkedIn", icon: LinkedinIcon },
  facebook: { label: "Facebook", icon: FacebookIcon },
  instagram: { label: "Instagram", icon: InstagramIcon },
  twitter: { label: "X", icon: XIcon },
  youtube: { label: "YouTube", icon: YoutubeIcon },
  tiktok: { label: "TikTok", icon: TiktokIcon },
};

export function SocialLinks({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const t = getDict(locale);
  return normalizeSocialLinks(settings).map((link) => {
    const platform = platforms[link.platform as keyof typeof platforms];
    const Icon = platform?.icon ?? Globe;
    // A custom label has no language metadata; use a localized accessible name.
    const label = platform?.label ?? t.brand.socialLink;
    return <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-fg hover:shadow-glow"><Icon aria-hidden="true" className="size-4" /></a>;
  });
}
