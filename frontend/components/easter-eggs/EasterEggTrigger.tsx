"use client";

import React from "react";
import { useEasterEggs } from "./EasterEggContext";

interface EasterEggTriggerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function EasterEggTrigger({
  id,
  children,
  className = "",
}: EasterEggTriggerProps) {
  const { discoverEgg } = useEasterEggs();

  return (
    <span
      onClick={() => discoverEgg(id)}
      className={`inline ${className}`}
      style={{ cursor: "inherit" }}
    >
      {children}
    </span>
  );
}