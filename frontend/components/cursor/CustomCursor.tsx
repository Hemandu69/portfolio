"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 860px)").matches;
    if (coarse || narrow) return;

    const id = setTimeout(() => setEnabled(true), 0);
    document.documentElement.classList.add("cursor-ready");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") || null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(id);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: label ? (label.length > 4 ? 64 : 52) : hovering ? 40 : 8,
          height: label ? (label.length > 4 ? 64 : 52) : hovering ? 40 : 8,
          backgroundColor: label
            ? "var(--color-lavender)"
            : hovering
            ? "transparent"
            : "var(--color-paper)",
          borderColor: hovering ? "var(--color-lavender)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="flex items-center justify-center rounded-full border"
      >
        {label && (
          <span className="font-mono text-[9px] tracking-widest text-black">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
