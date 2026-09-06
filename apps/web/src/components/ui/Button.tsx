import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 brand-button font-semibold transition-[transform,background-color,border-color,box-shadow] duration-300 select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60";
const variants: Record<Variant, string> = {
  primary: "bg-[#5B5EE8] text-white hover:bg-[#4F46E5] hover:-translate-y-0.5",
  secondary:
    "border border-line-2 bg-transparent text-fg hover:border-brand hover:-translate-y-0.5",
  ghost: "text-muted hover:text-fg hover:bg-white/5",
  danger: "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
