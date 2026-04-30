"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "RIGID_BOX",
    features: "",
    materials: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((r) => r.json())
      .then((product) => {
        const imgs = JSON.parse(product.images || "[]");
        const feats = JSON.parse(product.features || "[]");
        const mats = JSON.parse(product.materials || "[]");
        setImages(imgs);
        setForm({
          title: product.title,
          description: product.description,
          category: product.category,
          features: feats.join("\n"),
          materials: mats.join("\n"),
          featured: product.featured,
          order: product.order,
        });
      });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images,
        features: form.features
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        materials: form.materials
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    });
    if (res.ok) {
      router.push("/admin/products");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink tracking-tight mb-8">
        Edit Product
      </h1>
      <form onSubmit={handleSubmit} className="bg-surface-card rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full h-11 px-4 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full h-11 px-4 bg-canvas border border-hairline rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="RIGID_BOX">Rigid Box</option>
            <option value="BOOK_MANUAL">Book &amp; Manual</option>
            <option value="LABEL">Label</option>
          </select>
        </div>

        <ImageUploader images={images} onChange={setImages} />

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Features <span className="text-muted font-normal">(one per line)</span>
          </label>
          <textarea
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            rows={4}
            placeholder={"Magnetic closure\nVelvet insert lining\nHot foil stamping"}
            className="w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Materials <span className="text-muted font-normal">(one per line)</span>
          </label>
          <textarea
            value={form.materials}
            onChange={(e) => setForm({ ...form, materials: e.target.value })}
            rows={3}
            placeholder={"2mm greyboard\nArt paper wrap\nVelvet flocking"}
            className="w-full px-4 py-3 bg-canvas border border-hairline rounded-lg text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="featured" className="text-sm text-ink">Featured</label>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-ink">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              className="w-20 h-9 px-3 bg-canvas border border-hairline rounded-lg text-sm text-ink"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="h-11 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-11 px-6 bg-canvas text-ink text-sm font-medium rounded-lg border border-hairline hover:bg-surface-soft transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
