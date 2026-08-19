"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEasterEggs } from "./EasterEggContext";

export default function EasterEggToast() {
  const { activeToast, closeToast } = useEasterEggs();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeToast) {
        closeToast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeToast, closeToast]);

  return (
    <AnimatePresence>
      {activeToast && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 15, scale: shouldReduceMotion ? 1 : 0.95 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[10001] w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-xl border border-line-strong/80 bg-black/95 p-5 font-mono shadow-2xl backdrop-blur-md text-paper sm:max-w-md"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-line-strong/40 pb-3">
            <span className="text-xs font-bold tracking-widest text-lavender uppercase">
              {activeToast.title}
            </span>
            <button
              type="button"
              onClick={closeToast}
              data-cursor="CLOSE"
              className="flex items-center gap-1 rounded border border-line/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-mute transition-colors hover:border-paper hover:text-paper"
            >
              close <X size={12} />
            </button>
          </div>

          {/* Message Content */}
          <div className="my-4 text-xs sm:text-sm leading-relaxed text-mute whitespace-pre-wrap">
            {activeToast.message}
          </div>

          {/* Reward Line */}
          {activeToast.reward && (
            <div className="mb-3 rounded border border-line-strong/40 bg-white/[0.02] p-2.5 text-[11px] text-paper">
              {activeToast.reward}
            </div>
          )}

          {/* Counter Label */}
          {activeToast.countLabel && (
            <div className="flex items-center justify-between pt-1 text-[10px] tracking-wider text-rust font-semibold">
              <span>{activeToast.countLabel}</span>
              <span className="text-mute-dim">ESC to dismiss</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}