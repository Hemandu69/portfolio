"use client";

import { motion } from "framer-motion";
import { buildCategories } from "@/data/portfolio";

export default function WhatIBuild() {
  return (
    <section className="relative bg-graphite px-6 py-28 sm:px-10 md:px-16 md:py-40">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 font-mono text-xs uppercase tracking-[0.3em] text-mute-dim md:mb-24"
      >
        Things I Build
      </motion.h2>

      <div className="mx-auto flex max-w-5xl flex-col divide-y divide-line">
        {buildCategories.map((cat, i) => (
          <motion.div
            key={cat.index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10 md:py-12"
          >
            <span className="font-mono text-xs text-lavender-dim md:w-12">
              {cat.index}
            </span>
            <h3 className="font-display text-[9vw] italic leading-none text-paper sm:text-[5vw] md:w-[38%] md:text-[3.4vw]">
              {cat.title}
            </h3>
            <div className="flex flex-1 flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-mute md:text-sm">
              {cat.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
