"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import Link from "next/link";
import { login } from "@/lib/admin-api";
import { setTokens } from "@/lib/admin-auth";
import { AdminAlert, AdminButton, AdminInput, AdminLabel } from "@/components/admin/ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/admin";
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const tokens = await login(username, password);
      setTokens(tokens);
      router.replace(next);
    } catch {
      setError("Invalid credentials or API unreachable. Is the Django server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[46%] overflow-hidden bg-tp-brown-deep lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,169,154,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(95,107,76,0.2),transparent_45%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-tp-warm-white">
          <div>
            <p className="font-accent text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-tp-rose-mist/80">
              The Pause Project
            </p>
            <h1 className="mt-8 max-w-sm font-display text-5xl leading-[1.05] tracking-tight">
              Quiet control for a loud city.
            </h1>
            <p className="mt-6 max-w-md font-general text-sm leading-relaxed text-tp-warm-white/70">
              Manage workshops, gallery, testimonials, and site copy from one
              warm studio desk—powered by Django REST Framework.
            </p>
          </div>
          <p className="font-general text-xs text-tp-warm-white/40">
            Mumbai · Creative pauses since 2026
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-tp-cream px-6 py-16">
        <div className="w-full max-w-md">
          <p className="font-accent text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-tp-olive lg:hidden">
            Admin sign in
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-tp-charcoal">
            Welcome back
          </h2>
          <p className="mt-2 font-general text-sm text-tp-stone">
            Use your Django staff credentials.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {error ? <AdminAlert>{error}</AdminAlert> : null}
            <div className="space-y-2">
              <AdminLabel htmlFor="username">Username</AdminLabel>
              <AdminInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <AdminLabel htmlFor="password">Password</AdminLabel>
              <AdminInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <AdminButton type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Enter studio"}
            </AdminButton>
          </form>

          <p className="mt-8 text-center font-general text-xs text-tp-stone">
            <Link href="/" className="underline-offset-4 hover:text-tp-charcoal hover:underline">
              ← Back to public site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tp-cream" />}>
      <LoginForm />
    </Suspense>
  );
}
