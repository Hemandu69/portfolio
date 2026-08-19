"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Smooth delayed spring follower
  const sx = useSpring(x, { stiffness: 450, damping: 35, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 450, damping: 35, mass: 0.35 });

  useEffect(() => {
    // Only enable on desktop / mouse devices with fine pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");

    let lastLabel: string | null = null;
    let lastHover = false;
    let lastInput = false;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      const nextLabel = cursorTarget?.getAttribute("data-cursor") || null;

      const interactiveTarget = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, label"
      );
      const nextHover = Boolean(cursorTarget || interactiveTarget);
      const nextInput = Boolean(target.closest("input, textarea"));

      // Only update React state when hover/label/input status actually changes (zero per-frame re-renders)
      if (nextLabel !== lastLabel) {
        lastLabel = nextLabel;
        setLabel(nextLabel);
      }
      if (nextHover !== lastHover) {
        lastHover = nextHover;
        setHovering(nextHover);
      }
      if (nextInput !== lastInput) {
        lastInput = nextInput;
        setIsInput(nextInput);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[99999] flex items-center justify-center"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? (isInput ? 0 : 1) : 0,
      }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <motion.div
        animate={{
          width: label ? (label.length > 4 ? 64 : 52) : hovering ? 20 : 8,
          height: label ? (label.length > 4 ? 64 : 52) : hovering ? 20 : 8,
          backgroundColor: label
            ? "var(--color-lavender)"
            : hovering
            ? "rgba(242, 238, 232, 0.2)"
            : "var(--color-paper)",
          borderColor: hovering && !label ? "var(--color-lavender)" : "transparent",
          scale: hovering && !label ? 1.25 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="flex items-center justify-center rounded-full border shadow-sm"
      >
        {label && (
          <span className="font-mono text-[9px] font-medium tracking-widest text-black">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
