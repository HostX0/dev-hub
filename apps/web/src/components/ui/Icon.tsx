import {
  BarChart3,
  Bot,
  Cloud,
  Code2,
  Database,
  Globe,
  LayoutDashboard,
  Palette,
  Rocket,
  Server,
  Shield,
  ShoppingBag,
  Smartphone,
  Workflow,
  Zap,
  type LucideProps,
} from "lucide-react";

export const ICONS = {
  Globe,
  Smartphone,
  ShoppingBag,
  LayoutDashboard,
  Palette,
  Server,
  Code2,
  Database,
  Cloud,
  Shield,
  Zap,
  Bot,
  BarChart3,
  Workflow,
  Rocket,
} as const;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Comp = ICONS[name as IconName] ?? Code2;
  return <Comp {...props} />;
}
