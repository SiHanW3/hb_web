"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  order: number;
}

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", bio: "", order: 0 });

  useEffect(() => {
    fetch("/api/team").then((r) => r.json()).then(setMembers);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const member = await res.json();
      setMembers([...members, member]);
      setForm({ name: "", role: "", bio: "", order: 0 });
      setShowForm(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    setMembers(members.filter((m) => m.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink tracking-tight">
          Team Members
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 h-11 px-5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-surface-card rounded-xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11 px-4 bg-canvas border border-hairline rounded-lg text-sm"
              required
            />
            <input
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="h-11 px-4 bg-canvas border border-hairline rounded-lg text-sm"
              required
            />
          </div>
          <textarea
            placeholder="Bio (optional)"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-sm resize-none"
            rows={2}
          />
          <button
            type="submit"
            className="h-10 px-5 bg-primary text-on-primary text-sm font-medium rounded-lg"
          >
            Add
          </button>
        </form>
      )}

      <div className="bg-surface-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hairline">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Name</th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Role</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted py-12 text-sm">No team members yet.</td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className="border-b border-hairline last:border-0">
                  <td className="px-6 py-4 text-sm text-ink font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{m.role}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(m.id)} className="p-2 text-muted hover:text-error transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
