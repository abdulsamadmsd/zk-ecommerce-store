"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  Loader2,
  PackageSearch,
  LayoutGrid,
  Smartphone,
  Gem,
  Shirt,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: LayoutGrid },
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "jewelery", name: "Jewelry", icon: Gem },
  { id: "men's clothing", name: "Men's", icon: Shirt },
  { id: "women's clothing", name: "Women's", icon: Shirt },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, selectedCategory, setSelectedCategory } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter Logic: Search + Category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium font-inter">
          Curating your collection...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          {searchQuery ? `Results for "${searchQuery}"` : "Premium Collection"}
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          Upgrade your lifestyle with our curated selection of global brands and
          high-quality essentials.
        </p>
      </div>

      {/* Category Tabs */}
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
                  : "bg-white border border-gray-100 text-gray-600 hover:border-blue-600 hover:text-blue-600"
              }`}
            >
              <Icon size={18} className="mr-2" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <PackageSearch className="mx-auto text-gray-300 mb-6" size={80} />
          <h3 className="text-2xl font-bold text-gray-900">No matches found</h3>
          <p className="text-gray-500 mt-2">
            Try changing your search or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
            }}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
