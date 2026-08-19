"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/cursor/CustomCursor";

const notFoundJokes = [
  "The page has left the building.",
  "I checked. It's definitely not here.",
  "This URL has achieved absolutely nothing.",
  "Congratulations. You found the digital equivalent of a locked door.",
  "Someone probably moved it. I won't investigate.",
  "This page existed emotionally.",
  "404. The internet has disappointed us both.",
  "You took a wrong turn. Respectfully.",
  "There is nothing here. You can stop looking.",
  "This seemed like a good URL five minutes ago.",
  "The page is currently avoiding responsibility.",
  "I have no idea what you expected to find here.",
];

export default function NotFound() {
  const [jokeIdx, setJokeIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Pick one random joke safely on client mount
    setJokeIdx(Math.floor(Math.random() * notFoundJokes.length));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : i * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <>
      <CustomCursor />

      <main className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-black px-6 py-10 sm:px-10 md:px-16 md:py-14">
        {/* Ambient radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(169,156,194,0.08),transparent_65%)]" />

        {/* Top Header */}
        <header className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            data-cursor="HOME"
            className="font-display text-2xl italic text-paper transition-opacity hover:opacity-80 md:text-3xl"
          >
            Hemandu
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute-dim">
            404 / NOT FOUND
          </span>
        </header>

        {/* Center Content */}
        <div className="relative z-10 my-auto flex max-w-4xl flex-col py-8 md:py-12">
          {/* Main Heading */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Well. This wasn&rsquo;t supposed to happen.
          </motion.h1>

          {/* SpongeBob Awkward GIF */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="my-6 max-w-[200px] overflow-hidden rounded-xl border border-line-strong/60 shadow-xl xs:max-w-[240px] sm:max-w-[260px] md:my-8 md:max-w-[280px]"
          >
            <Image
              src="/images/spongebob-awkward.gif"
              alt="Awkward SpongeBob"
              width={280}
              height={210}
              unoptimized
              data-cursor="AWKWARD"
              className="h-auto w-full object-cover grayscale-[20%] contrast-[1.05]"
            />
          </motion.div>

          {/* Supporting Text & Joke */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex max-w-xl flex-col gap-3 text-mute"
          >
            <p className="text-sm leading-relaxed sm:text-base md:text-lg">
              You somehow found a page that doesn&rsquo;t exist. Honestly, impressive.
            </p>
            <p className="font-mono text-xs italic tracking-wide text-lavender sm:text-sm">
              {notFoundJokes[jokeIdx]}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 md:mt-10"
          >
            <Link
              href="/"
              data-cursor="GO HOME"
              className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
            >
              Take me home
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/bad"
              data-cursor="WHY?"
              className="flex items-center px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:text-mute"
            >
              Make another bad decision
            </Link>
          </motion.div>
        </div>

        {/* Footer info */}
        <footer className="relative z-10 flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 HEMANDU</span>
          <span>hemandu.com</span>
        </footer>
      </main>
    </>
  );
}