import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { toast } from "@/components/ui/sonner";
import productAbaya1 from "@/assets/product-abaya-1.jpg";
import productAbaya2 from "@/assets/product-abaya-2.jpg";
import productAbaya3 from "@/assets/product-abaya-3.jpg";
import productAbaya4 from "@/assets/product-abaya-4.jpg";
import productDress1 from "@/assets/product-dress-1.jpg";
import productDress2 from "@/assets/product-dress-2.jpg";
import productOccasion1 from "@/assets/product-occasion-1.jpg";
import productOccasion2 from "@/assets/product-occasion-2.jpg";
import productJilbab1 from "@/assets/product-jilbab-1.jpg";
import productJilbab2 from "@/assets/product-jilbab-2.jpg";
import productKhimar1 from "@/assets/product-khimar-1.jpg";
import productKhimar2 from "@/assets/product-khimar-2.jpg";
import productHijab1 from "@/assets/product-hijab-1.jpg";
import collectionHijabs from "@/assets/collection-hijabs.jpg";
import genericProduct1 from "@/assets/product-1.jpg";
import genericProduct2 from "@/assets/product-2.jpg";
import genericProduct3 from "@/assets/product-3.jpg";
import genericProduct4 from "@/assets/product-4.jpg";
import genericProduct5 from "@/assets/product-5.jpg";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  stock?: number;
};

const API = "http://localhost:5000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: "",
    imageUrl: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        console.log("API PRODUCTS:", data);
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const resetForm = () =>
    setForm({
      name: "",
      price: 0,
      category: "",
      imageUrl: "",
      stock: 0,
    });

  const imagePreview = useMemo(() => form.imageUrl, [form.imageUrl]);
  const imageMap: Record<string, string> = {
    "/assets/product-abaya-1.jpg": productAbaya1,
    "/assets/product-abaya-2.jpg": productAbaya2,
    "/assets/product-abaya-3.jpg": productAbaya3,
    "/assets/product-abaya-4.jpg": productAbaya4,
    "/assets/product-dress-1.jpg": productDress1,
    "/assets/product-dress-2.jpg": productDress2,
    "/assets/product-occasion-1.jpg": productOccasion1,
    "/assets/product-occasion-2.jpg": productOccasion2,
    "/assets/product-jilbab-1.jpg": productJilbab1,
    "/assets/product-jilbab-2.jpg": productJilbab2,
    "/assets/product-khimar-1.jpg": productKhimar1,
    "/assets/product-khimar-2.jpg": productKhimar2,
    "/assets/product-hijab-1.jpg": productHijab1,
    "/assets/collection-hijabs.jpg": collectionHijabs,
    "/assets/product-1.jpg": genericProduct1,
    "/assets/product-2.jpg": genericProduct2,
    "/assets/product-3.jpg": genericProduct3,
    "/assets/product-4.jpg": genericProduct4,
    "/assets/product-5.jpg": genericProduct5,
  };
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, imageUrl: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.imageUrl || form.price <= 0) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      if (editing) {
        await fetch(`${API}/${editing.id}`, { method: "DELETE" });
      }
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing?.id }),
      });
      const created = await res.json();
      if (!res.ok) {
        toast.error(created?.error || "Failed to save product");
        return;
      }
      setProducts((prev) => (editing ? [created, ...prev.filter((p) => p.id !== editing.id)] : [created, ...prev]));
      toast.success(editing ? "Product updated" : "Product added");
      setEditing(null);
      resetForm();
    } catch {
      toast.error("Network error");
    }
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, category: p.category, imageUrl: p.imageUrl, stock: p.stock ?? 0 });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl mb-6">Products</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-brand-cream border border-border/50 p-6">
          <div className="font-body uppercase tracking-wide text-sm mb-4">
            {editing ? "Edit Product" : "Add Product"}
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                className="w-full border border-border px-3 py-2"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Price (₹)</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-border px-3 py-2"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value || 0) }))}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <input
                  className="w-full border border-border px-3 py-2"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Stock</label>
                <input
                  type="number"
                  min={0}
                  className="w-full border border-border px-3 py-2"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value || 0) }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input
                className="w-full border border-border px-3 py-2"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder="/assets/product-abaya-1.jpg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileSelect}
                className="w-full border border-border px-3 py-2"
              />
            </div>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imageMap[imagePreview] ?? imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover border border-border"
                />
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-brand-charcoal text-brand-ivory uppercase text-sm tracking-wide"
              >
                {editing ? "Update" : "Add"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-brand-charcoal text-brand-charcoal uppercase text-sm tracking-wide"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="lg:col-span-2 bg-brand-cream border border-border/50 p-6">
          <div className="font-body uppercase tracking-wide text-sm mb-4">Product List</div>
          {loading ? (
            <div className="text-sm text-brand-warm-gray">Loading…</div>
          ) : products.length === 0 ? (
            <div className="text-sm text-brand-warm-gray">No products yet. Add your first product.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left">
                  <tr className="border-b border-border/50">
                    <th className="py-2 pr-4">Image</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Stock</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border/30">
                      <td className="py-2 pr-4">
                        <img
                          src={imageMap[p.imageUrl] ?? p.imageUrl}
                          alt={p.name}
                          className="w-16 h-16 object-cover border border-border"
                        />
                      </td>
                      <td className="py-2 pr-4">{p.name}</td>
                      <td className="py-2 pr-4">₹{p.price.toLocaleString("en-IN")}</td>
                      <td className="py-2 pr-4">{p.category}</td>
                      <td className="py-2 pr-4">{p.stock ?? 0}</td>
                      <td className="py-2 pr-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(p)}
                            className="px-3 py-1 border border-brand-charcoal text-brand-charcoal uppercase text-xs tracking-wide"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => remove(p.id)}
                            className="px-3 py-1 bg-brand-charcoal text-brand-ivory uppercase text-xs tracking-wide"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
