"use client";

import PageTransition from "@/components/PageTransition";
import { ShieldCheck, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">
            Experience the <span className="text-blue-600">Future</span> of Shopping
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-xl leading-relaxed">
            At ZK STORE, we believe in merging cutting-edge technology with premium quality products to deliver an unmatched shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "Global Vision", desc: "Providing the highest quality hardware to professionals worldwide." },
            { icon: ShieldCheck, title: "Unmatched Trust", desc: "Security and reliability are at the core of every transaction we process." },
            { icon: Zap, title: "Fast Delivery", desc: "Experience lightning-fast shipping and dedicated customer support." },
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-center group hover:border-blue-500 transition-all">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}