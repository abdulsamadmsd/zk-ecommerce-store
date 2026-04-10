"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { HomeSkeleton } from "@/components/Skeleton";
import { db } from "@/lib/firebase"; // Import your firestore instance
import { collection, getDocs } from "firebase/firestore"; // Import firestore methods
import {
  PackageSearch,
  LayoutGrid,
  Smartphone,
  Sparkles,
    Watch, // Added for the Watch category
   // This is the corrected name for clock-12
  ShoppingBag,
  Home as HomeIcon,
  Loader2,
  Headphones, // Added for the Headphones category
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: LayoutGrid },
  { id: "smartphones", name: "Phones", icon: Smartphone },
  { id: "laptops", name: "Laptops", icon: ShoppingBag },
  { id: "Watches", name: "Watches", icon: Watch }, // Using the Watch icon
  { id: "headphones", name: "Headphones", icon: Headphones }, // Using Headphones icon
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const { searchQuery, selectedCategory, setSelectedCategory } = useCart();

  // 1. Fetch Products from Firestore (Replaces DummyJSON)
  useEffect(() => {
    async function fetchProductsFromFirestore() {
      try {
        setLoading(true);

        // Reference your "products" collection in Firestore
        const querySnapshot = await getDocs(collection(db, "products"));

        // Map the firestore documents to your Product type
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Use the Auto-ID from Firestore as the unique key
        })) as Product[];

        setProducts(data);
      } catch (error) {
        console.error("Firestore Fetch Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductsFromFirestore();
  }, []);

  // 2. Filter Logic (Now runs on your own database data)
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = products;

    // Filter by Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Limit to visibleCount UNLESS searching
    return searchQuery ? result : result.slice(0, visibleCount);
  }, [products, searchQuery, selectedCategory, visibleCount]);

  // 3. Check if there are more items to load
  const totalItemsInCategory = useMemo(() => {
    if (selectedCategory === "all") return products.length;
    return products.filter((p) => p.category === selectedCategory).length;
  }, [products, selectedCategory]);

  const hasMore =
    filteredProducts.length < totalItemsInCategory && !searchQuery;

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 20);
      setLoadMoreLoading(false);
    }, 600);
  };

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
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight capitalize">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory === "all"
                ? "Premium Collection"
                : `${selectedCategory.replace("-", " ")}`}
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl">
            {selectedCategory === "all"
              ? "Showing our top curated picks. Select a category to explore our full catalog."
              : `Showing all items in ${selectedCategory.replace("-", " ")}.`}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(20);
                }}
                className={`flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105"
                    : "bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                <Icon size={18} className="mr-2" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadMoreLoading}
                  className="group relative flex items-center gap-3 px-10 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl font-bold text-gray-900 dark:text-white hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadMoreLoading ? (
                    <Loader2 className="animate-spin text-blue-600" size={20} />
                  ) : (
                    <>
                      Load More Items
                      <Sparkles
                        size={18}
                        className="text-blue-600 group-hover:animate-pulse"
                      />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-gray-50/50 dark:bg-slate-900/50 rounded-[40px] border border-dashed border-gray-200 dark:border-slate-800">
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
