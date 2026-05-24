"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/admin-auth";
import { AdminSpinner } from "@/components/admin/ui";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname ?? "/admin")}`);
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return <AdminSpinner />;
  return <>{children}</>;
}
