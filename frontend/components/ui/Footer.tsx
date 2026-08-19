"use client";

import { person, jokes } from "@/data/portfolio";
import EasterEggTrigger from "@/components/easter-eggs/EasterEggTrigger";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-black px-6 py-14 sm:px-10 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-display text-4xl italic text-paper md:text-5xl">
            {person.first}
          </span>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute-dim">
            Full Stack · AI / ML · {person.location}
          </p>
        </div>

        <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.15em] text-mute">
          <a href={person.github} data-cursor="VIEW" target="_blank" rel="noreferrer" className="hover:text-paper">
            GitHub
          </a>
          <a href={person.linkedin} data-cursor="VIEW" target="_blank" rel="noreferrer" className="hover:text-paper">
            LinkedIn
          </a>
          <a href={`mailto:${person.email}`} data-cursor="SAY HI" className="hover:text-paper">
            Email
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 text-mute-dim md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            title="okay, you found this one"
            className="font-mono text-[13px] italic leading-relaxed text-mute-dim md:text-[14px]"
          >
            <EasterEggTrigger id="egg-footer-copy">{jokes.footer}</EasterEggTrigger>
          </span>
          {jokes.footerSub && (
            <span className="font-mono text-[12px] italic leading-relaxed text-mute-dim/70 md:text-[13px]">
              {jokes.footerSub}
            </span>
          )}
        </div>
        <span className="font-mono text-[10px]">
          <EasterEggTrigger id="egg-footer-copyright">
            © {person.year} {person.name}
          </EasterEggTrigger>
        </span>
      </div>
    </footer>
  );
}
