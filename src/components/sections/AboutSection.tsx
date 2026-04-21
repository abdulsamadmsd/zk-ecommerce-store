"use client";

import { motion } from "framer-motion";


export default function AboutPage() {
  return (
    <section
      className="w-full min-h-screen px-6 md:px-16 py-16 bg-white 
     dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden"
      id="about"
    >
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Building the Future of
          <span className="block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            E-commerce Experience
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          ZK E-commerce is designed to deliver fast, modern, and seamless online
          shopping powered by cutting-edge web technologies.
        </p>
      </motion.div>

      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
        {[
          {
            title: "Our Mission",
            desc: "To simplify online shopping with speed, reliability, and a user-first experience.",
          },
          {
            title: "Our Vision",
            desc: "To become a modern, scalable e-commerce platform leveraging latest technologies.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-8 rounded-3xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-xl hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Powerful Features
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "Advanced product filtering",
            "Blazing fast performance",
            "Secure authentication",
            "Modern responsive UI",
            "Dark & Light mode",
            "Scalable architecture",
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition"
            >
              <p className="font-medium">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20 p-10 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Built with Next.js, TypeScript, Firebase, Tailwind CSS, and Framer
          Motion for high performance and smooth UX.
        </p>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h2 className="text-3xl font-semibold mb-4">About the Developer</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Developed by Abdul Samad as part of a professional portfolio to
          demonstrate real-world e-commerce architecture and modern frontend
          development.
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Shopping Journey</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore products and experience a modern e-commerce platform.
        </p>
      </motion.div>
    </section>
  );
}
