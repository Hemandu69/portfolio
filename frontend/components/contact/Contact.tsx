"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contactEasterEggs } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

function getEmailValidationError(email: string): string | null {
  const trimmed = email.trim();

  // 1. Empty email
  if (!trimmed) {
    return "Your email is required. Unfortunately, telepathy isn't supported yet.";
  }

  // 2. Spaces in the email
  if (/\s/.test(email)) {
    return "The space has entered the chat. Please remove it.";
  }

  // 3. Consecutive dots
  if (/\.\./.test(trimmed)) {
    return "Two dots? Your email is trying to start a new paragraph.";
  }

  // 4. Missing @
  if (!trimmed.includes("@")) {
    return "That email is missing an @. Even emails need directions.";
  }

  const parts = trimmed.split("@");
  if (parts.length > 2) {
    return "Nice try. That's a username wearing an email costume.";
  }

  const [localPart, domainPart] = parts;

  // Local part empty (e.g. "@gmail.com")
  if (!localPart) {
    return "Nice try. That's a username wearing an email costume.";
  }

  // 5. Missing domain after @ (e.g. "hello@")
  if (!domainPart) {
    return "Your email forgot where it lives.";
  }

  // Domain missing a dot (e.g. "hello@gmail")
  if (!domainPart.includes(".")) {
    return "Your email forgot where it lives.";
  }

  const domainSubparts = domainPart.split(".");
  const tld = domainSubparts[domainSubparts.length - 1];

  // 6. Domain extension too short / incomplete (e.g. "hello@gmail.c")
  if (!tld || tld.length < 2) {
    return "That's a little too short to be an email address.";
  }

  // 7. General RFC standard email regex check
  const standardEmailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9-]{2,}$/;
  if (!standardEmailRegex.test(trimmed)) {
    return "That email looks suspiciously unfinished.";
  }

  return null;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Client-safe random starting index to prevent SSR hydration mismatch
    setMsgIdx(Math.floor(Math.random() * contactEasterEggs.length));

    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % contactEasterEggs.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Validate email before sending
    const validationError = getEmailValidationError(form.email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }
    setEmailError(null);

    setStatus("sending");
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
        "https://portfolio.hemandu.com";
      const endpoint = `${baseUrl}/api/contact`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.success === false)) {
        throw new Error(data?.message || "Failed to deliver message");
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative bg-black px-6 py-28 sm:px-10 md:px-16 md:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[15vw] italic leading-[0.88] text-paper sm:text-[9vw] md:text-[6vw]"
        >
          Alright.
          <br />
          Your turn.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-mute md:text-base"
        >
          Got a project? An idea? A suspiciously ambitious side project?
        </motion.p>

        <div className="mt-14 min-h-[300px]">
          <AnimatePresence mode="wait">
            {status !== "sent" ? (
              <motion.form
                key="form"
                noValidate
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => {
                    setForm((f) => ({ ...f, email: v }));
                    if (emailError) {
                      const err = getEmailValidationError(v);
                      if (!err) setEmailError(null);
                    }
                  }}
                  onBlur={() => {
                    if (form.email) {
                      setEmailError(getEmailValidationError(form.email));
                    }
                  }}
                  error={emailError}
                  required
                />
                <Field
                  label="Message"
                  textarea
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  required
                />

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    data-cursor="SAY HI"
                    disabled={status === "sending"}
                    className="group flex items-center gap-3 border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-lavender hover:text-lavender disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send it"}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                  {status === "error" && (
                    <span className="font-mono text-xs text-rust">
                      Well, that went beautifully wrong. Your message is still here. Give it another shot.
                    </span>
                  )}
                </div>

                <div className="min-h-[1.5rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={msgIdx}
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
                      className="font-mono text-[11px] italic text-mute-dim"
                    >
                      {contactEasterEggs[msgIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-display text-[11vw] italic text-lavender sm:text-[6.5vw] md:text-[4vw] leading-tight block">
                  And... it&rsquo;s gone.
                </span>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-mute md:text-base">
                  Your message has successfully escaped into Hemandu&rsquo;s inbox. He&rsquo;s probably reading it right now, pretending he wasn&rsquo;t checking his inbox every five minutes.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  textarea,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string | null;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`group flex flex-col gap-2 border-b pb-3 transition-colors ${error ? "border-rust" : "border-line focus-within:border-lavender"}`}>
        <span className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${error ? "text-rust" : "text-mute-dim group-focus-within:text-lavender"}`}>
          {label}
        </span>
        {textarea ? (
          <textarea
            required={required}
            value={value}
            rows={2}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className="resize-none bg-transparent font-display text-xl text-paper outline-none placeholder:text-mute-dim md:text-2xl"
          />
        ) : (
          <input
            required={required}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className="bg-transparent font-display text-xl text-paper outline-none placeholder:text-mute-dim md:text-2xl"
          />
        )}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-rust"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
