"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  order: number;
}

const categoryLabels: Record<string, string> = {
  RIGID_BOX: "Rigid Box",
  BOOK_MANUAL: "Book & Manual",
  LABEL: "Label",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`/api/products${filter ? `?category=${filter}` : ""}`)
      .then((r) => r.json())
      .then(setProducts);
  }, [filter]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink tracking-tight">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 h-11 px-5 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {["", "RIGID_BOX", "BOOK_MANUAL", "LABEL"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === cat
                ? "bg-primary text-on-primary"
                : "bg-surface-card text-muted hover:text-ink"
            }`}
          >
            {cat ? categoryLabels[cat] : "All"}
          </button>
        ))}
      </div>

      <div className="bg-surface-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hairline">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                Title
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                Category
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                Featured
              </th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted py-12 text-sm">
                  No products found. Add your first product to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-hairline last:border-0">
                  <td className="px-6 py-4 text-sm text-ink font-medium">{product.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-surface-cream-strong text-muted px-3 py-1 rounded-full">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {product.featured ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-muted hover:text-ink transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-muted hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
