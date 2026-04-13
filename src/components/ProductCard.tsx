"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="group bg-white  dark:bg-slate-900 rounded-[2rem] 
    border border-slate-100
     dark:border-slate-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]
      transition-all duration-500 flex flex-col h-full overflow-hidden"
    >
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col h-Full"
      >
        {/* IMAGE CONTAINER WITH ROUNDED CORNERS - NO PADDING ON CONTAINER */}
        <div
          className="relative aspect-square w-full bg-[#f8f8f8]
         dark:bg-slate-800/50 rounded-2xl overflow-hidden m-0"
        >
          <Image
            src={product.thumbnail!}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover p-0 group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* REFINED INFO SECTION */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              {product.category.replace("-", " ")}
            </p>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-slate-400">4.5</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 mb-4 line-clamp-2">
            High-performance hardware designed for professional-grade
            reliability.
          </p>

          {/* ALIGNED PRICING BAR */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
            <div>
              <p className="text-[10px] text-slate-400 font-bold line-through mb-0.5">
                ${(product.price * 1.2).toFixed(2)}
              </p>
              <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                ${product.price}
              </p>
            </div>

            <AddToCartButton 
              product={product} 
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-3.5 rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-md active:scale-95"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
