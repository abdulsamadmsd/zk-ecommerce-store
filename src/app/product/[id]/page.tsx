import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import { ProductDetailSkeleton } from "@/components/Skeleton";
import AddToCartButton from "@/components/AddToCartButton";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  
  return {
    title: product ? `${product.title} | ZK STORE` : "Product Not Found",
    description: product?.description || "View details of our premium hardware products.",
  };
}

async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null as any;
    return res.json();
  } catch (error) {
    return null as any;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent id={id} />
        </Suspense>
      </div>
    </PageTransition>
  );
}

async function ProductDetailContent({ id }: { id: string }) {
  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Product Image */}
      <div className="relative aspect-square bg-[#f8f8f8] dark:bg-slate-800/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800">
        <Image
          src={product.thumbnail!}
          alt={product.title}
          fill
          priority
          className="object-contain p-8"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-widest text-blue-600 mb-2">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            {product.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{product.rating}</span>
            </div>
            <span className="text-sm text-slate-400 font-medium">120+ Reviews</span>
          </div>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {product.description || "High-performance hardware designed for professional-grade reliability. Experience premium quality and cutting-edge technology in every detail."}
        </p>

        <div className="mb-10">
          <p className="text-sm text-slate-400 font-bold line-through mb-1">
            ${(product.price * 1.2).toFixed(2)}
          </p>
          <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            ${product.price}
          </p>
        </div>

        <AddToCartButton
          product={product}
          showText
          className="w-full sm:w-max flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-xl shadow-blue-500/10 active:scale-95 mb-8"
        />

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <Truck size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">Free Delivery</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <RotateCcw size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">30 Days Return</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <ShieldCheck size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-tight">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}