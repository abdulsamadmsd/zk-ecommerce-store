"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

// Update these strings with your actual filenames in the /public folder
const carouselImages = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image5.png",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic: Changes image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-slate-950 pt-4 md:pt-5 pb-4 md:pb-6 scroll-mt-20"
      id="home"
    >
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 flex justify-center pointer-events-none top-[-10%] z-20">
        <div className="w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-4 md:pt-8 grid md:grid-cols-2 gap-10 items-center relative z-30">
        {/* ================= LEFT CONTENT (Static) ================= */}
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

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="#product"
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

        {/* ================= RIGHT CAROUSEL IMAGE ================= */}
        <div className="relative">
          {/* Main Image Container */}
          <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={carouselImages[currentIndex]}
                  alt={`Product Showcase ${currentIndex + 1}`}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Overlay to ensure consistent look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>

          {/* 🔹 CAROUSEL INDICATORS (Dots) */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-gray-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>

          {/* Decorative Background Element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}
