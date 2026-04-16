"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";
import { getProductImage } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const href = `/product/${product.id}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:border-slate-800 dark:bg-slate-900"
    >
      <Link
        href={href}
        aria-label={`View details for ${product.title}`}
        className="absolute inset-0 z-10 rounded-[2rem]"
      />
      <div className="relative flex h-full flex-col">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f8f8f8] dark:bg-slate-800/50"
        >
          <Image
            src={getProductImage(product)}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-grow flex-col p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              {product.category.replace("-", " ")}
            </p>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-slate-400">
                {product.rating || "4.5"}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-xs text-slate-500">
            {product.description ||
              "High-performance hardware designed for professional-grade reliability."}
          </p>

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
              className="relative z-20 rounded-2xl bg-slate-900 p-3.5 text-white shadow-md transition-all active:scale-95 hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
