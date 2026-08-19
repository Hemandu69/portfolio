"use client";

import { motion } from "framer-motion";
import { jokes } from "@/data/portfolio";

export default function ProjectsIntro() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-start justify-center gap-4 bg-black px-6 sm:px-10 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[13vw] italic leading-[0.9] text-paper sm:text-[9vw] md:text-[6.5vw]"
      >
        Work I&rsquo;m not
        <br />
        embarrassed of.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-mono text-[11px] italic text-mute-dim"
      >
        {jokes.projectsIntro}
      </motion.p>
    </section>
  );
}
