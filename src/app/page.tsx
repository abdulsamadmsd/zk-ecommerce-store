"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { HomeSkeleton } from "@/components/Skeleton";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { AnimatePresence, motion } from "framer-motion";
import {
  PackageSearch,
  LayoutGrid,
  Smartphone,
  Watch,
  ShoppingBag,
  Loader2,
  Headphones,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: LayoutGrid },
  { id: "smartphones", name: "Phones", icon: Smartphone },
  { id: "laptops", name: "Laptops", icon: ShoppingBag },
  { id: "Watches", name: "Watches", icon: Watch },
  { id: "headphones", name: "Headphones", icon: Headphones },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const { searchQuery, selectedCategory, setSelectedCategory } = useCart();

  useEffect(() => {
    async function fetchProductsFromFirestore() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Firestore Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductsFromFirestore();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let result = products;
    if (searchQuery) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    return searchQuery ? result : result.slice(0, visibleCount);
  }, [products, searchQuery, selectedCategory, visibleCount]);

  const totalItemsInCategory = useMemo(() => {
    if (selectedCategory === "all") return products.length;
    return products.filter((p) => p.category === selectedCategory).length;
  }, [products, selectedCategory]);

  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <HomeSkeleton />
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Tabs with Animated Bottom Bar */}
        <div className="flex gap-5 border-b border-gray-100 dark:border-slate-800 mb-4
         overflow-x-auto no-scrollbar relative">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(20);
              }}
              className={`pb-3 text-sm font-medium transition-all whitespace-nowrap relative ${
                selectedCategory === cat.id
                  ? "text-black dark:text-white font-bold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat.name}
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* The Grid with Entrance Animation */}
        {filteredProducts.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4
               lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length < totalItemsInCategory && !searchQuery && (
              <div className="mt-16 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setLoadMoreLoading(true);
                    setTimeout(() => {
                      setVisibleCount((v) => v + 20);
                      setLoadMoreLoading(false);
                    }, 500);
                  }}
                  className="px-10 py-2.5 border border-gray-300 rounded-full font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all flex items-center gap-2 bg-white dark:bg-slate-900"
                >
                  {loadMoreLoading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    "Load more"
                  )}
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-gray-400"
          >
            <PackageSearch className="mx-auto mb-4" size={48} />
            <p>No products found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
