import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 tp-focus-ring";

const variants = {
  primary:
    "bg-tp-charcoal text-tp-warm-white shadow-[0_8px_30px_rgba(42,40,36,0.12)] hover:bg-tp-brown-deep hover:shadow-[0_12px_40px_rgba(42,40,36,0.18)]",
  ghost:
    "border border-tp-charcoal/15 bg-tp-warm-white/60 text-tp-charcoal backdrop-blur-sm hover:border-tp-olive/40 hover:bg-tp-warm-white",
  outline:
    "border border-tp-charcoal/25 bg-transparent text-tp-charcoal hover:border-tp-charcoal hover:bg-tp-warm-white/50",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<"button">, "className">;

export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], "font-accent", className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
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
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
