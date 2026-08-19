"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contactEasterEggs } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

const nameEmptyPool = [
  "Your name is required. I need someone to blame when this email gets interesting.",
  "I need a name. Preferably yours.",
  "Your name is required. Telepathy is still in beta.",
];

function getNameValidationError(name: string): string | null {
  const trimmed = name.trim();

  // 1. Empty name
  if (!name) {
    const randomIdx = Math.floor(Math.random() * nameEmptyPool.length);
    return nameEmptyPool[randomIdx];
  }

  // 2. Only whitespace
  if (name.length > 0 && !trimmed) {
    return "That's technically a name-shaped amount of whitespace.";
  }

  // 3. Too short (single character)
  if (trimmed.length < 2) {
    return "That's suspiciously short. Even your Wi-Fi password has more commitment.";
  }

  // 4. Check if name contains only numbers or special punctuation without letters
  // Supports international letters, spaces, hyphens, apostrophes
  const hasLetters = /\p{L}/u.test(trimmed);
  if (!hasLetters) {
    return "Let's keep the identity crisis out of the name field.";
  }

  return null;
}

const emailEmptyPool = [
  "Your email is required. Unfortunately, telepathy isn't supported yet.",
  "Nice try. That's a username wearing an email costume.",
  "Your email forgot where it lives.",
];

function getEmailValidationError(email: string): string | null {
  const trimmed = email.trim();

  // 1. Empty email
  if (!email) {
    const randomIdx = Math.floor(Math.random() * emailEmptyPool.length);
    return emailEmptyPool[randomIdx];
  }

  // 2. Only spaces
  if (!trimmed) {
    return "Your email is required. Unfortunately, telepathy isn't supported yet.";
  }

  // 3. Spaces in the email
  if (/\s/.test(email)) {
    return "The space has entered the chat. Please remove it.";
  }

  // 4. Consecutive dots
  if (/\.\./.test(trimmed)) {
    return "Two dots? Your email is trying to start a new paragraph.";
  }

  // 5. Missing @
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

  // 6. Missing domain after @ (e.g. "hello@")
  if (!domainPart) {
    return "Your email forgot where it lives.";
  }

  // Domain missing a dot (e.g. "hello@gmail")
  if (!domainPart.includes(".")) {
    return "Your email forgot where it lives.";
  }

  const domainSubparts = domainPart.split(".");
  const tld = domainSubparts[domainSubparts.length - 1];

  // 7. Domain extension too short / incomplete (e.g. "hello@gmail.c")
  if (!tld || tld.length < 2) {
    return "That's a little too short to be an email address.";
  }

  // 8. General RFC standard email regex check
  const standardEmailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z0-9-]{2,}$/;
  if (!standardEmailRegex.test(trimmed)) {
    return "That email looks suspiciously unfinished.";
  }

  return null;
}

const messageEmptyPool = [
  "You came all the way here and brought no message?",
  "Your message has entered witness protection.",
  "Your message seems to have mysteriously disappeared.",
];

const messageShortPool = [
  "That's barely a message. Give me at least a little something to work with.",
  "Is this a message or a trailer?",
  "That's it? I was emotionally prepared for at least one more sentence.",
  "Please provide slightly more evidence that you meant to contact me.",
];

function getMessageValidationError(message: string): string | null {
  const trimmed = message.trim();

  // 1. Empty message
  if (!message) {
    const randomIdx = Math.floor(Math.random() * messageEmptyPool.length);
    return messageEmptyPool[randomIdx];
  }

  // 2. Only whitespace
  if (message.length > 0 && !trimmed) {
    return "That's a lot of whitespace for someone with so much to say.";
  }

  // 3. Too short (< 3 characters)
  if (trimmed.length < 3) {
    const randomIdx = Math.floor(Math.random() * messageShortPool.length);
    return messageShortPool[randomIdx];
  }

  return null;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    message: string | null;
  }>({ name: null, email: null, message: null });
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

    // Validate all fields before sending
    const nameErr = getNameValidationError(form.name);
    const emailErr = getEmailValidationError(form.email);
    const messageErr = getMessageValidationError(form.message);

    if (nameErr || emailErr || messageErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        message: messageErr,
      });
      return;
    }
    setErrors({ name: null, email: null, message: null });

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
                  onChange={(v) => {
                    setForm((f) => ({ ...f, name: v }));
                    if (errors.name) {
                      const err = getNameValidationError(v);
                      if (!err) setErrors((prev) => ({ ...prev, name: null }));
                    }
                  }}
                  onBlur={() => {
                    if (form.name) {
                      setErrors((prev) => ({
                        ...prev,
                        name: getNameValidationError(form.name),
                      }));
                    }
                  }}
                  error={errors.name}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => {
                    setForm((f) => ({ ...f, email: v }));
                    if (errors.email) {
                      const err = getEmailValidationError(v);
                      if (!err) setErrors((prev) => ({ ...prev, email: null }));
                    }
                  }}
                  onBlur={() => {
                    if (form.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: getEmailValidationError(form.email),
                      }));
                    }
                  }}
                  error={errors.email}
                  required
                />
                <Field
                  label="Message"
                  textarea
                  value={form.message}
                  onChange={(v) => {
                    setForm((f) => ({ ...f, message: v }));
                    if (errors.message) {
                      const err = getMessageValidationError(v);
                      if (!err) setErrors((prev) => ({ ...prev, message: null }));
                    }
                  }}
                  onBlur={() => {
                    if (form.message) {
                      setErrors((prev) => ({
                        ...prev,
                        message: getMessageValidationError(form.message),
                      }));
                    }
                  }}
                  error={errors.message}
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
