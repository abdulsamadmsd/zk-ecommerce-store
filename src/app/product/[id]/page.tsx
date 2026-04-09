"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ProductDetailSkeleton } from "@/components/Skeleton";
import { Product } from "@/types";
import { ArrowLeft, ShoppingBag, Star, Plus, Minus } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      // 1. Safety check for ID
      if (!id || id === "undefined") return;

      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        // 2. Check for API errors
        if (!res.ok) {
          toast.error("Product not found");
          router.push("/");
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, router]);

  // Handle loading state with the modern skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-950 text-center p-6 transition-colors duration-500">
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Product not found
        </h2>
        <button
          onClick={() => router.push("/")}
          className="text-blue-600 font-bold hover:underline"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-blue-600 mb-8 font-bold group transition-colors"
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain hover:scale-105 transition-transform duration-700 p-8"
              priority
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black rounded-full uppercase w-fit mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center mt-4 mb-6">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="ml-2 font-bold text-gray-900 dark:text-white">
                {product.rating}
              </span>
              <span className="ml-3 text-gray-400 dark:text-slate-500 font-medium">
                ({product.stock} in stock)
              </span>
            </div>

            <p className="text-gray-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-10">
              ${product.price}
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-2xl p-2 border border-gray-200 dark:border-slate-800 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all dark:text-white"
                >
                  <Minus size={20} />
                </button>
                <span className="font-black px-6 text-xl dark:text-white w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all dark:text-white"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product);
                  toast.success(`${product.title} added to cart!`, {
                    style: {
                      borderRadius: "12px",
                      background: "#1e293b",
                      color: "#fff",
                    },
                  });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-5 rounded-[24px] font-black uppercase transition-all flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-none active:scale-95"
              >
                <ShoppingBag className="mr-3" size={24} />
                Add to Cart
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center space-x-6 text-gray-400 dark:text-slate-500 text-sm font-bold border-t border-gray-100 dark:border-slate-800 pt-8">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Free Shipping
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
