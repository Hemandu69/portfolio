"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/cursor/CustomCursor";

interface BadIterationConfig {
  id: number;
  image: string;
  alt: string;
  heading: string;
  subheading: string;
  copy: string;
  note?: string;
}

const badIterations: BadIterationConfig[] = [
  {
    id: 1,
    image: "/images/bad/spongebob-awkward.gif",
    alt: "SpongeBob awkward look",
    heading: "Congratulations.",
    subheading: "You made another bad decision.",
    copy: "I respect the commitment.",
    note: "Unfortunately, this can get worse.",
  },
  {
    id: 2,
    image: "/images/bad/less concern.webp",
    alt: "Mild concern",
    heading: "Decision #02",
    subheading: "You had a perfectly good opportunity to leave.",
    copy: "But apparently we're doing this.",
  },
  {
    id: 3,
    image: "/images/bad/side-eye-side-eye-meme.gif",
    alt: "Side eye meme",
    heading: "Decision #03",
    subheading: "At this point, this is no longer curiosity.",
    copy: "You are actively participating.",
  },
  {
    id: 4,
    image: "/images/bad/more concern.webp",
    alt: "More concern",
    heading: "Decision #04",
    subheading: "You have now spent valuable time on a page whose primary feature is telling you that you're making bad decisions.",
    copy: "Somewhere, productivity is crying.",
  },
  {
    id: 5,
    image: "/images/bad/regret.webp",
    alt: "Regret begins",
    heading: "Decision #05",
    subheading: "Okay. You've made five bad decisions. At this point I feel responsible.",
    copy: "Would you like to make another one?",
  },
  {
    id: 6,
    image: "/images/bad/more regret.webp",
    alt: "Growing regret",
    heading: "Decision #06",
    subheading: "You could have been doing literally anything else.",
    copy: "This is becoming difficult to defend.",
  },
  {
    id: 7,
    image: "/images/bad/more awkward.webp",
    alt: "More awkward",
    heading: "Decision #07",
    subheading: "Your future self is going to ask what happened here.",
    copy: "I'm just documenting your choices.",
  },
  {
    id: 8,
    image: "/images/bad/regret.webp",
    alt: "Heavy judgment",
    heading: "Decision #08",
    subheading: "I've stopped judging you.",
    copy: "Actually, no. I'm judging you.",
  },
  {
    id: 9,
    image: "/images/bad/more awkward.webp",
    alt: "Deep awkwardness",
    heading: "Decision #09",
    subheading: "This URL has achieved absolutely nothing.",
    copy: "You have absolutely no one to blame.",
  },
  {
    id: 10,
    image: "/images/bad/chaos.webp",
    alt: "Chaos starts",
    heading: "Decision #10",
    subheading: "Double digits. That's not a milestone.",
    copy: "But somehow you made it one.",
  },
  {
    id: 11,
    image: "/images/bad/more chaos.gif",
    alt: "Increasing chaos",
    heading: "Decision #11",
    subheading: "This page has now become your longest-term commitment.",
    copy: "I don't know what you expected.",
  },
  {
    id: 12,
    image: "/images/bad/chaos.webp",
    alt: "Building chaos",
    heading: "Decision #12",
    subheading: "You clicked a button twelve times because I told you not to.",
    copy: "At this point, I'm less concerned about the website.",
  },
  {
    id: 13,
    image: "/images/bad/more chaos.gif",
    alt: "Chaos escalating",
    heading: "Decision #13",
    subheading: "At this point, I'm less concerned about the website.",
    copy: "You are now part of the problem.",
  },
  {
    id: 14,
    image: "/images/bad/chaos.webp",
    alt: "Total chaos",
    heading: "Decision #14",
    subheading: "You are now part of the problem.",
    copy: "This could have been an About page.",
  },
  {
    id: 15,
    image: "/images/bad/more chaos.gif",
    alt: "High chaos gif",
    heading: "Decision #15",
    subheading: "I could stop you. I have chosen not to.",
    copy: "No recruiters were harmed in the making of this page.",
  },
  {
    id: 16,
    image: "/images/bad/the-final-boss.webp",
    alt: "Approaching final boss",
    heading: "Decision #16",
    subheading: "Your decision-making skills are now under review.",
    copy: "This is between you and your browser history.",
  },
  {
    id: 17,
    image: "/images/bad/more chaos.gif",
    alt: "Absolute disaster",
    heading: "Decision #17",
    subheading: "There were better ways to spend your time.",
    copy: "And yet, here we are.",
  },
  {
    id: 18,
    image: "/images/bad/the-final-boss.webp",
    alt: "Near final boss",
    heading: "Decision #18",
    subheading: "You clicked it. I merely complied.",
    copy: "You had 17 opportunities to stop.",
  },
  {
    id: 19,
    image: "/images/bad/the-final-boss.webp",
    alt: "Penultimate bad decision",
    heading: "Decision #19",
    subheading: "You chose violence instead.",
    copy: "We are approaching the end of this nonsense.",
  },
  {
    id: 20,
    image: "/images/bad/final page image.webp",
    alt: "Final page boss image",
    heading: "YOU ACTUALLY DID IT.",
    subheading: "20 bad decisions.",
    copy: "I genuinely have nothing left to say. The website has officially given up. Okay. Go outside.",
  },
];

function getRegretLabel(count: number): string {
  if (count <= 2) return "QUESTIONABLE";
  if (count <= 4) return "CONCERNING";
  if (count <= 6) return "WHY";
  if (count <= 8) return "PLEASE STOP";
  if (count <= 10) return "THIS IS GETTING EMBARRASSING";
  if (count <= 14) return "UNREASONABLE";
  if (count <= 19) return "WE NEED TO TALK";
  return "OFFICIALLY GIVEN UP";
}

