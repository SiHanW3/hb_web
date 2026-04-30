"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  createdAt: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/contact").then((r) => r.json()).then(setContacts);
  }, []);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink tracking-tight mb-8">
        Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <div className="bg-surface-card rounded-xl p-12 text-center text-muted text-sm">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-surface-card rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-ink">{c.name}</div>
                  <div className="text-xs text-muted">{c.email}{c.company && ` — ${c.company}`}</div>
                </div>
                <div className="text-xs text-muted-soft">
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-sm text-body leading-relaxed">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
