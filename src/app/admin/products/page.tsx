"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import { Trash2, Pencil, Plus } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  // ➕ ADD PRODUCT
  const handleAdd = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
    };

    setProducts((prev) => [newProduct, ...prev]);
    resetForm();
  };

  // ✏️ EDIT PRODUCT
  const handleEdit = () => {
    if (!editProduct) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editProduct.id
          ? { ...p, ...form, price: Number(form.price) }
          : p,
      ),
    );

    resetForm();
  };

  // ❌ DELETE PRODUCT
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setForm({ title: "", price: "", category: "" });
    setEditProduct(null);
    setShowModal(false);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category || "",
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Products Dashboard
          </h1>
          <p className="text-gray-400 text-sm">Manage your SaaS products</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600  text-white dark:text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* TABLE / GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-800"
          >
            <h3 className="font-bold text-lg text-black dark:text-white">
              {p.title}
            </h3>

            <p className="text-blue-500 font-bold mt-2">${p.price}</p>

            <p className="text-xs text-gray-400 mt-1 uppercase">{p.category}</p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button onClick={() => openEdit(p)} className="text-yellow-400">
                <Pencil size={18} />
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Title"
              className="w-full mb-3 p-2 rounded border"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Price"
              className="w-full mb-3 p-2 rounded border"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              placeholder="Category"
              className="w-full mb-4 p-2 rounded border"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <div className="flex justify-between">
              <button onClick={resetForm} className="text-gray-900">
                Cancel
              </button>

              <button
                onClick={editProduct ? handleEdit : handleAdd}
                className="bg-blue-600 text-white dark:text-white px-4 py-2 rounded-xl"
              >
                {editProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
