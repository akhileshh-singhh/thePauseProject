"use client";

import { AdminLinkButton, AdminPageHeader } from "@/components/admin/ui";
import { EventForm } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="New workshop"
        title="Create event"
        description="Add a gathering—slug auto-generates from the title."
        actions={<AdminLinkButton href="/admin/events">← All events</AdminLinkButton>}
      />
      <EventForm />
    </>
  );
}
