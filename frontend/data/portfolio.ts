export const person = {
  name: "Hemandu Tapraniya",
  first: "Hemandu",
  role: "Full Stack Developer · AI & ML Student",
  location: "India",
  year: "2026",
  github: "https://github.com/Hemandu69",
  linkedin: "https://linkedin.com/in/hemendu-tapraniya-69786030a",
  email: "hello@hemandu.com",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Say Hi", href: "#contact" },
];

export const buildCategories = [
  {
    index: "01",
    title: "Full Stack",
    lines: ["Next.js.", "React.", "TypeScript.", "Node.", "Express.", "REST APIs."],
  },
  {
    index: "02",
    title: "AI / ML",
    lines: ["B.Tech in AI & ML.", "Gemini API.", "AI-powered features.", "Still a student of it."],
  },
  {
    index: "03",
    title: "Whatever seems interesting",
    lines: [
      "Side projects, experiments, questionable ideas, and things I probably could have just left alone.",
    ],
  },
];

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  index: string;
  title: string[];
  description: string;
  tech: string[];
  tone: "lavender" | "rust" | "mute";
  status?: string;
  note?: string;
  link?: ProjectLink;
  links?: ProjectLink[];
  images?: string[];
};

export const projects: Project[] = [
  {
    id: "quick-notes",
    index: "01",
    title: ["QUICK", "NOTES"],
    description:
      "I kept losing notes, so I built an app to lose them more efficiently. A local-first Android notes app with fast search, folders, tags, reminders, attachments, and offline backups.",
    tech: ["ANDROID", "KOTLIN", "ROOM / SQLITE", "LOCAL-FIRST", "OFFLINE"],
    tone: "lavender",
    status: "V1.0 · ANDROID · LOCAL-FIRST",
    note: "v1.0 shipped. Naturally, I immediately started changing it.",
    images: [
      "/projects/quick-notes/quick-notes-editor.jpg",
      "/projects/quick-notes/quick-notes-settings.jpg",
    ],
    links: [
      {
        label: "VIEW SOURCE ↗",
        url: "https://github.com/Hemandu69/notes-and-cliboard-app",
      },
      {
        label: "DOWNLOAD v1 ↗",
        url: "https://github.com/Hemandu69/notes-and-cliboard-app/releases",
      },
    ],
  },
  {
    id: "manga",
    index: "02",
    title: ["MANGA", "PLATFORM"],
    description:
      "I wanted a manga platform, so naturally I decided building one was easier than finding one.",
    tech: ["NEXT.JS", "TYPESCRIPT", "CLOUDFLARE R2", "GITHUB ACTIONS", "DOCKER", "CI/CD"],
    tone: "rust",
    status: "BETA · ACTIVELY DEVELOPING",
    note: "Currently in beta. Please report bugs before I convince myself they're features.",
    images: [
      "/projects/manga-platform/manga-home.png",
      "/projects/manga-platform/manga-discover.png",
    ],
    link: {
      label: "VIEW BETA ↗",
      url: "https://manga-beta.hemandu.com/",
    },
  },
];

export {
  techEcosystem,
  aiSpotlight,
  editorialCategories,
  architecturalRange,
} from "./techData";

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "MySQL",
  "Redis",
  "Tailwind",
  "Socket.IO",
  "Docker",
  "Git",
  "Firebase",
];

export const skillsJoke =
  "The stuff between an empty repository and something that actually runs in production.";

export const experience = [
  {
    year: "2026",
    period: "July 13 — Present",
    role: "Full Stack Development Intern",
    org: "Digital India Corporation",
    detail:
      "Built and shipped features across Next.js, TypeScript and REST APIs, connected WordPress content and CDN assets to the frontend, and kept CI/CD pipelines green. Also submitted enough pull requests to become a recurring character in my mentor's GitHub notifications.",
  },
  {
    year: "2023–27",
    role: "B.Tech, Artificial Intelligence & Machine Learning",
    org: "GGSIPU — University School of Automation & Robotics",
    detail: "Currently in progress. Ask me again in 2027.",
  },
  {
    year: "2021–23",
    role: "Senior Secondary (Class XI - XII)",
    org: "Kendriya Vidyalaya Andrews Ganj, New Delhi",
    detail: "Spent years learning things I was told I'd definitely use later. The 'later' is taking its time.",
  },
];

export const currently = [
  {
    label: "Building",
    value: "something that started as a five-minute idea and is now a lifestyle choice",
  },
  {
    label: "Learning",
    value: "something I absolutely could have learned the normal way",
  },
  {
    label: "Watching",
    value: "one more episode. this time I'm definitely stopping.",
  },
  {
    label: "Status",
    value: "the bug is reproducible. my understanding of it isn't.",
  },
];

export const overthinkerVariations = [
  "Professional overthinker. Somehow still ships code.",
  "Professional overthinker of absolutely everything.",
  "Professional overthinker with questionable sleep schedules.",
  "Professional overthinker. Amateur decision maker.",
  "Professional overthinker of problems I just created.",
  "Professional overthinker with 37 tabs open.",
  "Professional overthinker. Surprisingly employable.",
  "Professional overthinker with a suspicious relationship with Stack Overflow.",
  "Professional overthinker. Full-time bug negotiator.",
  "Professional overthinker. Part-time bug creator.",
];

export const heroStatusLines = [
  "I probably have too many tabs open right now.",
  "I swear this worked five minutes ago.",
  "Currently pretending I understand the codebase.",
  "One more feature. Then I'm done. Probably.",
  "Turning caffeine into questionable architecture.",
  "Currently blaming the cache.",
  "It works on my machine. That's all I know.",
  "Writing code. Deleting code. Calling it progress.",
  "Currently avoiding the one bug I definitely need to fix.",
  "Somewhere between 'easy fix' and 'rewrite everything.'",
  "My browser history knows too much.",
  "Currently negotiating with TypeScript.",
  "Building things I probably didn't need to build.",
  "I came for the bug. I stayed for the side quest.",
  "Making problems so I can solve them later.",
  "Deploy first. Understand later. Kidding. Mostly.",
  "Currently waiting for npm to tell me what's wrong.",
  "I have a plan. It is not a good plan.",
  "Professional overthinker, amateur sleep enthusiast.",
  "Still somehow shipping code.",
];

export const contactEasterEggs = [
  "Yes, I actually read these. Usually.",
  "Go ahead. I promise I'm not ignoring you.",
  "If you made it this far, you probably have something to say.",
  "This is your sign to stop thinking about it and hit send.",
  "You can say hi. I don't bite.",
  "Your message has been invited. The rest is up to you.",
  'No formality required. "Hey" works.',
  "Yes, this is a real inbox. Your move.",
  "I promise there's a human on the other side of this.",
  "No need to overthink it. I already did.",
];

export const jokes = {
  hero: "I probably have too many tabs open right now.",
  about:
    "I like building things that start as questionable ideas and somehow end up three weeks later than planned.",
  experience: "Learned that \"works on my machine\" is not a deployment strategy.",
  projectsIntro: "Started simple. Obviously.",
  contactFooter: "No need to overthink it. I already did.",
  footer: "Built with questionable decisions and unnecessary attention to detail.",
  footerSub: "The bugs were not consulted during production.",
};
