# hemandu.com — cinematic portfolio

A scroll-choreographed, single-page portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. Smooth scroll via Lenis, custom magnetic cursor, floating pill navigation, and a tiny SMTP-backed contact endpoint.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Contact form

`/api/contact` sends mail over SMTP with nodemailer — no database, no auth. Copy `.env.example` to `.env.local` and fill in real SMTP credentials (e.g. a Gmail app password, or any transactional SMTP provider) before deploying, or the form will return a 500.

## Things to swap before shipping

- **Project visuals** — `components/projects/ProjectScene.tsx` currently renders a stylized placeholder panel (grid + title) instead of real screenshots, since no screenshots were provided. Swap in real project imagery via `next/image` for each entry in `data/portfolio.ts`.
- **Project 03** — filled in as the AI-Powered LMS project from your background, since the brief only specified two projects by name. Confirm the copy/tech list in `data/portfolio.ts` is accurate, or swap in a different project.
- **Portrait crop** — `components/hero/Hero.tsx` positions the uploaded photo with `object-position` tuned for a side-profile silhouette shot. Re-check the crop if you swap in a different photo.
- **Email / SMTP env vars** in `.env.local`.

## Structure

```
app/
  page.tsx            single-page assembly
  api/contact/route.ts contact form endpoint
components/
  navigation/         floating nav
  cursor/             custom cursor
  hero/                intro + identity stage
  scenes/             typographic scenes (build, tech, experience, currently)
  projects/           project showcase scenes
  contact/            contact form
  ui/                 loader, footer, smooth scroll, client chrome
data/portfolio.ts      all copy and content, separate from presentation
lib/utils.ts
```

## Notes

- Respects `prefers-reduced-motion` (disables Lenis, cinematic scroll transforms feel calmer, loader skips its counter).
- Custom cursor auto-disables on touch devices and narrow viewports.
- All scroll choreography uses `transform`/`opacity` via Framer Motion's `useScroll`/`useTransform` — no layout-thrashing properties animated.
