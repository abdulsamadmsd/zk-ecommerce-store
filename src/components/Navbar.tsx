"use client";
import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            SAMAD<span className="text-black">STORE</span>
          </Link>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex flex-1 mx-8 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 size-5" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/account" className="text-gray-600 hover:text-blue-600">
              <User className="size-6" />
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart className="size-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
