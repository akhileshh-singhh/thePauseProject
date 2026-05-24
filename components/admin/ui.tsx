"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

export function AdminLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-accent text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-tp-stone"
    >
      {children}
    </label>
  );
}

export function AdminInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-tp-charcoal/10 bg-tp-warm-white/90 px-4 py-2.5 font-general text-sm text-tp-charcoal outline-none transition placeholder:text-tp-stone/60 focus:border-tp-olive/50 focus:ring-2 focus:ring-tp-olive/15",
        className
      )}
      {...props}
    />
  );
}

export function AdminTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full resize-y rounded-xl border border-tp-charcoal/10 bg-tp-warm-white/90 px-4 py-2.5 font-general text-sm leading-relaxed text-tp-charcoal outline-none transition placeholder:text-tp-stone/60 focus:border-tp-olive/50 focus:ring-2 focus:ring-tp-olive/15",
        className
      )}
      {...props}
    />
  );
}

export function AdminSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-tp-charcoal/10 bg-tp-warm-white/90 px-4 py-2.5 font-general text-sm text-tp-charcoal outline-none transition focus:border-tp-olive/50 focus:ring-2 focus:ring-tp-olive/15",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-tp-olive text-tp-warm-white hover:bg-tp-olive-muted",
        variant === "secondary" &&
          "border border-tp-charcoal/15 bg-tp-warm-white text-tp-charcoal hover:border-tp-olive/40",
        variant === "ghost" &&
          "text-tp-stone hover:bg-tp-charcoal/5 hover:text-tp-charcoal",
        variant === "danger" &&
          "bg-red-900/90 text-tp-warm-white hover:bg-red-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminLinkButton({
  href,
  children,
  variant = "secondary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-accent text-xs font-semibold uppercase tracking-[0.16em] transition",
        variant === "primary" &&
          "bg-tp-olive text-tp-warm-white hover:bg-tp-olive-muted",
        variant === "secondary" &&
          "border border-tp-charcoal/15 bg-tp-warm-white text-tp-charcoal hover:border-tp-olive/40",
        variant === "ghost" &&
          "text-tp-stone hover:bg-tp-charcoal/5 hover:text-tp-charcoal"
      )}
    >
      {children}
    </Link>
  );
}

export function AdminBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 font-accent text-[0.6rem] font-semibold uppercase tracking-[0.14em]",
        tone === "neutral" && "bg-tp-charcoal/8 text-tp-charcoal",
        tone === "success" && "bg-tp-olive/15 text-tp-olive",
        tone === "warning" && "bg-amber-100 text-amber-900",
        tone === "muted" && "bg-tp-sand/50 text-tp-stone"
      )}
    >
      {children}
    </span>
  );
}

export function AdminCard({
  children,
  className,
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-tp-charcoal/8 bg-tp-warm-white/75 shadow-[0_20px_60px_-40px_rgba(42,40,36,0.35)] backdrop-blur-sm",
        padding && "p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="font-accent text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-tp-olive">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl tracking-tight text-tp-charcoal sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl font-general text-sm leading-relaxed text-tp-stone">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-tp-charcoal/12 bg-tp-cream/50 px-8 py-16 text-center">
      <p className="font-display text-xl text-tp-charcoal">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm font-general text-sm text-tp-stone">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function AdminSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-tp-olive/20 border-t-tp-olive"
        aria-label="Loading"
      />
    </div>
  );
}

export function AdminAlert({
  children,
  tone = "error",
  className,
}: {
  children: React.ReactNode;
  tone?: "error" | "success";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-3 font-general text-sm",
        className,
        tone === "error" && "border border-red-200 bg-red-50 text-red-900",
        tone === "success" && "border border-tp-olive/20 bg-tp-olive/10 text-tp-olive"
      )}
    >
      {children}
    </div>
  );
}
