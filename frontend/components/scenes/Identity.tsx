"use client";

import { motion, type Variants } from "framer-motion";
import { jokes } from "@/data/portfolio";

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
          {jokes.about}
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
          <p className="text-lavender">
            Professional overthinker of button spacing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
