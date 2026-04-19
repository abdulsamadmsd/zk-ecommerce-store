"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Search, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "../ThemeToggle";
import AuthButton from "../AuthButton";
import zklogo from "../../../public/zklogo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // ================= FIXED SCROLL LOGIC =================
  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      // If not on home, go home first with the hash
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100/80 dark:border-slate-800/50 bg-blue-600 text-white dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src={zklogo}
                alt="ZK Store"
                width={65} // Reduced size to fit h-16 better
                height={65}
                className="rounded-xl hover:scale-105 transition"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.href === "/") router.push("/");
                    else scrollToSection(link.href.replace("#", ""));
                  }}
                  className="relative group hover:text-white/80 transition"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all" />
                </button>
              ))}
            </div>

            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/20 dark:bg-slate-900/60 rounded-full py-2 pl-11 pr-10 text-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-red-300">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block"><ThemeToggle /></div>
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="hidden md:block"><AuthButton /></div>
              <button onClick={() => setMenuOpen(true)} className="md:hidden p-2"><Menu /></button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-blue-700 dark:bg-slate-950 z-50 shadow-2xl flex flex-col p-6">
              <div className="flex justify-between items-center mb-8">
                <Image src={zklogo} alt="logo" width={60} height={60} />
                <button onClick={() => setMenuOpen(false)} className="text-white"><X /></button>
              </div>
              <div className="flex flex-col gap-6 text-xl font-semibold text-white">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    className="text-left"
                    onClick={() => {
                      setMenuOpen(false);
                      if (link.href === "/") router.push("/");
                      else scrollToSection(link.href.replace("#", ""));
                    }}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              {/* Other menu items remain same */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}