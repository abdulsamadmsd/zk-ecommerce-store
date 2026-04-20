"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

import PageTransition from "@/components/PageTransition";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { ORDER_SHIPPING_FEE, calculateOrderTotal } from "@/lib/orders";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = ORDER_SHIPPING_FEE;
  const total = calculateOrderTotal(subtotal);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // 🧠 EMPTY CART UI
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center dark:bg-slate-950 min-h-screen transition-colors">
        <div className="flex justify-center mb-6 text-gray-200 dark:text-slate-800">
          <ShoppingBag size={100} />
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Your cart is empty
        </h1>

        <p className="text-gray-500 dark:text-slate-400 mt-4 mb-8 text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black dark:hover:bg-blue-500 transition-all shadow-xl"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-slate-950 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-gray-500 dark:text-slate-400 font-medium">
                You have {cartCount} items in your bag
              </p>
            </div>

            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 flex items-center font-bold hover:underline"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white dark:bg-slate-900 p-5 rounded-[24px] border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all"
                >
                  {/* IMAGE */}
                  <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 dark:bg-slate-800 rounded-2xl p-3">
                    <Image
                      src={item.thumbnail || "/placeholder-product.png"}
                      alt={item.title || "Product Image"}
                      fill
                      className="object-contain"
                      sizes="112px"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
                      {item.category}
                    </p>

                    <p className="text-blue-600 dark:text-blue-400 font-black text-xl mt-2">
                      ${item.price}
                    </p>
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                    {/* QUANTITY */}
                    <div className="flex items-center border border-gray-100 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 p-1">
                      <button
                        onClick={() => updateQuantity(item.id, "minus")}
                        className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-10 text-center font-bold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, "plus")}
                        className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 dark:hover:bg-red-900/20 p-3 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-900 dark:bg-slate-900 text-white p-8 rounded-[32px] h-fit sticky top-28 shadow-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-8">Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-400 font-medium border-b border-gray-800 pb-5">
                  <span>Shipping</span>
                  <span className="text-white">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-3xl font-black pt-3">
                  <span>Total</span>
                  <span className="text-blue-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black mt-10 hover:bg-white hover:text-black transition-all"
              >
                Checkout Now
              </button>

              <div className="flex items-center justify-center mt-6 text-gray-500 text-xs font-bold space-x-2">
                <ShieldCheck size={14} />
                <span>SECURE PAYMENT SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
