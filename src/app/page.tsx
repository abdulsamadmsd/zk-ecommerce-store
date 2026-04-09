"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { HomeSkeleton } from "@/components/Skeleton"; // Import from new file
import {
  PackageSearch,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Shirt,
  ShoppingBag,
  Home as HomeIcon,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: LayoutGrid },
  { id: "smartphones", name: "Phones", icon: Smartphone },
  { id: "laptops", name: "Laptops", icon: ShoppingBag },
  { id: "mens-shirts", name: "Men's", icon: Shirt },
  { id: "womens-dresses", name: "Women's", icon: Shirt },
  { id: "beauty", name: "Beauty", icon: Sparkles },
  { id: "furniture", name: "Home", icon: HomeIcon },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, selectedCategory, setSelectedCategory } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const apiUrl = "https://dummyjson.com/products?limit=0";
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    if (!Array.isArray(products)) return [];
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (selectedCategory === "all") {
      return searchQuery ? result : result.slice(0, 20);
    } else {
      return result.filter((p) => p.category === selectedCategory);
    }
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight capitalize">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory === "all"
                ? "Premium Collection"
                : `${selectedCategory.replace("-", " ")}`}
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl">
            {selectedCategory === "all"
              ? "Showing our top picks. Select a category to explore our full catalog."
              : `Showing all items in ${selectedCategory.replace("-", " ")}.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500"
                }`}
              >
                <Icon size={18} className="mr-2" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-gray-200 dark:border-slate-800">
            <PackageSearch
              className="mx-auto text-gray-300 dark:text-slate-700 mb-6"
              size={80}
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              No matches found
            </h3>
            <p className="text-gray-500 dark:text-slate-400 mt-2">
              Try a different category or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

