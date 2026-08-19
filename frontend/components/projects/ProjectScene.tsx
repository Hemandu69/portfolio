"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const toneMap = {
  lavender: { text: "text-lavender", border: "border-lavender-dim/50", dot: "bg-lavender" },
  rust: { text: "text-rust", border: "border-rust/40", dot: "bg-rust" },
  mute: { text: "text-mute", border: "border-line-strong", dot: "bg-mute" },
};

export default function ProjectScene({
  project,
  flip,
}: {
  project: Project;
  flip?: boolean;
}) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 1.08]);
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const tone = toneMap[project.tone];
  const primaryUrl = project.links?.[0]?.url || project.link?.url;
  const hasImages = project.images && project.images.length > 0;

  return (
    <section
      ref={ref}
      id={project.index === "01" ? "work" : undefined}
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 sm:px-10 md:px-16"
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center md:gap-16",
          flip && "md:flex-row-reverse"
        )}
      >
        {/* text block */}
        <motion.div style={{ y: textY }} className="relative z-10 md:w-[38%]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-mute-dim">
              {project.index} / {project.tech.length} tools
            </span>
            {project.status && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                  tone.border,
                  tone.text
                )}
              >
                <span className={cn("h-1 w-1 rounded-full animate-pulse", tone.dot)} />
                {project.status}
              </span>
            )}
          </div>

          <h3 className="mt-4 font-display text-[13vw] italic leading-[0.92] text-paper sm:text-[7vw] md:text-[4.4vw]">
            {project.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute md:text-base">
            {project.description}
          </p>

          {project.note && (
            <p className="mt-3 max-w-sm font-display italic text-xs text-paper/75 leading-relaxed">
              &ldquo;{project.note}&rdquo;
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-mute-dim"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links && project.links.length > 0 ? (
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.links.map((lnk) => (
                <a
                  key={lnk.label}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LOOK"
                  aria-label={`${lnk.label} for ${project.title.join(" ")} (opens in a new tab)`}
                  className={cn(
                    "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:underline underline-offset-4",
                    tone.text
                  )}
                >
                  <span>{lnk.label}</span>
                </a>
              ))}
            </div>
          ) : project.link ? (
            <div className="mt-7">
              <a
                href={project.link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LOOK"
                aria-label={`${project.link.label} for ${project.title.join(" ")} (opens in a new tab)`}
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:underline underline-offset-4",
                  tone.text
                )}
              >
                <span>{project.link.label}</span>
              </a>
            </div>
          ) : null}
        </motion.div>

        {/* visual — real project screenshot with existing editorial styling */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
          data-cursor="VIEW"
          className={cn(
            "group relative aspect-[4/3] w-full overflow-hidden border bg-graphite-2 md:w-[62%]",
            tone.border
          )}
        >
          {/* Subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.25]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(242,238,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,238,232,0.06) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {hasImages ? (
            <div className="relative h-full w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.images![activeImgIdx]}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex h-full w-full items-center justify-center p-3 sm:p-5"
                >
                  {project.id === "quick-notes" ? (
                    /* Mobile Android screenshot presentation */
                    <div className="relative h-full w-full flex items-center justify-center gap-4">
                      <div className="relative h-[92%] aspect-[9/19] rounded-2xl overflow-hidden border border-line-strong shadow-2xl bg-black">
                        <Image
                          src={project.images![activeImgIdx]}
                          alt={`${project.title.join(" ")} screenshot`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </div>
                      {project.images!.length > 1 && (
                        <div className="hidden sm:block relative h-[78%] aspect-[9/19] rounded-xl overflow-hidden border border-line opacity-40 hover:opacity-100 transition-opacity bg-black">
                          <Image
                            src={project.images![(activeImgIdx + 1) % project.images!.length]}
                            alt={`${project.title.join(" ")} secondary preview`}
                            fill
                            className="object-cover object-top"
                            sizes="25vw"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Web / Desktop screenshot presentation */
                    <div className="relative h-full w-full rounded-lg overflow-hidden border border-line-strong shadow-2xl bg-black/80">
                      <Image
                        src={project.images![activeImgIdx]}
                        alt={`${project.title.join(" ")} screenshot`}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Clickable link overlay to open project */}
              {primaryUrl && (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title.join(" ")} (opens in a new tab)`}
                  className="absolute inset-0 z-20 block"
                />
              )}
            </div>
          ) : (
            /* Fallback typography placeholder */
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-center justify-between">
                <span className={cn("h-2 w-2 rounded-full", tone.dot)} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-dim">
                  {primaryUrl ? "Live Preview" : "Preview"}
                </span>
              </div>
              <span
                className={cn(
                  "font-display text-[9vw] italic leading-none sm:text-[5vw] md:text-[3.2vw]",
                  tone.text
                )}
              >
                {project.title.join(" ")}
              </span>
            </div>
          )}

          {/* Top metadata badge & image switcher if multiple screenshots */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-md border border-line">
              <span className={cn("h-2 w-2 rounded-full", tone.dot)} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">
                {primaryUrl ? "Live Preview" : "Screenshot"}
              </span>
            </div>

            {hasImages && project.images!.length > 1 && (
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 p-1 backdrop-blur-md border border-line">
                {project.images!.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setActiveImgIdx(idx);
                    }}
                    aria-label={`View screenshot ${idx + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      activeImgIdx === idx
                        ? cn("w-5", tone.dot)
                        : "w-2 bg-mute-dim/50 hover:bg-paper/60"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
