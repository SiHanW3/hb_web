import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const [productCount, teamCount, contactCount] = await Promise.all([
    prisma.product.count(),
    prisma.teamMember.count(),
    prisma.contactSubmission.count(),
  ]);

  const stats = [
    { label: "Products", count: productCount, href: "/admin/products" },
    { label: "Team Members", count: teamCount, href: "/admin/team" },
    { label: "Contact Messages", count: contactCount, href: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink tracking-tight mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-surface-card rounded-xl p-6 hover:bg-surface-cream-strong transition-colors"
          >
            <div className="font-[family-name:var(--font-display)] text-4xl text-ink tracking-tight">
              {stat.count}
            </div>
            <div className="text-sm text-muted mt-2">{stat.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
