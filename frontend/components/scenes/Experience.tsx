"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import EasterEggTrigger from "@/components/easter-eggs/EasterEggTrigger";

export default function Experience() {
  return (
    <section className="relative bg-black px-6 py-28 sm:px-10 md:px-16 md:py-40">
      <div className="mx-auto flex max-w-4xl flex-col gap-16 md:gap-20">
        {experience.map((e) => (
          <motion.div
            key={e.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10"
          >
            <div className="flex flex-col shrink-0 md:w-44">
              <span className="font-display text-[16vw] italic leading-none text-lavender-dim sm:text-[9vw] md:text-[4vw]">
                {e.year}
              </span>
              {"period" in e && e.period && (
                <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mute-dim">
                  <EasterEggTrigger id="egg-experience-label">
                    {e.period}
                  </EasterEggTrigger>
                </span>
              )}
            </div>
            <div>
              <h3 className="font-display text-2xl text-paper md:text-3xl">
                {e.role}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-mute-dim">
                {e.org}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mute md:text-base">
                {e.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
