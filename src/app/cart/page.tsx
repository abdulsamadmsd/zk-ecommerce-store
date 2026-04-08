"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  // UPDATED: Now directs to the checkout form page
  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6 text-gray-200">
          <ShoppingBag size={100} />
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mt-4 mb-8 text-lg">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-100"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-500 font-medium">
            You have {cartCount} items in your bag
          </p>
        </div>
        <Link
          href="/"
          className="text-blue-600 flex items-center font-bold hover:underline"
        >
          <ArrowLeft size={18} className="mr-2" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white p-5 rounded-[24px] border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-2xl p-3">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                  {item.category}
                </p>
                <p className="text-blue-600 font-black text-xl mt-2">
                  ${item.price}
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, "minus")}
                    className="p-2 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, "plus")}
                    className="p-2 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- SUMMARY SECTION --- */}
        <div className="bg-gray-900 text-white p-8 rounded-[32px] h-fit sticky top-28 shadow-2xl shadow-blue-900/20">
          <h2 className="text-xl font-bold mb-8">Summary</h2>
          <div className="space-y-5">
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-medium border-b border-gray-800 pb-5">
              <span>Shipping Estimate</span>
              <span className="text-white">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl font-black pt-3">
              <span>Total</span>
              <span className="text-blue-400">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black mt-10 hover:bg-white hover:text-black transition-all active:scale-[0.98] cursor-pointer"
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
  );
}
