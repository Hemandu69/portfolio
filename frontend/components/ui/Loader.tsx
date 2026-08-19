"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loaderJokes = [
  "Negotiating with the CSS.",
  "Politely asking JavaScript to work.",
  "Bribing the server.",
  "Making things look intentional.",
  "Loading questionable decisions.",
  "Teaching the website how to behave.",
  "Checking if production is still alive.",
  "Compiling unnecessary confidence.",
  "Applying unnecessary attention to detail.",
  "Removing bugs that definitely weren't there five minutes ago.",
  "Checking the tabs. There are too many.",
  "Preparing an unnecessarily dramatic portfolio.",
  "Convincing the pixels to cooperate.",
  "Making sure nothing catches fire.",
  "Almost done pretending this was easy.",
  "Loading... because apparently that's still a thing.",
  "Asking the internet to remain stable.",
  "Giving the server a motivational speech.",
  "Making this look more intentional than it was.",
  "Checking whether this was actually a good idea.",
];

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [jokeIdx, setJokeIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Pick ONE random joke safely on client mount
    setJokeIdx(Math.floor(Math.random() * loaderJokes.length));

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const id = setTimeout(() => {
        setDone(true);
        onDone?.();
      }, 0);
      return () => clearTimeout(id);
    }

    const start = performance.now();
    const duration = 1100;
    let raf: number;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor(p * 100));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 200);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black px-6 text-center select-none"
        >
          <span className="font-display text-2xl italic text-paper md:text-3xl">
            Hemandu
          </span>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-4 max-w-md font-mono text-xs italic tracking-wide text-mute md:text-sm"
          >
            {loaderJokes[jokeIdx]}
          </motion.p>

          <span className="mt-4 font-mono text-[10px] tracking-[0.3em] text-mute-dim uppercase">
            {String(count).padStart(2, "0")} — 100
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
