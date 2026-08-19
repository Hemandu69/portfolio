"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { person, heroStatusLines } from "@/data/portfolio";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [statusIdx, setStatusIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % heroStatusLines.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

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
    <section id="top" ref={ref} className="relative min-h-[100dvh] md:h-[190vh]">
      <div className="relative flex min-h-[100dvh] w-full flex-col justify-between px-6 pt-24 pb-8 sm:px-10 md:sticky md:top-0 md:h-screen md:flex-row md:items-center md:overflow-hidden md:px-16 md:py-0">
        <motion.div
          style={{ opacity: bgOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(169,156,194,0.10),transparent_58%)]"
        />

        {/* Desktop portrait — asymmetrical, overlapping typography (hidden on mobile) */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="hidden md:block md:absolute md:right-[5%] md:top-[9%] md:h-[82%] md:w-[36%] lg:right-[7%] lg:top-[9%] lg:h-[82%] lg:w-[33%]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[14px] border border-white/[0.08] [isolation:isolate]">
            <Image
              src="/images/portrait.jpeg"
              alt="Hemandu Tapraniya"
              fill
              priority
              className="object-cover object-[60%_20%] grayscale-[30%] contrast-[1.05]"
              sizes="(min-width: 1024px) 33vw, 36vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        </motion.div>

        {/* Hero Typography & Content */}
        <div className="relative z-10 w-full md:max-w-[62%] lg:max-w-[58%]">
          <motion.div
            style={{ opacity: metaOpacity, y: metaY }}
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mute sm:text-[11px] md:mb-6"
          >
            01 / {person.name.toUpperCase()}
          </motion.div>

          <motion.h1
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
            className="origin-left font-display text-[13.5vw] font-light leading-[0.88] tracking-tight text-paper sm:text-[14vw] md:text-[13vw] lg:text-[11.5vw]"
          >
            HEMANDU
          </motion.h1>

          <motion.p
            style={{ y: titleY, opacity: titleOpacity }}
            className="mt-2.5 max-w-md font-display text-[6.5vw] italic leading-[0.95] text-mute sm:text-[5.5vw] md:mt-4 md:text-[4vw] lg:text-[3.2vw]"
          >
            I build things.
          </motion.p>

          <motion.div
            style={{ opacity: metaOpacity }}
            className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-mute-dim sm:gap-x-5 sm:text-[10px] md:mt-10"
          >
            <span>Full Stack</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>AI / ML</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{person.location}</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span>{person.year}</span>
          </motion.div>

          <motion.div
            style={{ opacity: metaOpacity }}
            className="mt-4 min-h-[2.5rem] max-w-md flex items-center md:mt-6"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIdx}
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
                style={{ fontSize: "clamp(0.875rem, 1.15vw, 1.125rem)" }}
                className="font-mono italic leading-relaxed tracking-wide text-mute-dim"
              >
                {heroStatusLines[statusIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Mobile portrait — controlled aspect ratio beneath content (hidden on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-7 aspect-[4/5] w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[280px] overflow-hidden rounded-xl border border-line-strong/60 shadow-2xl md:hidden"
          >
            <Image
              src="/images/portrait.jpeg"
              alt="Hemandu Tapraniya"
              fill
              priority
              className="object-cover object-[60%_20%] grayscale-[30%] contrast-[1.05]"
              sizes="(max-width: 768px) 280px, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="mt-6 flex justify-center font-mono text-[9px] uppercase tracking-[0.3em] text-mute-dim md:absolute md:bottom-8 md:left-1/2 md:mt-0 md:-translate-x-1/2"
        >
          scroll
        </motion.div>
      </div>
    </section>
  );
}
