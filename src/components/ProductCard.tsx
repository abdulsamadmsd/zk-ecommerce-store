"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title.substring(0, 20)}... added!`, {
      style: {
        borderRadius: "16px",
        background: "#1e293b",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
      },
    });
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[32px] p-5 border border-gray-100 dark:border-slate-800 hover:border-blue-600/20 dark:hover:border-blue-500/30 hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-500 flex flex-col h-full relative">
      {/* Wrap the clickable area in a Link */}
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative aspect-square w-full mb-6 bg-gray-50 dark:bg-slate-800 rounded-[24px] overflow-hidden p-8">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            {product.category.replace("-", " ")}
          </p>
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-slate-800">
            <p className="text-xl font-black text-gray-900 dark:text-white">
              ${product.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="relative z-10 bg-gray-900 dark:bg-slate-100 text-white dark:text-gray-900 p-3.5 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
