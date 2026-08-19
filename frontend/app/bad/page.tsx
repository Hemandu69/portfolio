"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CustomCursor from "@/components/cursor/CustomCursor";

const poolJokes = [
  "You could have been doing literally anything else.",
  "Your future self is going to ask what happened here.",
  "I've stopped judging you.",
  "Actually, no. I'm judging you.",
  "Double digits. That's not a milestone, but somehow you made it one.",
  "This page has now become your longest-term commitment.",
  "You clicked a button twelve times because I told you not to.",
  "At this point, I'm less concerned about the website.",
  "You are now part of the problem.",
  "I could stop you. I have chosen not to.",
  "There were better ways to spend your time. And yet, here we are.",
  "This could have been an About page.",
  "No recruiters were harmed in the making of this page.",
  "You clicked it. I merely complied.",
  "This is between you and your browser history.",
  "Your decision-making skills are now under review.",
  "There are better ways to spend your time.",
  "And yet, here we are.",
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
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleNextStep = () => {
    setBranch(null);
    setStep((prev) => prev + 1);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
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
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4"
          >
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
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${branch || "main"}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Congratulations.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You made another bad decision.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    I respect the commitment.
                  </p>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && !branch && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Decision #02
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You had a perfectly good opportunity to leave.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    But apparently we&rsquo;re doing this.
                  </p>
                </>
              )}
              {step === 2 && branch === "lesson" && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Have you?
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    Because you&rsquo;re still here.
                  </p>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && !branch && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Decision #03
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    At this point, this is no longer curiosity.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    You are actively participating.
                  </p>
                </>
              )}
              {step === 3 && branch === "stop" && (
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
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Decision #04
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You have now spent valuable time on a page whose primary feature is telling you that you&rsquo;re making bad decisions.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    Somewhere, productivity is crying.
                  </p>
                </>
              )}

              {/* STEP 5 */}
              {step === 5 && !branch && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Decision #05
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    Okay. You&rsquo;ve made five bad decisions. At this point I feel responsible.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    Would you like to make another one?
                  </p>
                </>
              )}
              {step === 5 && branch === "no" && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    That sounds healthy.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    ...but you can still click the other button.
                  </p>
                </>
              )}

              {/* STEPS 6 to 19 */}
              {step >= 6 && step < 20 && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    Decision #{String(step).padStart(2, "0")}
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    {poolJokes[(step - 6) % poolJokes.length]}
                  </p>
                </>
              )}

              {/* STEP 20+ FINAL STATE */}
              {step >= 20 && !branch && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    YOU ACTUALLY DID IT.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    {step} bad decisions.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
                    I genuinely have nothing left to say. The website has officially given up. Okay. Go outside.
                  </p>
                </>
              )}
              {step >= 20 && branch === "onelast" && (
                <>
                  <h1 className="font-display text-4xl font-light italic leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl">
                    No.
                  </h1>
                  <p className="mt-3 font-display text-xl italic text-lavender sm:text-2xl md:text-3xl">
                    You&rsquo;ve had enough. I am cutting you off.
                  </p>
                </>
              )}

              {/* SpongeBob Awkward GIF Centerpiece */}
              <div className="my-6 max-w-[200px] overflow-hidden rounded-xl border border-line-strong/60 shadow-xl xs:max-w-[240px] sm:max-w-[250px] md:my-8 md:max-w-[260px]">
                <Image
                  src="/images/spongebob-awkward.gif"
                  alt="Awkward SpongeBob"
                  width={260}
                  height={195}
                  unoptimized
                  data-cursor="AWKWARD"
                  className="h-auto w-full object-cover grayscale-[20%] contrast-[1.05]"
                />
              </div>

              {/* Fake Consequence Banner */}
              {fakeConsequence && (
                <div className="mb-6 rounded-lg border border-line-strong/60 bg-white/[0.02] p-4 font-mono text-xs text-lavender">
                  {fakeConsequence}
                </div>
              )}

              {/* Note / Action Prompt */}
              {step === 1 && (
                <p className="mb-6 font-mono text-xs italic tracking-wide text-mute-dim">
                  Unfortunately, this can get worse.
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                {/* STEP 1 BUTTONS */}
                {step === 1 && (
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

                {/* STEP 2 BUTTONS */}
                {step === 2 && !branch && (
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
                )}
                {step === 2 && branch === "lesson" && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="FAIR"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Fair point
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                )}

                {/* STEP 3 BUTTONS */}
                {step === 3 && !branch && (
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
                )}
                {step === 3 && branch === "stop" && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="UNDO"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Undo my progress
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                )}

                {/* STEP 4 BUTTONS */}
                {step === 4 && (
                  <>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      data-cursor="ACCEPT"
                      className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                    >
                      I accept the consequences
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

                {/* STEP 5 BUTTONS */}
                {step === 5 && !branch && (
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
                )}
                {step === 5 && branch === "no" && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    data-cursor="FINE"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Fine.
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                )}

                {/* STEPS 6 to 19 BUTTONS */}
                {step >= 6 && step < 20 && (
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

                {/* STEP 20+ FINAL BUTTONS */}
                {step >= 20 && !branch && (
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
                )}
                {step >= 20 && branch === "onelast" && (
                  <Link
                    href="/"
                    data-cursor="ESCAPE"
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender"
                  >
                    Go home now
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
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