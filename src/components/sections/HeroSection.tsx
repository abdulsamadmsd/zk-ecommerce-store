"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import heroImg from "../../../public/image.png";
import { Zap, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    // 1. Reduced height/padding on the section itself
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-4 md:pt-5 pb-4 md:pb-6" id="home">
      {/* 🔥 BACKGROUND GLOW - Adjusted top position */}
      <div className="absolute inset-0 flex justify-center pointer-events-none top-[-10%]">
        <div className="w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

     
      <div className="max-w-7xl mx-auto px-6 pt-4 md:pt-8 grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-sm mb-6 border border-blue-100 dark:border-slate-700">
            <Zap size={14} className="text-blue-600" />
            <span className="text-blue-900 dark:text-blue-100 font-medium">
              Premium Shopping Experience
            </span>
          </div>

          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
            Shop Smarter,
            <span className="block text-blue-600">Live Better</span>
          </h1>

         
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
            Discover high-quality products with fast delivery, smooth
            performance, and a premium user experience built for modern users.
          </p>

          
          <div className="mt-3 flex gap-4 flex-wrap">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              Shop Now <ArrowRight size={16} />
            </Link>

            <Link
              href="#about"
              className="px-8 py-3 rounded-full border border-gray-300 dark:border-slate-700 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Container adjusted for a cleaner "Floating" look */}
          <div className="relative w-full h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900">
            <Image
              src={heroImg}
              alt="ZK Store Products"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Subtle Decorative element under image */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 blur-2xl rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
