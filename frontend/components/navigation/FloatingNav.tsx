"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Plus, X } from "lucide-react";
import { navLinks, person } from "@/data/portfolio";

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setShrink(v > 80);
  });

  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
      >
        <motion.div
          animate={{
            paddingLeft: shrink ? 14 : 22,
            paddingRight: shrink ? 8 : 10,
            paddingTop: shrink ? 8 : 10,
            paddingBottom: shrink ? 8 : 10,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-6 rounded-full border border-line-strong bg-black/60 backdrop-blur-md sm:gap-8"
        >
          <a
            href="#top"
            data-cursor="TOP"
            className="font-display text-[13px] italic tracking-wide text-paper"
          >
            {person.first}
          </a>

          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="VIEW"
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-mute transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong sm:hidden"
          >
            <Plus size={13} className="text-paper" />
          </button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-5 z-50 w-[86vw] max-w-xs -translate-x-1/2 rounded-3xl border border-line-strong bg-black/95 p-6 backdrop-blur-md sm:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-sm italic text-paper">
                {person.first}
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong"
              >
                <X size={13} className="text-paper" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-mute"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
