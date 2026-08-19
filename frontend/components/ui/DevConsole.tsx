"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const randomStatusMessages = [
  "Congratulations. You found the thing nobody was supposed to find.",
  "Security level: decorative.",
  "This console does absolutely nothing useful.",
  "Congratulations on wasting your time productively.",
  "You weren't supposed to be here. But neither was half the CSS.",
  "Developer detected. Pretending to know what everything does.",
  "Everything is under control. Probably.",
];

interface CommandEntry {
  id: string;
  command?: string;
  output: string;
}

export default function DevConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle open / close & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const isTypingInInput =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          (active as HTMLElement).isContentEditable);

      // Shortcut: Ctrl + Shift + ` (Backquote)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "`" || e.key === "~" || e.code === "Backquote")
      ) {
        if (!isTypingInInput) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
        return;
      }

      // Close on Escape if open
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    // Mobile tap listener: 5 taps on logo text within 2s
    let tapCount = 0;
    let lastTapTime = 0;

    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const text = target.closest("a, button, span, div")?.textContent?.trim().toLowerCase();
      if (text && text.includes("hemandu")) {
        const now = Date.now();
        if (now - lastTapTime < 2000) {
          tapCount++;
          if (tapCount >= 5) {
            tapCount = 0;
            setIsOpen(true);
          }
        } else {
          tapCount = 1;
        }
        lastTapTime = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [isOpen]);

  // Lock scroll & pick random status message when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatusMsg(
        randomStatusMessages[
          Math.floor(Math.random() * randomStatusMessages.length)
        ]
      );
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Auto-scroll console to bottom when logs update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = "";

    if (!trimmed) return;

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case "help":
        response = `Available commands:

about     — discover who caused this
status    — check current damage
skills    — inspect questionable abilities
coffee    — check caffeine levels
projects  — investigate suspicious side projects
sudo      — absolutely not
clear     — erase your mistakes
exit      — leave before things escalate`;
        break;

      case "status":
        response = `SYSTEM STATUS

Brain: operational
Motivation: intermittent
Coffee: insufficient
Tabs: concerning
Bugs: emotionally supported
Production confidence: optimistic`;
        break;

      case "about":
        response = `Hemandu.

Full-stack developer.
AI/ML student.
Professional overthinker.
Occasional builder of things that started as "this will take five minutes."`;
        break;

      case "skills":
        response = `Detected skills:

React
Next.js
TypeScript
Node.js
REST APIs
MongoDB
WordPress
AI/ML

Additional skill detected:

Making simple things unnecessarily interesting.`;
        break;

      case "coffee":
        response = `Caffeine level: CRITICAL

Recommendation:
Acquire coffee immediately.`;
        break;

      case "projects":
        response = `Several suspicious projects detected.

Some are useful.
Some started at 2 AM.
One probably should not exist.`;
        break;

      case "sudo":
        response = `Nice try.

You are not getting root access.`;
        break;

      case "eggs": {
        let discovered = 0;
        try {
          const saved = localStorage.getItem("hemandu-easter-eggs");
          if (saved) discovered = JSON.parse(saved).length;
        } catch {
          // ignore
        }
        const total = 10;
        response = `EASTER EGG DATABASE

Status:
Classified

Reason:
Because you cannot be trusted.

Known discoveries:
${discovered}

Remaining:
${Math.max(0, total - discovered)}

Recommendation:
Go outside.`;
        break;
      }

      case "clear":
        setLogs([]);
        setInputValue("");
        return;

      case "exit":
        setIsOpen(false);
        setInputValue("");
        return;

      case "42":
        response = `THE ANSWER HAS BEEN FOUND.

Unfortunately, nobody knows what the question was.`;
        break;

      default:
        response = `Command not recognized: "${trimmed}". Type "help" for available commands.`;
        break;
    }

    setLogs((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), command: cmd, output: response },
    ]);
    setInputValue("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputValue(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputValue("");
        }
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLogs([]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-6 md:p-10"
        >
          {/* Main Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Developer Console"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full max-h-[85dvh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-line-strong/80 bg-neutral-950 font-mono shadow-2xl"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-line-strong/60 px-5 py-3.5 bg-neutral-900/60">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-xs font-bold tracking-widest text-paper">
                  HEMANDU // DEVELOPER CONSOLE
                </span>
                <span className="hidden text-[10px] tracking-wider text-mute-dim sm:inline">
                  STATUS: <span className="text-lavender">probably fine</span> | ENV:{" "}
                  <span className="text-paper">production</span> | CONFIDENCE:{" "}
                  <span className="text-rust">questionable</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                data-cursor="CLOSE"
                className="flex items-center gap-1.5 rounded border border-line/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-mute transition-colors hover:border-lavender hover:text-paper"
              >
                <span className="hidden xs:inline">[ESC]</span> CLOSE
                <X size={13} />
              </button>
            </div>

            {/* Console Scroll Output */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 text-xs sm:text-sm leading-relaxed space-y-4"
            >
              {/* Random Status Message Banner */}
              <div className="rounded border border-lavender/30 bg-lavender/10 p-3 text-lavender font-mono">
                {statusMsg}
              </div>

              {/* Initial Diagnostic Sequence */}
              <div className="space-y-1 text-mute">
                <p className="text-paper font-semibold">&gt; initializing portfolio diagnostics...</p>
                <p><span className="text-emerald-400">[OK]</span> loading questionable decisions</p>
                <p><span className="text-emerald-400">[OK]</span> locating unnecessary animations</p>
                <p><span className="text-emerald-400">[OK]</span> checking caffeine dependency</p>
                <p><span className="text-emerald-400">[OK]</span> checking open browser tabs</p>
                <p><span className="text-amber-400">[WARN]</span> too many tabs detected</p>
                <p><span className="text-amber-400">[WARN]</span> confidence exceeds actual skill level</p>
                <p><span className="text-rust font-bold">[FAIL]</span> productivity module not found</p>
              </div>

              {/* System Report */}
              <div className="rounded border border-line-strong/60 bg-white/[0.02] p-4 text-mute space-y-2">
                <p className="font-bold tracking-widest text-paper">SYSTEM REPORT</p>
                <p className="border-b border-line-strong/40 pb-2 text-mute-dim">----------------------------------------</p>
                <p><strong className="text-paper">Developer:</strong> Hemandu</p>
                <p><strong className="text-paper">Primary stack:</strong> JavaScript / TypeScript / Next.js / React</p>
                <p><strong className="text-paper">Current state:</strong> Turning caffeine into questionable architecture.</p>
                <div className="pt-1">
                  <strong className="text-paper">Known issues:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-mute">
                    <li>Overthinks tiny UI details</li>
                    <li>Has opinions about spacing</li>
                    <li>Will absolutely fix something that was already working</li>
                    <li>&quot;One last change&quot; is statistically unreliable</li>
                  </ul>
                </div>
              </div>

              {/* Command Logs */}
              {logs.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-paper">
                    <span className="text-lavender">&gt;</span>
                    <span className="font-semibold">{entry.command}</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-mute text-xs sm:text-sm pl-4">
                    {entry.output}
                  </pre>
                </div>
              ))}
            </div>

            {/* Command Prompt Input Area */}
            <div className="border-t border-line-strong/60 p-4 bg-neutral-900/40">
              <div className="flex items-center gap-3">
                <span className="text-lavender font-bold">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder='type "help" for absolutely unnecessary information'
                  className="w-full bg-transparent font-mono text-xs sm:text-sm text-paper placeholder:text-mute-dim/60 focus:outline-none"
                />
              </div>

              <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-mute-dim">
                <span>ESC — exit before this gets worse</span>
                <span className="hidden sm:inline">Use ↑↓ for history | Ctrl+L to clear</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}