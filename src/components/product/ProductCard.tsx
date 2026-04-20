"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "../ui/AddToCartButton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const easeOut = [0.25, 0.1, 0.25, 1] as const;

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const href = `/product/${product.id}`;

  // 🧠 SAFE IMAGE FALLBACK (important for production apps)
  const imageSrc = product.thumbnail || "/placeholder-product.png";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.1, 0.3),
        ease: easeOut,
      }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem]
      border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
      dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
      transition-shadow duration-500"
    >
      {/* CLICKABLE LAYER */}
      <Link
        href={href}
        aria-label={`View details for ${product.title}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative flex h-full flex-col">
        {/* IMAGE SECTION */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f3f4f6] dark:bg-slate-800/20">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-opacity duration-500"
              priority={index < 4}
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-grow flex-col p-5">
          <div className="flex justify-between items-center mb-2.5">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {product.category.replace("-", " ")}
            </span>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                {product.rating || "4.5"}
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2 text-base leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {product.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-xs text-slate-500 leading-relaxed">
            {product.description ||
              "Hardware designed for professional-grade reliability."}
          </p>

          {/* FOOTER */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 line-through font-medium">
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                ${product.price}
              </span>
            </div>

            <div className="relative z-20">
              <AddToCartButton
                product={product}
                className="flex items-center justify-center rounded-xl bg-slate-900 p-3 text-white
                shadow-sm transition-all duration-300 
                hover:bg-blue-600 hover:shadow-blue-500/20
                dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
