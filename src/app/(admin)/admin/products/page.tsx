"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import {
  Trash2,
  Pencil,
  Plus,
  Image as ImageIcon,
  X,
  Upload,
  Link as LinkIcon,
  Loader2,
  Search,
  Filter,
} from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

type Product = {
  id: string;
  title: string;
  price: number;
  category?: string;
  thumbnail?: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"link" | "upload">("link");

  // --- Search & Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  // 📁 Firebase Upload Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error(error);
        setUploading(false);
        alert("Upload failed");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setForm((prev) => ({ ...prev, thumbnail: downloadURL }));
        setUploading(false);
      },
    );
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: form.title,
      price: Number(form.price),
      category: form.category,
      thumbnail: form.thumbnail,
    };
    setProducts((prev) => [newProduct, ...prev]);
    resetForm();
  };

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

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setForm({ title: "", price: "", category: "", thumbnail: "" });
    setEditProduct(null);
    setShowModal(false);
    setUploadMethod("link");
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

  // --- Filtering Logic ---
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category?.toLowerCase()).filter(Boolean)),
  ];

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:text-white font-medium">
        Loading Inventory...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Admin Inventory
          </h1>
          <p className="text-slate-500 text-sm">
            Managing {filteredProducts.length} items
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 font-semibold"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative min-w-[160px]">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <select
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white capitalize appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID SECTION */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <ImageIcon size={32} />
                  </div>
                )}
                {p.category && (
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                    {p.category}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">
                  {p.title}
                </h3>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
                  ${p.price}
                </p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex-1 flex justify-center py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 flex justify-center py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-slate-400">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* MODAL (Remains as we built it) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {editProduct ? "Update" : "Create"} Product
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Product Title"
                className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <div className="flex gap-4">
                <input
                  placeholder="Price"
                  type="number"
                  className="w-1/2 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <input
                  placeholder="Category"
                  className="w-1/2 p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMethod === "link" ? "bg-white dark:bg-slate-700 text-blue-600 shadow" : "text-slate-500"}`}
                  >
                    <LinkIcon size={14} className="inline mr-1" /> Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod("upload")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${uploadMethod === "upload" ? "bg-white dark:bg-slate-700 text-blue-600 shadow" : "text-slate-500"}`}
                  >
                    <Upload size={14} className="inline mr-1" /> Upload
                  </button>
                </div>

                {uploadMethod === "link" ? (
                  <input
                    placeholder="Image URL"
                    className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={form.thumbnail}
                    onChange={(e) =>
                      setForm({ ...form, thumbnail: e.target.value })
                    }
                  />
                ) : (
                  <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <Loader2 className="animate-spin text-blue-600 mx-auto" />
                    ) : (
                      <p className="text-xs text-slate-500 font-medium">
                        {form.thumbnail
                          ? "Change Image"
                          : "Click to Upload File"}
                      </p>
                    )}
                  </div>
                )}

                {form.thumbnail && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border dark:border-slate-700 shadow-sm">
                    <img
                      src={form.thumbnail}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <button
                      onClick={() => setForm({ ...form, thumbnail: "" })}
                      className="absolute top-0 right-0 bg-red-500 text-white p-0.5"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={resetForm}
                className="flex-1 py-3 font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={uploading}
                onClick={editProduct ? handleEdit : handleAdd}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:bg-slate-400 transition-all shadow-lg shadow-blue-500/20"
              >
                {editProduct ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
