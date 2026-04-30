import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas flex">
      <aside className="w-64 bg-surface-dark text-on-dark flex flex-col shrink-0">
        <div className="p-6 border-b border-surface-dark-elevated">
          <Link href="/admin" className="font-[family-name:var(--font-display)] text-xl text-on-dark tracking-tight">
            HuiBao Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/admin" label="Dashboard" />
          <NavLink href="/admin/products" label="Products" />
          <NavLink href="/admin/team" label="Team Members" />
          <NavLink href="/admin/contacts" label="Contact Messages" />
        </nav>
        <div className="p-4 border-t border-surface-dark-elevated">
          <Link href="/" className="text-sm text-on-dark-soft hover:text-on-dark transition-colors">
            &larr; View Website
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2.5 text-sm text-on-dark-soft hover:text-on-dark hover:bg-surface-dark-elevated rounded-lg transition-colors"
    >
      {label}
    </Link>
  );
}
