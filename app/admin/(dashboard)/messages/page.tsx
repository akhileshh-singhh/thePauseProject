"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/admin-auth";
import { fetchMessages, markMessageRead, type AdminMessage } from "@/lib/admin-api";
import {
  AdminAlert,
  AdminBadge,
  AdminButton,
  AdminEmpty,
  AdminPageHeader,
  AdminSpinner,
} from "@/components/admin/ui";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetchMessages(token)
      .then(setMessages)
      .catch(() => setError("Failed to load messages."))
      .finally(() => setLoading(false));
  }, []);

  async function handleMarkRead(id: number) {
    const token = getAccessToken();
    if (!token) return;
    try {
      const updated = await markMessageRead(token, id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch {
      setError("Could not update message.");
    }
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description={
          unread
            ? `${unread} unread message${unread === 1 ? "" : "s"} waiting.`
            : "All messages have been read."
        }
      />

      {error ? <AdminAlert className="mb-6">{error}</AdminAlert> : null}
      {loading ? <AdminSpinner /> : null}

      {!loading && messages.length === 0 ? (
        <AdminEmpty
          title="Inbox is empty"
          description="Submissions from the contact form will appear here."
        />
      ) : null}

      <div className="space-y-4">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className="rounded-3xl border border-tp-charcoal/8 bg-tp-warm-white/80 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl text-tp-charcoal">{msg.name}</h2>
                  {!msg.is_read ? <AdminBadge tone="warning">New</AdminBadge> : null}
                </div>
                <p className="mt-1 font-general text-sm text-tp-stone">
                  <a href={`mailto:${msg.email}`} className="hover:text-tp-charcoal">
                    {msg.email}
                  </a>
                  {" · "}
                  {formatDate(msg.created_at)}
                </p>
              </div>
              {!msg.is_read ? (
                <AdminButton variant="secondary" onClick={() => handleMarkRead(msg.id)}>
                  Mark read
                </AdminButton>
              ) : null}
            </div>
            <p className="mt-4 whitespace-pre-wrap font-general text-sm leading-relaxed text-tp-charcoal/90">
              {msg.message}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
