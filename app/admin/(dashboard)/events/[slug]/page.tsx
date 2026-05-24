"use client";

import { use } from "react";
import { AdminLinkButton, AdminPageHeader } from "@/components/admin/ui";
import { EventForm } from "@/components/admin/EventForm";

export default function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <>
      <AdminPageHeader
        eyebrow="Edit workshop"
        title={slug}
        actions={<AdminLinkButton href="/admin/events">← All events</AdminLinkButton>}
      />
      <EventForm slug={slug} />
    </>
  );
}
