"use client";

import { motion } from "framer-motion";
import { currently } from "@/data/portfolio";

export default function Currently() {
  return (
    <section className="relative bg-graphite px-6 py-28 sm:px-10 md:px-16 md:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="mb-14 font-mono text-xs uppercase tracking-[0.3em] text-mute-dim md:mb-20"
      >
        Currently
      </motion.h2>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
        {currently.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lavender-dim">
              {c.label}
            </span>
            <p className="mt-2 font-display text-2xl italic text-paper md:text-3xl">
              {c.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