function getFakeConsequence(count: number): string | null {
  if (count === 3) return "Consequence unlocked: You have wasted approximately 14 seconds of your life.";
  if (count === 5) return "Consequence unlocked: Your productivity has decreased by 0.0003%.";
  if (count === 8) return "Consequence unlocked: You now know this page exists.";
  if (count === 10) return "Consequence unlocked: Nothing. Absolutely nothing happened.";
  if (count === 15) return "Consequence unlocked: Somewhere, a UX designer is crying.";
  if (count >= 20) return "Consequence unlocked: Ultimate enlightenment (or severe regret).";
  return null;
}

export default function BadPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [branch, setBranch] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const currentIteration = badIterations[stepIndex] || badIterations[badIterations.length - 1];
  const step = currentIteration.id;

  const handleNextStep = () => {
    setBranch(null);
    setStepIndex((prev) => Math.min(prev + 1, badIterations.length - 1));
  };

  const fakeConsequence = getFakeConsequence(step);

  return (
    <>
      <CustomCursor />

      <main className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-black px-6 py-10 sm:px-10 md:px-16 md:py-14 select-none">
        {/* Ambient radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(169,156,194,0.08),transparent_65%)]" />

        {/* Top Header */}
        <header className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            data-cursor="HOME"
            className="font-display text-2xl italic text-paper transition-opacity hover:opacity-80 md:text-3xl"
          >
            Hemandu
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-rust">
            YOU WERE WARNED.
          </span>
        </header>

        {/* Center Content Area */}
        <div className="relative z-10 my-auto flex max-w-4xl flex-col py-8 md:py-12">
          {/* Regret Meter & Decision Counter */}
          <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute-dim">
              BAD DECISION <strong className="text-paper">#{String(step).padStart(2, "0")}</strong>
            </span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span
              data-cursor="OOF"
              className="rounded-full border border-rust/40 bg-rust/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-rust"
            >
              REGRET LEVEL: {getRegretLabel(step)}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${branch || "main"}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* HEADING & SUBHEADING */}
              {step === 2 && branch === "lesson" ? (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Have you?
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    Because you&rsquo;re still here.
                  </p>
                </>
              ) : step === 3 && branch === "stop" ? (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Interesting.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You clicked STOP on a page specifically designed to make you click things.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    That is technically progress.
                  </p>
                </>
              ) : step === 5 && branch === "no" ? (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    That sounds healthy.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    ...but you can still click the other button.
                  </p>
                </>
              ) : step >= 20 && branch === "onelast" ? (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    No.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You&rsquo;ve had enough. I am cutting you off.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    {currentIteration.heading}
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    {currentIteration.subheading}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    {currentIteration.copy}
                  </p>
                </>
              )}

              {/* PROGRESSIVE IMAGE DISPLAY */}
              <div className="relative my-6 max-w-[260px] sm:max-w-[320px] max-h-[300px] overflow-hidden rounded-xl border border-line-strong/60 shadow-xl bg-neutral-950/80 flex items-center justify-center p-1 md:my-8">
                <Image
                  src={currentIteration.image}
                  alt={currentIteration.alt}
                  width={320}
                  height={300}
                  priority
                  unoptimized
                  data-cursor="AWKWARD"
                  className="h-auto max-h-[280px] w-auto max-w-full rounded-lg object-contain grayscale-[15%] contrast-[1.05]"
                />
              </div>

              {/* Fake Consequence Banner */}
              {fakeConsequence && (
                <div className="mb-6 rounded-lg border border-line-strong/60 bg-white/[0.02] p-4 font-mono text-xs text-lavender max-w-xl">
                  {fakeConsequence}
                </div>
              )}

              {/* Optional Note */}
              {currentIteration.note && !branch && (
                <p className="mb-6 font-mono text-xs italic tracking-wide text-mute-dim">
                  {currentIteration.note}
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                {step === 2 && branch === "lesson" ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="FAIR"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Fair point
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : step === 3 && branch === "stop" ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="UNDO"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Undo my progress
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : step === 5 && branch === "no" ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="FINE"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Fine.
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : step >= 20 && branch === "onelast" ? (
                  <Link
                    href="/"
                    data-cursor="ESCAPE"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Go home now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : step === 2 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      data-cursor="BAD IDEA"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      Yes, obviously
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBranch("lesson")}
                      data-cursor="PRETEND"
                      className="flex items-center border border-line/40 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:border-rust hover:text-rust"
                    >
                      I have learned my lesson
                    </button>
                  </>
                ) : step === 3 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      data-cursor="BAD IDEA"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      Continue
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBranch("stop")}
                      data-cursor="STOP"
                      className="flex items-center border border-line/40 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:border-rust hover:text-rust"
                    >
                      Stop
                    </button>
                  </>
                ) : step === 5 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      data-cursor="BAD IDEA"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      Absolutely
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setBranch("no")}
                      data-cursor="NO"
                      className="flex items-center border border-line/40 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:border-rust hover:text-rust"
                    >
                      No
                    </button>
                  </>
                ) : step >= 20 ? (
                  <>
                    <Link
                      href="/"
                      data-cursor="ESCAPE"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      Fine, I&rsquo;m going home
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBranch("onelast")}
                      data-cursor="WHY?"
                      className="flex items-center border border-line/40 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:border-rust hover:text-rust"
                    >
                      One last bad decision
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      data-cursor="BAD IDEA"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      Continue making bad decisions
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <Link
                      href="/"
                      data-cursor="ESCAPE"
                      className="flex items-center px-4 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-mute-dim transition-colors hover:text-mute"
                    >
                      Get me out of here
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <footer className="relative z-10 flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 HEMANDU</span>
          <span>hemandu.com/bad</span>
        </footer>
      </main>
    </>
  );
}