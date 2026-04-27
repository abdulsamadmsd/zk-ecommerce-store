"use client";

import { motion } from "framer-motion";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Starts slightly lower and invisible
      animate={{ opacity: 1, y: 0 }} // Fades in and slides up to position
      transition={{ duration: 0.4, ease: "easeOut" }} // Very fast and smooth
      className="overflow-x-clip"
    >
      {children}
    </motion.div>
  );
}
