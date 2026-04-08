"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast"; // [UPDATE] Import toast

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // [UPDATE] Trigger the styled notification
    toast.success(`${product.title.substring(0, 20)}... added to cart!`, {
      style: {
        borderRadius: "16px",
        background: "#1e293b", // Matches your banner's dark theme
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        border: "1px solid rgba(59, 130, 246, 0.3)",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
    });
  };

  return (
    <div className="group bg-white rounded-[32px] p-5 border border-gray-100 hover:border-blue-600/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-square w-full mb-6 bg-gray-50 rounded-[24px] overflow-hidden p-8">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-gray-900 line-clamp-2 mb-4">
          {product.title}
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div>
            <p className="text-xl font-black text-gray-900">${product.price}</p>
          </div>

          <button
            onClick={handleAddToCart} // [UPDATE] Ensure this calls our new function
            className="bg-gray-900 text-white p-3.5 rounded-2xl hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
