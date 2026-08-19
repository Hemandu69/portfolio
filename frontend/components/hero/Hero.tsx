"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { person, jokes } from "@/data/portfolio";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const metaOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section id="top" ref={ref} className="relative h-[190vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(169,156,194,0.10),transparent_58%)]"
        />

        {/* portrait — asymmetrical, overlapping typography */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="absolute right-[-6%] top-[8%] h-[86%] w-[62%] sm:right-[2%] sm:w-[46%] md:right-[6%] md:w-[38%]"
        >
          <div className="relative h-full w-full">
            <Image
              src="/images/portrait.jpeg"
              alt="Hemandu Tapraniya"
              fill
              priority
              className="object-cover object-[60%_20%] grayscale-[35%] contrast-[1.05]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
              sizes="(max-width: 768px) 70vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16">
          <motion.div
            style={{ opacity: metaOpacity, y: metaY }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mute md:mb-6"
          >
            01 / {person.name.toUpperCase()}
          </motion.div>

          <motion.h1
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
            className="origin-left font-display text-[19vw] font-light leading-[0.82] tracking-tight text-paper sm:text-[15vw] md:text-[13vw] lg:text-[11.5vw]"
          >
            HEMANDU
          </motion.h1>

          <motion.p
            style={{ y: titleY, opacity: titleOpacity }}
            className="mt-3 max-w-md font-display text-[9vw] italic leading-[0.95] text-mute sm:text-[6vw] md:mt-4 md:text-[4vw] lg:text-[3.2vw]"
          >
            I build things.
          </motion.p>

          <motion.div
            style={{ opacity: metaOpacity }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute-dim md:mt-10"
          >
            <span>Full Stack</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>AI / ML</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{person.location}</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{person.year}</span>
          </motion.div>

          <motion.p
            style={{ opacity: metaOpacity }}
            className="mt-6 font-mono text-[10px] italic tracking-wide text-mute-dim"
          >
            {jokes.hero}
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-mute-dim"
        >
          scroll
        </motion.div>
      </div>
    </section>
  );
}
