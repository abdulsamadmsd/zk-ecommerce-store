"use client";

import Link from "next/link";
import {
  Globe,
  Send,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ZK<span className="text-black">STORE</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Experience the future of shopping with ZK STORE. We provide the
              highest quality products with a focus on reliability and customer
              satisfaction.
            </p>
            <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <Globe size={20} />
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <Send size={20} />
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transition-all"
                  />{" "}
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start text-gray-500">
                <MapPin size={18} className="mr-3 text-blue-600 mt-0.5" />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center text-gray-500">
                <Phone size={18} className="mr-3 text-blue-600" />
                <span>+92 (300) 1234567</span>
              </li>
              <li className="flex items-center text-gray-500">
                <Mail size={18} className="mr-3 text-blue-600" />
                <span>support@zkstore.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 text-lg">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form
              className="flex flex-col space-y-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-blue-100">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium">
          <p>© 2026 ZK STORE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
