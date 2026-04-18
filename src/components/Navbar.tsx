"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthButton";
import zklogo from "../../public/zklogo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100/80 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src={zklogo}
                alt="ZK Store"
                width={85}
                height={85}
                className="rounded-xl hover:scale-105 transition"
              />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group hover:text-blue-500 transition"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all" />
                </Link>
              ))}
            </div>

            {/* SEARCH (DESKTOP ONLY) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100/60 dark:bg-slate-900/60 rounded-full py-2 pl-11 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* THEME (DESKTOP ONLY) */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* CART */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* AUTH (DESKTOP ONLY) */}
              <div className="hidden md:block">
                <AuthButton />
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col p-6"
            >
              {/* TOP */}
              <div className="flex justify-between items-center mb-8">
                <Image src={zklogo} alt="logo" width={80} height={80} />
                <button onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>

              {/* SEARCH */}
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-gray-100 dark:bg-slate-800 rounded-xl py-2 pl-10 pr-3 text-sm"
                  />
                </div>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-5 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-blue-500 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* ================= BOTTOM ACTIONS ================= */}
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-slate-800 space-y-4">
                {/* THEME (ABOVE LOGIN) */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Theme</span>
                  <ThemeToggle />
                </div>

                {/* LOGIN / ACCOUNT */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Account</span>
                  <AuthButton />
                </div>

                {/* CART */}
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex justify-between items-center p-3 rounded-xl bg-gray-100 dark:bg-slate-800"
                >
                  <span>Cart</span>
                  <span className="text-blue-600 font-bold">{cartCount}</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
