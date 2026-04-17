"use client";

import Link from "next/link";
import { ShoppingCart, Search, X, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import Logo from "./Logo";

export default function Navbar() {
  const { cartCount, searchQuery, setSearchQuery } = useCart();

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-gray-100/80
     dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 
     backdrop-blur-md 
     transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-3 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 1. BRAND LOGO */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div
                className="relative flex items-center justify-center
                 bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5
                  sm:p-2 rounded-xl group-hover:shadow-lg
                   group-hover:shadow-blue-500/30 transition-all duration-300
                    group-hover:-rotate-2"
              >
                <Logo />
              </div>
            </Link>
          </div>

          {/* 2. INTELLIGENT SEARCH BAR (Desktop Only) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400
                 group-focus-within:text-blue-600 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search premium products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100/50 dark:bg-slate-900/50 border
                 border-transparent focus:bg-white dark:focus:bg-slate-800
                  border-gray-100 dark:border-slate-800 rounded-full py-2.5 pl-11 pr-10
                   text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                   transition-all placeholder:text-gray-400 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                   hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* 3. GLOBAL ACTIONS */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Theme Toggle Only (Search hidden on Mobile per your request) */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-800 mx-1 hidden xs:block"></div>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-2.5 text-slate-600 dark:text-slate-400
               hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all group"
            >
              <ShoppingCart
                size={22}
                className="group-hover:text-blue-600 dark:group-hover:text-blue-500
                 transition-colors"
              />
              {cartCount > 0 && (
                <span
                  className="absolute top-1 right-1 bg-blue-600 text-white
                 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center
                  border-2 border-white dark:border-slate-950"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* AuthButton (Login/Profile) */}
            <div className="pl-1 sm:pl-2 border-l border-gray-200 dark:border-slate-800 ml-1">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
