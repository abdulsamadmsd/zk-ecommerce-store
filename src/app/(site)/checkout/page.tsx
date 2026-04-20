"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ORDER_SHIPPING_FEE,
  calculateOrderSubtotal,
  calculateOrderTotal,
  createOrder,
} from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { clearCart, cart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  const subtotal = useMemo(() => calculateOrderSubtotal(cart), [cart]);
  const total = useMemo(() => calculateOrderTotal(subtotal), [subtotal]);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart.length) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    setSubmitting(true);

    let orderId = "";

    try {
      const order = createOrder({
        customer: formData,
        cartItems: cart,
      });
      orderId = order.id;
    } catch (error) {
      console.error("Order creation failed", error);
      toast.error("Could not place your order. Please try again.");
      setSubmitting(false);
      return;
    }

    const isDark = theme === "dark";

    toast.success("Order Placed Successfully!", {
      duration: 5000,
      style: {
        borderRadius: "20px",
        background: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#ffffff" : "#1e293b",
        fontWeight: "600",
        padding: "16px 24px",
        border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
      },
      iconTheme: {
        primary: "#3b82f6",
        secondary: "#fff",
      },
    });

    clearCart();
    router.push(`/order/${orderId}?created=1`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClasses =
    "w-full p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200";

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="mb-4 text-3xl font-black text-gray-900 dark:text-white">
            Checkout is unavailable
          </h1>
          <p className="mb-8 text-gray-500 dark:text-slate-400">
            Add at least one item to your cart before placing an order.
          </p>
          <Link
            href="/cart"
            className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
          >
            Return to cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link
          href="/cart"
          className="text-gray-500 dark:text-slate-400 flex items-center mb-8 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit font-medium"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Cart
        </Link>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Shipping Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400 mr-4">
                <Truck size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Shipping Details
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={inputClasses}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={inputClasses}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                className={inputClasses}
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                required
                type="text"
                name="address"
                placeholder="Full Shipping Address"
                className={inputClasses}
                value={formData.address}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  className={inputClasses}
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-xl shadow-blue-100 dark:shadow-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting
                    ? "Placing Order..."
                    : `Place Order • $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center mb-6">
                <ShoppingBag
                  className="mr-3 text-blue-600 dark:text-blue-400"
                  size={22}
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${ORDER_SHIPPING_FEE.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-100 dark:border-slate-800 pt-4 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="flex items-center mb-2">
                  <CreditCard
                    className="mr-2 text-blue-600 dark:text-blue-400"
                    size={18}
                  />
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    Cash on Delivery
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-500 leading-relaxed">
                  Pay with cash upon delivery. Please ensure someone is
                  available to receive the package.
                </p>
              </div>

              <div className="flex items-center justify-center pt-6 text-gray-400 dark:text-slate-600 text-[10px] font-bold tracking-widest uppercase space-x-2">
                <ShieldCheck size={14} />
                <span>Encrypted & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


