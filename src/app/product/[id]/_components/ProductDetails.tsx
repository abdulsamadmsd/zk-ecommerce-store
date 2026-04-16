import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductImage } from "@/lib/products";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
      <div>
        <Link
          href="/"
          className="group mb-4 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft
            size={16}
            className="mr-2 transition-transform group-hover:-translate-x-1"
          />
          Back to Products
        </Link>

        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-slate-100 bg-[#f8f8f8] dark:border-slate-800 dark:bg-slate-800/50">
          <Image
            src={getProductImage(product)}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-6">
          <p className="mb-2 text-sm font-black uppercase tracking-widest text-blue-600">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
            {product.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-3 py-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
                {product.rating || "4.5"}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-400">
              {product.stock ? `${product.stock} in stock` : "Available now"}
            </span>
          </div>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mb-10">
          <p className="mb-1 text-sm font-bold text-slate-400 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </p>
          <p className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <AddToCartButton
          product={product}
          showText
          className="mb-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-blue-500/10 transition-all active:scale-95 hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white sm:w-max"
        />

        <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-8 dark:border-slate-800 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Truck size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">
              Free Delivery
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <RotateCcw size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">
              Easy Returns
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <ShieldCheck size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">
              Secure Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
