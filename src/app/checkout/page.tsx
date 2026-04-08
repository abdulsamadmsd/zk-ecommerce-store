"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart, cartCount } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 10;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart(); // Wipes the cart after successful order
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <CheckCircle2 size={80} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
          Thank you for your purchase. We've received your order and are
          preparing it for shipment.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-100"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4 block">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <Link
          href="/cart"
          className="text-gray-500 flex items-center hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Cart
        </Link>
        <h1 className="text-4xl font-black text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs mr-3">
                1
              </span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="First Name"
                className="checkout-input col-span-1"
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="checkout-input col-span-1"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="checkout-input col-span-2"
              />
              <input
                required
                type="text"
                placeholder="Full Address"
                className="checkout-input col-span-2"
              />
              <input
                required
                type="text"
                placeholder="City"
                className="checkout-input col-span-1"
              />
              <input
                required
                type="text"
                placeholder="Phone Number"
                className="checkout-input col-span-1"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs mr-3">
                2
              </span>
              Payment Method
            </h2>
            <div className="border-2 border-blue-600 bg-blue-50/50 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="text-blue-600 mr-3" />
                <span className="font-bold text-blue-900">
                  Cash on Delivery
                </span>
              </div>
              <ShieldCheck className="text-blue-600" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-blue-100 active:scale-[0.98]"
          >
            Complete Purchase — ${total.toFixed(2)}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 h-fit sticky top-28">
          <h3 className="text-lg font-bold mb-6">In Your Cart</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative w-14 h-14 bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-3">
            <div className="flex justify-between text-gray-500 text-sm font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm font-medium">
              <span>Shipping Fee</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-gray-900 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
