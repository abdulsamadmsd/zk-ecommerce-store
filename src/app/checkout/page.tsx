"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart, total } = useCart();

  // Local state for form handling
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Show the professional success toast
    toast.success("Order Placed Successfully!", {
      duration: 5000,
      style: {
        borderRadius: "16px",
        background: "#1e293b",
        color: "#fff",
        fontWeight: "bold",
        padding: "20px",
        border: "1px solid #3b82f6",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#fff",
      },
    });

    // 2. Clear the cart so it's empty for the next visit
    if (clearCart) clearCart();

    // 3. Redirect to Home after 2.5 seconds (gives time to read the toast)
    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/cart"
          className="text-gray-500 flex items-center mb-8 hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side: Shipping Form */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <div className="flex items-center mb-6 text-blue-600">
              <Truck className="mr-3" size={24} />
              <h2 className="text-2xl font-black text-gray-900">
                Shipping Details
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
              </div>
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleInputChange}
              />
              <input
                required
                type="text"
                name="address"
                placeholder="Full Shipping Address"
                className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-blue-100 cursor-pointer"
                >
                  Complete Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary Placeholder */}
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-8 rounded-[32px] shadow-2xl shadow-blue-900/10">
              <div className="flex items-center mb-6">
                <CreditCard className="mr-3 text-blue-400" size={24} />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
                <p className="font-bold text-blue-400">Cash on Delivery</p>
                <p className="text-xs text-gray-500 mt-1">
                  Pay when you receive your package.
                </p>
              </div>

              <div className="flex items-center justify-center py-6 border-t border-white/10 text-gray-500 text-xs font-bold space-x-2">
                <ShieldCheck size={16} />
                <span>SECURE CHECKOUT SYSTEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
