import { AdminCard } from "@/components/admin/ui";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <AdminCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tp-olive/8 blur-2xl" />
      <p className="font-accent text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-tp-stone">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl tracking-tight text-tp-charcoal">{value}</p>
      {hint ? (
        <p className="mt-2 font-general text-xs text-tp-stone">{hint}</p>
      ) : null}
    </AdminCard>
  );
}
