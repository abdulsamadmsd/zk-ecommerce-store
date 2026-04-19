"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { HomeSkeleton } from "@/components/ui/Skeleton";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/products";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  Smartphone,
  Watch,
  ShoppingBag,
  Loader2,
  Headphones,
} from "lucide-react";
import AboutPage from "@/components/sections/AboutSection";
import ContactPage from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";

/* ================= ANIMATION VARIANTS ================= */

const easeOut = [0.25, 0.1, 0.25, 1] as const; // ✅ FIX ADDED

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easeOut, // ✅ FIXED
    },
  },
};

/* ================= CATEGORIES ================= */

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
      <HeroSection />

      {/* ================= PRODUCTS ================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* CATEGORY TABS */}
        <div
          id="product"
          className="flex gap-5 border-b border-gray-100 dark:border-slate-800 mb-6 overflow-x-auto"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(20);
              }}
              className={`pb-3 text-sm font-medium whitespace-nowrap relative ${
                selectedCategory === cat.id
                  ? "text-black dark:text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              {cat.name}

              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ProductCard product={product} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LOAD MORE */}
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
                }, 400);
              }}
              className="px-10 py-2.5 border border-gray-300 rounded-full font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
            >
              {loadMoreLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Load more"
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }} // ✅ FIXED
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6 bg-gray-50 dark:bg-slate-900"
      >
        <AboutPage />
      </motion.section>

      {/* ================= CONTACT SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }} // ✅ FIXED
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6"
      >
        <ContactPage />
      </motion.section>
    </div>
  );
}
