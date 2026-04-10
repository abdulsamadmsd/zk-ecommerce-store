"use client";

import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { HomeSkeleton } from "@/components/Skeleton";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import {
  PackageSearch,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Watch,
  ShoppingBag,
  Loader2,
  Headphones,
  ShoppingCart,
} from "lucide-react";

// --- Sub-component: Alibaba Style Full-Image Card with Motion ---
const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const { addToCart } = useCart();
  const displayImage =
    product.image ||
    product.thumbnail ||
    (product.images && product.images[0]) ||
    "/placeholder.png";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }} // Subtle lift on hover
      className="group flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow group-hover:shadow-md">
        <img
          src={displayImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
          #{Math.floor(Math.random() * 10) + 1}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="text-[13px] leading-[1.4] text-gray-800 dark:text-slate-200 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors">
          {product.title}
        </h3>

        <div className="mt-auto">
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-bold text-gray-900 dark:text-white">
              PKR {Number(product.price).toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col mt-0.5">
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Min. order: 1 piece
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                Hot-selling score:
              </span>
              <span className="text-[11px] font-bold text-gray-900 dark:text-white">
                4.8
              </span>
            </div>
          </div>

          {/* Add to Cart Button with simple scale effect */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

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
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
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
        <div className="flex gap-6 border-b border-gray-100 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar relative">
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-10"
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
