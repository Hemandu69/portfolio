"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingSequences = [
  [
    "Negotiating with the CSS.",
    "Bribing the server.",
    "Making things look intentional.",
    "Alright. It survived.",
  ],
  [
    "Convincing the pixels to cooperate.",
    "Loading questionable decisions.",
    "Compiling unnecessary confidence.",
    "Good enough. Let them in.",
  ],
  [
    "Checking if production is still alive.",
    "Politely asking JavaScript to work.",
    "Almost done pretending this was easy.",
    "Alright. It survived.",
  ],
  [
    "Teaching the website how to behave.",
    "Removing bugs that definitely weren't there five minutes ago.",
    "Applying unnecessary attention to detail.",
    "Good enough. Let them in.",
  ],
  [
    "Making sure nothing catches fire.",
    "Checking the tabs. There are too many.",
    "Preparing an unnecessarily dramatic portfolio.",
    "Alright. It survived.",
  ],
];

export default function Loader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [seqIdx, setSeqIdx] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Pick a random sequence on client mount
    setSeqIdx(Math.floor(Math.random() * loadingSequences.length));

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
    const duration = 1500;
    let raf: number;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor(p * 100));

      if (p < 0.33) {
        setMsgIdx(0);
      } else if (p < 0.66) {
        setMsgIdx(1);
      } else if (p < 0.92) {
        setMsgIdx(2);
      } else {
        setMsgIdx(3);
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 280);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const activeSequence = loadingSequences[seqIdx] || loadingSequences[0];

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

          <div className="mt-4 min-h-[2.25rem] max-w-md flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-xs italic tracking-wide text-mute md:text-sm"
              >
                {activeSequence[msgIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="mt-3 font-mono text-[10px] tracking-[0.3em] text-mute-dim uppercase">
            {String(count).padStart(2, "0")} — 100
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
