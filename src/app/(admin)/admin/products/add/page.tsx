"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/products";
import {
  getUploadErrorMessage,
  uploadProductImage,
} from "@/lib/productImages";
import { Product } from "@/types";
import {
  Trash2,
  Pencil,
  Plus,
  Image as ImageIcon,
  X,
  Upload,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"link" | "upload">("link");

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: "",
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

  // 📁 Handle Image Upload to Firebase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadError("");

      const downloadURL = await uploadProductImage(file, setUploadProgress);
      setForm((prev) => ({ ...prev, thumbnail: downloadURL }));
    } catch (error) {
      console.error("Product image upload error:", error);
      setUploadError(getUploadErrorMessage(error));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // ➕ Add to Firestore
  const handleAdd = async () => {
    if (!form.title.trim() || !form.price) {
      alert("Title and price are required.");
      return;
    }

    try {
      setSaving(true);
      const newProduct = await createProduct({
        title: form.title,
        price: Number(form.price),
        category: form.category,
        thumbnail: form.thumbnail,
      });

      setProducts((prev) => [newProduct, ...prev]);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product to Firebase.");
    } finally {
      setSaving(false);
    }
  };

  // ✏️ Update in Firestore
  const handleEdit = async () => {
    if (!editProduct) return;

    try {
      setSaving(true);
      const updatedProduct = await updateProduct(editProduct.id, {
        title: form.title,
        price: Number(form.price),
        category: form.category,
        thumbnail: form.thumbnail,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { ...p, ...updatedProduct } : p,
        ),
      );
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product in Firebase.");
    } finally {
      setSaving(false);
    }
  };

  // 🗑️ Delete from Firestore
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product from Firebase.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", price: "", category: "", thumbnail: "" });
    setEditProduct(null);
    setShowModal(false);
    setUploadMethod("link");
    setUploadError("");
    setUploadProgress(0);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category || "",
      thumbnail: product.thumbnail || "",
    });
    setShowModal(true);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:text-white font-medium">
        <Loader2 className="animate-spin mr-2" /> Loading Inventory...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Admin Inventory
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative">
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <div className="p-4">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {p.category || "General"}
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">
                {p.title}
              </h3>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                ${p.price}
              </p>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 flex justify-center py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 flex justify-center py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {editProduct ? "Edit" : "Add"} Product
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Product Title"
                className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <div className="flex gap-4">
                <input
                  placeholder="Price"
                  type="number"
                  className="w-1/2 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                  placeholder="Category"
                  className="w-1/2 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setUploadMethod("link")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMethod === "link" ? "bg-white dark:bg-slate-700 text-blue-600 shadow" : "text-slate-500"}`}
                  >
                    <LinkIcon size={14} className="inline mr-1" /> Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod("upload")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMethod === "upload" ? "bg-white dark:bg-slate-700 text-blue-600 shadow" : "text-slate-500"}`}
                  >
                    <Upload size={14} className="inline mr-1" /> Upload
                  </button>
                </div>

                {uploadMethod === "link" ? (
                  <input
                    placeholder="Image URL"
                    className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.thumbnail}
                    onChange={(e) =>
                      setForm({ ...form, thumbnail: e.target.value })
                    }
                  />
                ) : (
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin text-blue-600" />
                        <span className="text-xs font-medium text-slate-500">
                          {uploadProgress}%
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        {form.thumbnail ? "Change Image" : "Click to Upload"}
                      </p>
                    )}
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs font-medium text-red-500">
                    {uploadError}
                  </p>
                )}

                {form.thumbnail && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      src={form.thumbnail}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() => setForm({ ...form, thumbnail: "" })}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={resetForm}
                className="flex-1 py-3 font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={uploading || saving}
                onClick={editProduct ? handleEdit : handleAdd}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:bg-slate-400 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                {uploading
                  ? "Uploading..."
                  : saving
                    ? "Saving..."
                    : editProduct
                      ? "Update"
                      : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
