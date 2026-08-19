"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
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
    const duration = 900;
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
        }, 250);
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
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black"
        >
          <span className="font-display text-2xl italic text-paper">
            Hemandu
          </span>
          <span className="mt-3 font-mono text-[11px] tracking-[0.3em] text-mute">
            {String(count).padStart(2, "0")} — 100
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
