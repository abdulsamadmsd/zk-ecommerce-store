"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  PackagePlus,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initial state helper to reuse for clearing the form
  const initialState = {
    title: "",
    price: "",
    category: "smartphones",
    thumbnail: "",
    description: "Premium product from ZK-Store",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: Number(formData.price),
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);

      // Clear the form data immediately
      setFormData(initialState);

      // Reset the success button state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Store
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl shadow-blue-500/5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600 rounded-2xl text-white">
              <PackagePlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Add New Product
              </h1>
              <p className="text-slate-500 text-sm">
                Fill in the details to list a new item.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Product Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. iPhone 15 Pro"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-600 dark:text-white outline-none transition-all"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Price ($)
                </label>
                <input
                  required
                  type="number"
                  placeholder="999"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-600 dark:text-white outline-none transition-all"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-600 dark:text-white outline-none transition-all appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                    <option value="Watches">Watches</option>
                    <option value="headphones">Headphones</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Image URL
              </label>
              <input
                required
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-600 dark:text-white outline-none transition-all"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-5 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 ${
                success
                  ? "bg-green-500"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              } disabled:opacity-70`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : success ? (
                <>
                  <CheckCircle2 /> Added Successfully!
                </>
              ) : (
                "Publish Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
