"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/cursor/CustomCursor";

const badJokes = [
  "You clicked the button. I genuinely thought we'd get further.",
  "This is the part where you pretend this was intentional.",
  "There was absolutely no reason to come here.",
  "You had two buttons. You chose violence.",
  "I specifically named the button 'bad decision'.",
  "The warning was decorative, apparently.",
  "Your curiosity has been noted.",
  "This page contributes nothing to your career.",
  "Somewhere, a UX designer just felt a disturbance.",
  "You could have gone home.",
  "You chose this.",
  "I have no useful information for you.",
  "We are both wasting time now.",
  "This is technically a feature.",
  "I hope you're proud of yourself.",
  "At least you're consistent.",
  "You have successfully discovered the least productive page on this website.",
  "This could have been an About page.",
  "No recruiters were harmed in the making of this page.",
  "I don't know what you expected.",
  "You clicked it. I merely complied.",
  "This is between you and your browser history.",
  "Your decision-making skills are now under review.",
  "There are better ways to spend your time.",
  "And yet, here we are.",
];

const escalationMessages = [
  "You made another bad decision.",
  "Oh. You came back. You've now made TWO bad decisions.",
  "At this point I'm legally obligated to stop you.",
  "Three bad decisions. Your determination is terrifying.",
];

export default function BadPage() {
  const [jokeIdx, setJokeIdx] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Pick one random joke safely on client mount
    setJokeIdx(Math.floor(Math.random() * badJokes.length));
  }, []);

  const handleMakeItWorse = () => {
    setBadCount((prev) => prev + 1);
    setJokeIdx((prev) => (prev + 1) % badJokes.length);
  };

  const currentSubheading =
    badCount < escalationMessages.length
      ? escalationMessages[badCount]
      : `You've now made ${badCount + 1} bad decisions. Please seek professional help.`;

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
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">
            YOU WERE WARNED.
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
            Congratulations.
          </motion.h1>

          {/* Dynamic Subheading */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 min-h-[2rem]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={badCount}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="font-display text-xl italic leading-relaxed text-lavender sm:text-2xl md:text-3xl"
              >
                {currentSubheading}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* SpongeBob Awkward GIF */}
          <motion.div
            custom={2}
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

          {/* Personality Line */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex max-w-xl flex-col gap-2 text-mute"
          >
            <p className="text-sm leading-relaxed sm:text-base md:text-lg">
              I respect the commitment.
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={jokeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs italic tracking-wide text-mute-dim sm:text-sm"
              >
                {badJokes[jokeIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 md:mt-10"
          >
            <Link
              href="/"
              data-cursor="ESCAPE"
              className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
            >
              Okay, I&rsquo;m done
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              type="button"
              onClick={handleMakeItWorse}
              data-cursor="WHY?"
              className="flex items-center border border-line/40 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:border-rust hover:text-rust"
            >
              Make it worse
            </button>
          </motion.div>
        </div>

        {/* Footer info */}
        <footer className="relative z-10 flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 HEMANDU</span>
          <span>hemandu.com/bad</span>
        </footer>
      </main>
    </>
  );
}