"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types"; // Use your existing Product type
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from DummyJSON
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-950 text-center p-6">
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
          className="flex items-center text-gray-500 hover:text-blue-600 mb-8 font-bold"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="relative aspect-square rounded-[40px] overflow-hidden bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8">
            <Image
              src={product.thumbnail} // DummyJSON uses 'thumbnail'
              alt={product.title}
              fill
              className="object-contain hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-xs font-black rounded-full uppercase w-fit">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4">
              {product.title}
            </h1>

            <div className="flex items-center mt-4 mb-6">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="ml-2 font-bold text-gray-900 dark:text-white">
                {product.rating}
              </span>
              <span className="ml-2 text-gray-400">
                ({product.stock} in stock)
              </span>
            </div>

            <p className="text-gray-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="text-4xl font-black text-blue-600 mb-10">
              ${product.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex gap-4 mb-10">
              <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-2xl p-2 border border-gray-200 dark:border-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all dark:text-white"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold px-4 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all dark:text-white"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product);
                  toast.success("Added to cart!");
                }}
                className="flex-1 bg-blue-600 hover:bg-gray-900 text-white py-5 rounded-2xl font-black uppercase transition-all flex items-center justify-center"
              >
                <ShoppingBag className="mr-3" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
