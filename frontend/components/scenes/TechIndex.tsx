"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  techEcosystem,
  aiSpotlight,
  editorialCategories,
  architecturalRange,
  categoryFeatureMap,
  TechItem,
} from "@/data/techData";
import { TechIcons } from "./tech/TechIcons";
import { cn } from "@/lib/utils";

export default function TechIndex() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Active feature item for the current category view
  const categoryFeatureId = categoryFeatureMap[activeCategory] || "nextjs";

  // Determine currently inspected item (hover > explicit click > category feature default)
  const currentItem = useMemo(() => {
    const targetId = hoveredId || selectedId || categoryFeatureId;
    return techEcosystem.find((t) => t.id === targetId) || techEcosystem[0];
  }, [hoveredId, selectedId, categoryFeatureId]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    return techEcosystem.filter((t) =>
      t.categories.includes(activeCategory as any)
    );
  }, [activeCategory]);

  // Split category items into primary feature vs supporting/utility
  const featuredItem = useMemo(() => {
    return (
      filteredItems.find((t) => t.id === categoryFeatureId) ||
      filteredItems[0] ||
      techEcosystem[0]
    );
  }, [filteredItems, categoryFeatureId]);

  const otherItems = useMemo(() => {
    return filteredItems.filter((t) => t.id !== featuredItem.id);
  }, [filteredItems, featuredItem]);

  // Helper to render icon
  const renderIcon = (iconName: string, isHovered: boolean, sizeClass: string) => {
    const IconComponent = TechIcons[iconName] || TechIcons.generic;
    return <IconComponent className={sizeClass} isHovered={isHovered} />;
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSelectedId(categoryFeatureMap[catId] || null);
    setHoveredId(null);
  };

  return (
    <section
      id="stack"
      className="relative bg-graphite px-6 py-24 sm:px-10 md:px-16 md:py-32 overflow-hidden border-t border-line/50"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-lavender/5 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-rust/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mute-dim"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lavender animate-pulse" />
              <span>04 / ECOSYSTEM</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl italic text-paper tracking-tight"
            >
              I Use
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2.5 font-mono text-xs sm:text-sm text-mute max-w-xl leading-relaxed"
            >
              The stuff between an empty repository and something that actually runs in production.
            </motion.p>
          </div>

          {/* Minimal Editorial Category Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-x-5 gap-y-2 pt-2 md:pt-0"
            role="tablist"
            aria-label="Filter technologies by category"
          >
            {editorialCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  role="tab"
                  aria-selected={isSelected}
                  data-cursor="CLICK"
                  className={cn(
                    "group relative font-mono text-[11px] uppercase tracking-widest transition-all pb-1",
                    isSelected
                      ? "text-lavender font-medium"
                      : "text-mute-dim hover:text-paper"
                  )}
                >
                  <span>{cat.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-lavender"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ================= COMPACT INTERACTION / INSPECTION HUD ================= */}
        <div className="mt-7 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="relative overflow-hidden rounded-xl border border-line-strong bg-graphite-2/95 px-5 py-4 sm:px-6 sm:py-4.5 backdrop-blur-md shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-black/40 text-paper p-2.5">
                    {renderIcon(currentItem.icon, true, "w-6 h-6")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display text-xl sm:text-2xl italic text-paper">
                        {currentItem.name}
                      </h3>
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lavender">
                        {currentItem.categoryLabel}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-mute">
                      {currentItem.role}
                    </p>
                  </div>
                </div>

                {currentItem.joke ? (
                  <div className="sm:max-w-md border-l-2 border-lavender/40 pl-3.5 py-0.5">
                    <p className="font-display italic text-xs sm:text-sm text-paper/90 leading-snug">
                      &ldquo;{currentItem.joke}&rdquo;
                    </p>
                    {currentItem.note && (
                      <p className="mt-0.5 font-mono text-[10px] text-mute-dim">
                        ↗ {currentItem.note}
                      </p>
                    )}
                  </div>
                ) : currentItem.note ? (
                  <div className="sm:max-w-xs font-mono text-[11px] text-mute-dim border-l border-line pl-3 py-0.5">
                    ↗ {currentItem.note}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= CATEGORY-AWARE CURATED VIEW ================= */}
        <div className="space-y-12">
          {/* TOP TIER: CONTEXT-AWARE HERO FEATURE + PRIMARY PEERS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* FEATURED ANCHOR FOR CURRENT CATEGORY */}
            <motion.div
              layout
              key={featuredItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-6 lg:col-span-5"
            >
              <button
                onClick={() => setSelectedId(featuredItem.id)}
                onMouseEnter={() => setHoveredId(featuredItem.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="CORE"
                aria-label={`${featuredItem.name} - ${featuredItem.role}`}
                className={cn(
                  "group relative w-full h-full min-h-[200px] sm:min-h-[230px] flex flex-col justify-between rounded-2xl border p-6 sm:p-7 text-left transition-all duration-400 overflow-hidden",
                  currentItem.id === featuredItem.id
                    ? "border-lavender/60 bg-gradient-to-br from-graphite-2 via-[#18171f] to-black shadow-2xl ring-1 ring-lavender/30"
                    : "border-line-strong bg-gradient-to-br from-graphite-2 to-black/80 hover:border-paper/30"
                )}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lavender/10 blur-2xl transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-paper/80 font-medium">
                      {activeCategory === "all" ? "PRIMARY CENTERPIECE" : `FEATURED ${activeCategory.toUpperCase()}`}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-lavender border border-lavender/30 rounded-full px-2 py-0.5">
                    {featuredItem.categoryLabel}
                  </span>
                </div>

                <div className="my-4 flex items-center gap-5">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-black/60 text-paper p-3 transition-transform duration-400 group-hover:scale-105">
                    {renderIcon(featuredItem.icon, currentItem.id === featuredItem.id, "w-8 h-8 sm:w-9 sm:h-9")}
                  </div>
                  <div>
                    <h4 className="font-display text-2xl sm:text-3xl italic text-paper tracking-tight">
                      {featuredItem.name}
                    </h4>
                    <p className="mt-0.5 font-mono text-xs text-mute">
                      {featuredItem.role}
                    </p>
                  </div>
                </div>

                <div className="border-t border-line/60 pt-3 flex items-center justify-between">
                  <p className="font-display italic text-[11px] sm:text-xs text-paper/70 line-clamp-1">
                    {featuredItem.joke ? `“${featuredItem.joke}”` : featuredItem.role}
                  </p>
                  <span className="font-mono text-xs text-lavender font-bold">
                    ★
                  </span>
                </div>
              </button>
            </motion.div>

            {/* SURROUNDING PEER CARDS */}
            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {otherItems.slice(0, 4).map((tech, idx) => {
                const isInspected = currentItem.id === tech.id;
                return (
                  <motion.button
                    key={tech.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 * idx }}
                    onClick={() => setSelectedId(tech.id)}
                    onMouseEnter={() => setHoveredId(tech.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    data-cursor="LOOK"
                    aria-label={`${tech.name} - ${tech.role}`}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300",
                      isInspected
                        ? "border-lavender/50 bg-graphite-2 shadow-lg ring-1 ring-lavender/20"
                        : "border-line bg-black/30 hover:border-line-strong hover:bg-graphite-2/60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-black/50 text-paper p-2 transition-transform duration-300 group-hover:scale-105">
                        {renderIcon(tech.icon, isInspected, "w-5 h-5")}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-mute-dim">
                        {tech.categoryLabel}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="font-display text-lg italic text-paper group-hover:text-lavender transition-colors">
                        {tech.name}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-mute line-clamp-1">
                        {tech.role}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* SECONDARY / SUPPORTING LAYER FOR CURRENT CATEGORY */}
          {otherItems.length > 4 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute-dim">
                  SUPPORTING & INTEGRATIONS
                </span>
                <span className="font-mono text-[10px] text-mute-dim">
                  {otherItems.length - 4} additional technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {otherItems.slice(4).map((tech, idx) => {
                  const isInspected = currentItem.id === tech.id;
                  return (
                    <motion.button
                      key={tech.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.02 * idx }}
                      onClick={() => setSelectedId(tech.id)}
                      onMouseEnter={() => setHoveredId(tech.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      data-cursor="LOOK"
                      aria-label={`${tech.name} - ${tech.role}`}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-left transition-all duration-300",
                        isInspected
                          ? "border-lavender/50 bg-lavender/10 shadow-sm"
                          : "border-line bg-black/25 hover:border-line-strong hover:bg-graphite-2"
                      )}
                    >
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center text-paper">
                        {renderIcon(tech.icon, isInspected, "w-3.5 h-3.5")}
                      </div>
                      <span className="font-mono text-[11px] text-paper group-hover:text-lavender transition-colors">
                        {tech.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* AI / ML SPOTLIGHT (SHOWN IN ALL AND AI/ML VIEWS) */}
          {(activeCategory === "all" || activeCategory === "ai_data") && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-2xl border border-lavender/30 bg-gradient-to-br from-[#15131c] via-graphite-2 to-black p-6 sm:p-8 shadow-2xl"
            >
              <div
                className="pointer-events-none absolute right-6 top-6 opacity-10 select-none font-mono text-xs text-lavender hidden sm:block"
                aria-hidden="true"
              >
                <p>∇_θ L(θ) = E_x [∇_θ log p_θ(x)]</p>
                <p className="mt-1">f(x) = σ(W^T x + b)</p>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-lavender">
                    <span className="inline-block h-1.5 w-1.5 rounded-sm bg-lavender" />
                    <span>DEGREE & INTELLIGENCE FOUNDATION</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl italic text-paper">
                    {aiSpotlight.degree}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-mute-dim">
                    {aiSpotlight.institution}
                  </p>
                  <p className="mt-3 font-display italic text-xs sm:text-sm text-paper/90 leading-relaxed border-l-2 border-lavender/50 pl-3">
                    &ldquo;{aiSpotlight.quote}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:max-w-md">
                  {aiSpotlight.domains.map((dom) => (
                    <div
                      key={dom}
                      className="flex items-center gap-1.5 rounded-full border border-lavender/20 bg-lavender/5 px-3 py-1 font-mono text-[11px] text-paper backdrop-blur-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-lavender" />
                      <span>{dom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ARCHITECTURAL RANGE FLOW (ONLY IN ALL VIEW) */}
          {activeCategory === "all" && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="border-t border-line/60 pt-8"
            >
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-mute-dim">
                FULL-STACK SPECTRUM FLOW
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {architecturalRange.map((item) => (
                  <div
                    key={item.step}
                    className="relative border-l border-line-strong pl-3 py-1"
                  >
                    <div className="font-mono text-[10px] text-lavender font-semibold">
                      {item.step}
                    </div>
                    <div className="font-display text-xs sm:text-sm italic text-paper mt-0.5">
                      {item.label}
                    </div>
                    <div className="font-mono text-[10px] text-mute-dim mt-0.5 leading-snug">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ================= CLOSING HONESTY NOTE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl text-center border-t border-line/40 pt-10"
        >
          <p className="font-display italic text-base sm:text-lg md:text-xl text-paper/90 leading-relaxed">
            &ldquo;Knowing a technology and knowing when NOT to use it are two completely different skills.&rdquo;
          </p>
          <span className="mt-2.5 block font-mono text-[10px] uppercase tracking-widest text-mute-dim">
            — Practical Architectural Philosophy
          </span>
        </motion.div>
      </div>
    </section>
  );
}
