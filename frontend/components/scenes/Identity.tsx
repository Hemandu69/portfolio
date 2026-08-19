"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { jokes, overthinkerVariations } from "@/data/portfolio";
import EasterEggTrigger from "@/components/easter-eggs/EasterEggTrigger";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Identity() {
  const [idx, setIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % overthinkerVariations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative bg-black px-6 py-32 sm:px-10 md:px-16 md:py-44">
      <div className="mx-auto max-w-4xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="font-display text-[9vw] font-light italic leading-[1.05] text-paper sm:text-[6vw] md:text-[4.2vw]"
        >
          <EasterEggTrigger id="egg-identity-heading">
            {jokes.about}
          </EasterEggTrigger>
        </motion.p>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-10 flex flex-col gap-1 font-mono text-sm text-mute md:mt-14 md:text-base"
        >
          <p>Full-stack developer.</p>
          <p>AI/ML student.</p>
          <p>MERN, Next.js, TypeScript — held together with REST APIs.</p>
          <div className="min-h-[1.5rem] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
                className="text-lavender"
              >
                {overthinkerVariations[idx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
