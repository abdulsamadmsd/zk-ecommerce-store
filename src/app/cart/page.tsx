"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6 text-gray-300">
          <ShoppingBag size={100} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-4 mb-8">
          Look like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Shopping Cart ({cartCount})
        </h1>
        <Link
          href="/"
          className="text-blue-600 flex items-center hover:underline"
        >
          <ArrowLeft size={18} className="mr-2" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 text-center sm:text-left">
                <h3 className="font-bold text-gray-900 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize mt-1">
                  {item.category}
                </p>
                <p className="text-blue-600 font-bold mt-2">${item.price}</p>
              </div>

              <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                <div className="flex items-center border rounded-lg bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.id, "minus")}
                    className="p-2 hover:text-blue-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, "plus")}
                    className="p-2 hover:text-blue-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-b pb-4">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
            Proceed to Checkout
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Secure SSL Checkout • Easy Returns
          </p>
        </div>
      </div>
    </div>
  );
}
