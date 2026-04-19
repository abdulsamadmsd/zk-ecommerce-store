"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 For now just simulate submit (replace with Firebase / API later)
    console.log(form);

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen px-6 md:px-16 py-16
       bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      {/* 🔹 Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Get in
          <span className="block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Touch
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </motion.div>

      {/* 🔹 Contact Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* 🔹 Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={5}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>

          {submitted && (
            <p className="mt-4 text-green-600">Message sent successfully!</p>
          )}
        </motion.form>

        {/* 🔹 Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Feel free to reach out for collaborations, feedback, or project
            discussions.
          </p>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>📧 abdulsamadpak111@gmail.com</p>
            <p>📞 0302-9556006</p>
            <p>📍 Pakistan</p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
