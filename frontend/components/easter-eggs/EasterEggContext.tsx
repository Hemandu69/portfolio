"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  EASTER_EGGS,
  REPEAT_MESSAGES,
  getHumorousCountLabel,
} from "@/data/easterEggs";

interface ActiveToast {
  id: string;
  title: string;
  message: string;
  reward?: string;
  countLabel?: string;
  isCompletion?: boolean;
}

interface EasterEggContextType {
  discoveredIds: string[];
  totalEggs: number;
  activeToast: ActiveToast | null;
  discoverEgg: (id: string) => void;
  closeToast: () => void;
}

const STORAGE_KEY = "hemandu-easter-eggs";

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [activeToast, setActiveToast] = useState<ActiveToast | null>(null);
  const clickCountsRef = useRef<Record<string, number>>({});
  const lastClickTimeRef = useRef<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setDiscoveredIds(parsed);
        }
      }
    } catch {
      // Gracefully ignore localStorage errors
    }
  }, []);

  const totalEggs = Object.keys(EASTER_EGGS).length;

  const discoverEgg = (id: string) => {
    const now = Date.now();
    // Debounce fast multi-clicks (500ms)
    if (now - lastClickTimeRef.current < 500) return;
    lastClickTimeRef.current = now;

    const config = EASTER_EGGS[id];
    if (!config) return;

    const isFirstTime = !discoveredIds.includes(id);
    const clickCount = (clickCountsRef.current[id] || 0) + 1;
    clickCountsRef.current[id] = clickCount;

    let newDiscovered = discoveredIds;
    if (isFirstTime) {
      newDiscovered = [...discoveredIds, id];
      setDiscoveredIds(newDiscovered);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newDiscovered));
      } catch {
        // Fallback in-memory
      }
    }

    const isAllFound = newDiscovered.length >= totalEggs && isFirstTime;

    if (isAllFound) {
      setActiveToast({
        id,
        title: "ALL EASTER EGGS FOUND.",
        message:
          "There is no prize. You knew there wouldn't be. You have officially spent enough time here. Please go do something productive.\n\n...Actually, never mind. You're already here.",
        reward: "Final Status: Legendary Overthinker",
        countLabel: "10/10 secrets unlocked.",
        isCompletion: true,
      });
      return;
    }

    if (isFirstTime) {
      const randomMsg =
        config.messages[Math.floor(Math.random() * config.messages.length)];
      setActiveToast({
        id,
        title: config.title,
        message: randomMsg,
        reward: config.reward,
        countLabel: getHumorousCountLabel(newDiscovered.length),
      });
    } else {
      // Repeat clicks
      const repeatIdx = Math.min(clickCount - 2, REPEAT_MESSAGES.length - 1);
      const repeatMsg = REPEAT_MESSAGES[Math.max(0, repeatIdx)];
      setActiveToast({
        id,
        title: "DISCOVERED AGAIN",
        message: repeatMsg,
        countLabel: getHumorousCountLabel(discoveredIds.length),
      });
    }
  };

  const closeToast = () => setActiveToast(null);

  return (
    <EasterEggContext.Provider
      value={{
        discoveredIds,
        totalEggs,
        activeToast,
        discoverEgg,
        closeToast,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error("useEasterEggs must be used within an EasterEggProvider");
  }
  return context;
}