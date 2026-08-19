import React from "react";

export type IconProps = {
  className?: string;
  isHovered?: boolean;
};

export const TechIcons: Record<string, React.FC<IconProps>> = {
  nextjs: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 180 180" fill="none" className={className} aria-hidden="true">
      <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#nextjs-mask)">
        <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity={isHovered ? 0.2 : 0.08} stroke="currentColor" strokeWidth="6" />
        <path
          d="M149.508 157.53L69.142 54H54V125.97h12.113V69.377l72.484 93.371a89.704 89.704 0 0 0 10.911-5.218z"
          fill="currentColor"
        />
        <rect x="115" y="54" width="12" height="72" fill="currentColor" />
      </g>
    </svg>
  ),

  react: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill={isHovered ? "#61DAFB" : "currentColor"} />
      <g stroke={isHovered ? "#61DAFB" : "currentColor"} strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),

  typescript: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect width="128" height="128" rx="18" fill={isHovered ? "#3178C6" : "currentColor"} fillOpacity={isHovered ? 1 : 0.15} stroke="currentColor" strokeWidth="4" />
      <path
        d="M38 52h24v8H52v44h-8V60H30v-8h8zm34 32c2.5 5 7.5 7.5 13.5 7.5 7 0 11.5-3.5 11.5-9 0-13.5-25-6.5-25-24 0-9.5 7.5-15.5 19.5-15.5 8 0 14 3 17 8l-6 5.5c-2.5-4-5.5-5.5-11-5.5-6.5 0-10.5 3-10.5 7.5 0 12.5 25 5.5 25 23.5 0 10.5-8 16.5-20.5 16.5-10 0-16.5-4-20-10.5l6.5-4.5z"
        fill={isHovered ? "#FFFFFF" : "currentColor"}
      />
    </svg>
  ),

  javascript: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect width="128" height="128" rx="18" fill={isHovered ? "#F7DF1E" : "currentColor"} fillOpacity={isHovered ? 1 : 0.15} stroke="currentColor" strokeWidth="4" />
      <path
        d="M48.5 98.2c2.4 1.4 5.3 2.3 8.3 2.3 5.4 0 9-2.7 9-9.5V47.5H76V91c0 11.4-6.8 16.5-16.8 16.5-5.2 0-9.8-1.5-13.3-3.8l2.6-5.5zm35.2-1.2c3.5 2.2 7.7 3.5 12.2 3.5 6.9 0 11.4-3.5 11.4-9.3 0-6.1-4-8.8-11.8-12.2-10.4-4.5-15.3-8.8-15.3-17.5 0-9.8 7.7-16.2 18.9-16.2 4.9 0 9.2 1.3 12.7 3.5l-3 6.6c-2.9-1.8-6.4-2.8-9.8-2.8-6.1 0-9.9 3.4-9.9 8.2 0 5.6 3.6 8 11.3 11.4 11 4.8 15.9 9.5 15.9 18.4 0 10.8-8.5 17.5-20.6 17.5-5.8 0-11.3-1.6-15.2-4.1l3.2-6.9z"
        fill={isHovered ? "#000000" : "currentColor"}
      />
    </svg>
  ),

  nodejs: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M64 8l54 31.2v61.6L64 122 10 100.8V39.2L64 8z"
        fill={isHovered ? "#5FA04E" : "currentColor"}
        fillOpacity={isHovered ? 0.25 : 0.12}
        stroke={isHovered ? "#5FA04E" : "currentColor"}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M64 36c-15.5 0-24 8.5-24 19.5 0 16 19.5 16 19.5 25.5 0 4-3.5 6-8.5 6-7 0-12-3.5-14.5-8l-7.5 5c4 6.5 12 11 22 11 15 0 24-8 24-19 0-16.5-19.5-17.5-19.5-26 0-3.5 3-5 7.5-5 6 0 10.5 2.5 13 6.5l7.5-5C80 40 73 36 64 36z"
        fill={isHovered ? "#5FA04E" : "currentColor"}
      />
    </svg>
  ),

  express: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <text
        x="64"
        y="78"
        textAnchor="middle"
        fontSize="34"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="2"
        fill={isHovered ? "#FFFFFF" : "currentColor"}
      >
        ex.
      </text>
      <circle cx="64" cy="64" r="54" fill="none" stroke={isHovered ? "#FFFFFF" : "currentColor"} strokeWidth="4" strokeDasharray="6 4" />
    </svg>
  ),

  mongodb: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M64 12c-4 18-32 46-32 72 0 24 16 38 32 44 16-6 32-20 32-44 0-26-28-54-32-72z"
        fill={isHovered ? "#47A248" : "currentColor"}
        fillOpacity={isHovered ? 0.3 : 0.12}
        stroke={isHovered ? "#47A248" : "currentColor"}
        strokeWidth="4"
      />
      <path d="M64 12v116" stroke={isHovered ? "#47A248" : "currentColor"} strokeWidth="3" />
      <path d="M64 48c12 16 16 32 16 44 0 12-8 20-16 26" stroke={isHovered ? "#47A248" : "currentColor"} strokeWidth="3" fill="none" />
    </svg>
  ),

  mysql: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M20 72c6-24 24-40 44-40 24 0 44 20 44 44 0 16-8 28-20 36-12 8-28 6-36 2-12-6-20-18-24-30 0-4-4-10-8-12z"
        fill={isHovered ? "#4479A1" : "currentColor"}
        fillOpacity={isHovered ? 0.25 : 0.1}
        stroke={isHovered ? "#4479A1" : "currentColor"}
        strokeWidth="5"
      />
      <circle cx="86" cy="58" r="4" fill={isHovered ? "#F29111" : "currentColor"} />
      <path d="M42 76c8 10 22 14 36 10" stroke={isHovered ? "#F29111" : "currentColor"} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  python: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M63.5 14c-22 0-20.5 9.5-20.5 9.5l.02 10h21v3h-29.5s-14.5-1.5-14.5 21 12.5 20.5 12.5 20.5h7.5v-10.5s-.5-12.5 12.5-12.5h21.5s12 .2 12-11.5V25.5s1.8-11.5-22.5-11.5zm-12 6.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"
        fill={isHovered ? "#3776AB" : "currentColor"}
      />
      <path
        d="M64.5 114c22 0 20.5-9.5 20.5-9.5l-.02-10h-21v-3h29.5s14.5 1.5 14.5-21-12.5-20.5-12.5-20.5h-7.5v10.5s.5 12.5-12.5 12.5h-21.5s-12-.2-12 11.5v18.5s-1.8 11.5 22.5 11.5zm12-6.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
        fill={isHovered ? "#FFD43B" : "currentColor"}
      />
    </svg>
  ),

  tailwind: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M32 58c5-10 13-14 24-12 14 3 19 14 29 16 10 2 19-3 25-14-5 10-13 14-24 12-14-3-19-14-29-16-10-2-19 3-25 14zm-14 26c5-10 13-14 24-12 14 3 19 14 29 16 10 2 19-3 25-14-5 10-13 14-24 12-14-3-19-14-29-16-10-2-19 3-25 14z"
        fill={isHovered ? "#38BDF8" : "currentColor"}
      />
    </svg>
  ),

  docker: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M118 64c-2-1-8-1-12 2-3-8-11-12-20-12-1 0-2 0-3 .2C79 46 68 46 64 52H20c-4 0-8 3-8 8v4c0 18 12 34 32 40 24 7 54 2 70-16 6-7 8-16 4-24zm-64-6h10v10H54V58zm14 0h10v10H68V58zm14 0h10v10H82V58zm-28-14h10v10H54V44zm14 0h10v10H68V44zm14 0h10v10H82V44zm-14-14h10v10H68V30z"
        fill={isHovered ? "#2496ED" : "currentColor"}
      />
    </svg>
  ),

  git: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M117.5 56.5L71.5 10.5a11 11 0 0 0-15.5 0l-9.5 9.5 17 17a12 12 0 0 1 15 15l16 16a12 12 0 1 1-7.5 7.5l-15.5-15.5v28a12 12 0 1 1-10.5 0v-29a12 12 0 0 1-6.5-15.5l-16-16-24 24a11 11 0 0 0 0 15.5l46 46a11 11 0 0 0 15.5 0l44.5-44.5a11 11 0 0 0 0-15.5z"
        fill={isHovered ? "#F05032" : "currentColor"}
      />
    </svg>
  ),

  github: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 8C33 8 8 33 8 64c0 24.8 16.1 45.8 38.4 53.2 2.8.5 3.8-1.2 3.8-2.7 0-1.3-.1-5.7-.1-10.3-15.6 3.4-18.9-6.6-18.9-6.6-2.5-6.5-6.2-8.2-6.2-8.2-5.1-3.5.4-3.4.4-3.4 5.6.4 8.6 5.8 8.6 5.8 5 8.6 13.1 6.1 16.3 4.7.5-3.6 2-6.1 3.5-7.5-12.4-1.4-25.5-6.2-25.5-27.7 0-6.1 2.2-11.1 5.8-15-0.6-1.4-2.5-7.1.6-14.8 0 0 4.7-1.5 15.4 5.7 4.5-1.2 9.2-1.9 14-1.9 4.8 0 9.6.6 14 1.9 10.7-7.3 15.4-5.7 15.4-5.7 3.1 7.7 1.2 13.4.6 14.8 3.6 3.9 5.8 8.9 5.8 15 0 21.6-13.1 26.3-25.6 27.7 2 1.8 3.9 5.2 3.9 10.5 0 7.6-.1 13.7-.1 15.6 0 1.5 1 3.3 3.9 2.7C103.9 109.8 120 88.8 120 64c0-31-25-56-56-56z"
        fill={isHovered ? "#FFFFFF" : "currentColor"}
      />
    </svg>
  ),

  redis: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M14 44l50-24 50 24v40l-50 24-50-24V44z"
        fill={isHovered ? "#DC382D" : "currentColor"}
        fillOpacity={isHovered ? 0.25 : 0.12}
        stroke={isHovered ? "#DC382D" : "currentColor"}
        strokeWidth="4"
      />
      <path d="M14 44l50 22 50-22M64 66v42" stroke={isHovered ? "#DC382D" : "currentColor"} strokeWidth="4" />
      <circle cx="64" cy="44" r="5" fill={isHovered ? "#DC382D" : "currentColor"} />
    </svg>
  ),

  firebase: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M24 88L42 16l18 36L44 80 24 88z"
        fill={isHovered ? "#FFA611" : "currentColor"}
      />
      <path
        d="M104 88L84 32 64 68l24 24 16-4z"
        fill={isHovered ? "#F57C00" : "currentColor"}
      />
      <path
        d="M24 88l40 28 40-28-20-12-40 16-20-4z"
        fill={isHovered ? "#FFCA28" : "currentColor"}
      />
    </svg>
  ),

  socketio: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="54" fill="none" stroke={isHovered ? "#FFFFFF" : "currentColor"} strokeWidth="5" />
      <path
        d="M60 26L32 68h26l-6 34 34-44H60l6-32z"
        fill={isHovered ? "#010101" : "currentColor"}
        stroke={isHovered ? "#FFFFFF" : "currentColor"}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),

  linux: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <ellipse cx="64" cy="68" rx="26" ry="34" fill={isHovered ? "#FCC624" : "currentColor"} fillOpacity={isHovered ? 0.3 : 0.15} stroke="currentColor" strokeWidth="4" />
      <circle cx="54" cy="46" r="4" fill={isHovered ? "#FCC624" : "currentColor"} />
      <circle cx="74" cy="46" r="4" fill={isHovered ? "#FCC624" : "currentColor"} />
      <path d="M54 58c4 4 16 4 20 0" stroke={isHovered ? "#FCC624" : "currentColor"} strokeWidth="3" strokeLinecap="round" />
      <path d="M34 92c8 10 24 14 30 14s22-4 30-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  redux: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M84 46c9 15 7 35-4 46s-32 9-44 0-14-30-5-44 26-14 38-6"
        stroke={isHovered ? "#764ABC" : "currentColor"}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="64" cy="64" r="9" fill={isHovered ? "#764ABC" : "currentColor"} />
    </svg>
  ),

  postman: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="54" fill={isHovered ? "#FF6C37" : "currentColor"} fillOpacity={isHovered ? 0.25 : 0.1} stroke={isHovered ? "#FF6C37" : "currentColor"} strokeWidth="5" />
      <path d="M36 64h44l-14-14M66 50l14 14-14 14" stroke={isHovered ? "#FF6C37" : "currentColor"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  cloudinary: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M34 82c-9 0-16-7-16-16 0-7 5-13 12-15 2-12 12-21 24-21 10 0 19 6 22 15 3-2 7-3 11-3 10 0 19 8 19 19 0 1 0 2-.2 3 9 2 15 10 15 18 0 10-9 19-19 19H34z"
        fill={isHovered ? "#3448C5" : "currentColor"}
        fillOpacity={isHovered ? 0.3 : 0.15}
        stroke={isHovered ? "#3448C5" : "currentColor"}
        strokeWidth="5"
      />
      <circle cx="58" cy="64" r="6" fill={isHovered ? "#3448C5" : "currentColor"} />
    </svg>
  ),

  razorpay: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M38 108L72 20h22L56 108H38z"
        fill={isHovered ? "#0C2340" : "currentColor"}
        stroke={isHovered ? "#3395FF" : "currentColor"}
        strokeWidth="4"
      />
      <path
        d="M62 48l16-28h18L64 88H48l14-40z"
        fill={isHovered ? "#3395FF" : "currentColor"}
      />
    </svg>
  ),

  wordpress: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="54" fill="none" stroke={isHovered ? "#21759B" : "currentColor"} strokeWidth="5" />
      <path
        d="M26 64c0 14 7 27 17 35L22 48c-1 5-2 10-2 16zm46 38l-18-50h-1l-18 50c7 4 15 6 23 6 5 0 9-1 14-6zm4-11l16-46c2-4 3-8 3-11 0-2-.5-4-2-4h-4l12-1c7 0 12 4 12 12 0 7-4 17-7 26l-20 49c-3-2-7-5-10-9z"
        fill={isHovered ? "#21759B" : "currentColor"}
      />
    </svg>
  ),

  gemini: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path
        d="M64 8c0 30.9-25.1 56-56 56 30.9 0 56 25.1 56 56 0-30.9 25.1-56 56-56-30.9 0-56-25.1-56-56z"
        fill={isHovered ? "#8E75FF" : "currentColor"}
        fillOpacity={isHovered ? 0.35 : 0.15}
        stroke={isHovered ? "#8E75FF" : "currentColor"}
        strokeWidth="4"
      />
      <circle cx="64" cy="64" r="6" fill={isHovered ? "#8E75FF" : "currentColor"} />
    </svg>
  ),

  nodemailer: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect x="20" y="32" width="88" height="64" rx="8" fill="none" stroke={isHovered ? "#22B573" : "currentColor"} strokeWidth="5" />
      <path d="M20 38l44 32 44-32" stroke={isHovered ? "#22B573" : "currentColor"} strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),

  actions: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="50" fill="none" stroke={isHovered ? "#2088FF" : "currentColor"} strokeWidth="5" strokeDasharray="4 4" />
      <path d="M52 42l30 22-30 22V42z" fill={isHovered ? "#2088FF" : "currentColor"} />
    </svg>
  ),

  wsl: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect x="18" y="24" width="92" height="80" rx="12" fill="none" stroke={isHovered ? "#0078D7" : "currentColor"} strokeWidth="5" />
      <path d="M36 50l18 14-18 14M62 78h30" stroke={isHovered ? "#0078D7" : "currentColor"} strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),

  restapi: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="34" cy="64" r="16" stroke={isHovered ? "var(--color-lavender)" : "currentColor"} strokeWidth="5" fill="none" />
      <circle cx="94" cy="64" r="16" stroke={isHovered ? "var(--color-lavender)" : "currentColor"} strokeWidth="5" fill="none" />
      <path d="M50 64h28" stroke={isHovered ? "var(--color-lavender)" : "currentColor"} strokeWidth="5" strokeDasharray="4 3" />
    </svg>
  ),

  jwt: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="52" fill="none" stroke={isHovered ? "#D63AFF" : "currentColor"} strokeWidth="4" strokeDasharray="5 5" />
      <path d="M42 42h44v44H42z" fill={isHovered ? "#D63AFF" : "currentColor"} fillOpacity={0.2} stroke={isHovered ? "#D63AFF" : "currentColor"} strokeWidth="4" />
      <circle cx="64" cy="64" r="6" fill={isHovered ? "#D63AFF" : "currentColor"} />
    </svg>
  ),

  html5: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path d="M19 14l9 98 36 10 36-10 9-98H19z" fill={isHovered ? "#E34F26" : "currentColor"} fillOpacity={isHovered ? 0.3 : 0.12} stroke={isHovered ? "#E34F26" : "currentColor"} strokeWidth="4" />
      <path d="M64 26v74l26-7 7-67H64z" fill={isHovered ? "#E34F26" : "currentColor"} />
      <path d="M64 42h20l-1 12H64v12h18l-2 22-16 5V42z" fill={isHovered ? "#FFFFFF" : "currentColor"} />
    </svg>
  ),

  reactrouter: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="52" stroke={isHovered ? "#CA4245" : "currentColor"} strokeWidth="5" fill="none" strokeDasharray="6 6" />
      <path d="M40 76V52h24c7 0 12 5 12 12s-5 12-12 12H40zm16-16h8c3 0 5-2 5-5s-2-5-5-5h-8v10zm12 16l16 16" stroke={isHovered ? "#CA4245" : "currentColor"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  mongoose: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="50" fill={isHovered ? "#880000" : "currentColor"} fillOpacity={isHovered ? 0.25 : 0.1} stroke={isHovered ? "#880000" : "currentColor"} strokeWidth="4" />
      <path d="M44 48c8-12 32-12 40 0s0 28-12 32c12 4 12 20 0 28s-32 4-40-12" stroke={isHovered ? "#E53935" : "currentColor"} strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  ),

  multer: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect x="24" y="36" width="80" height="64" rx="8" stroke={isHovered ? "#BD8A5C" : "currentColor"} strokeWidth="5" fill="none" />
      <path d="M64 24v42M48 40l16-16 16 16" stroke={isHovered ? "#BD8A5C" : "currentColor"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 80h48" stroke={isHovered ? "#BD8A5C" : "currentColor"} strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),

  cicd: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="40" cy="64" r="22" stroke={isHovered ? "#2088FF" : "currentColor"} strokeWidth="5" fill="none" />
      <circle cx="88" cy="64" r="22" stroke={isHovered ? "#2088FF" : "currentColor"} strokeWidth="5" fill="none" />
      <path d="M58 50l12-6M70 84l-12-6" stroke={isHovered ? "#2088FF" : "currentColor"} strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  cdn: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="64" cy="64" r="48" stroke={isHovered ? "#F38020" : "currentColor"} strokeWidth="5" fill="none" />
      <ellipse cx="64" cy="64" rx="20" ry="48" stroke={isHovered ? "#F38020" : "currentColor"} strokeWidth="3" fill="none" />
      <path d="M18 50h92M18 78h92" stroke={isHovered ? "#F38020" : "currentColor"} strokeWidth="3" />
    </svg>
  ),

  ml: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <circle cx="34" cy="40" r="10" stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="4" fill="none" />
      <circle cx="34" cy="88" r="10" stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="4" fill="none" />
      <circle cx="94" cy="40" r="10" stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="4" fill="none" />
      <circle cx="94" cy="88" r="10" stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="4" fill="none" />
      <circle cx="64" cy="64" r="12" fill={isHovered ? "#A99CC2" : "currentColor"} fillOpacity={0.3} stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="4" />
      <path d="M42 46l14 12M42 82l14-12M72 58l14-12M72 70l14 12" stroke={isHovered ? "#A99CC2" : "currentColor"} strokeWidth="3" />
    </svg>
  ),

  vision: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path d="M16 64s20-32 48-32 48 32 48 32-20 32-48 32-48-32-48-32z" stroke={isHovered ? "#8E75FF" : "currentColor"} strokeWidth="5" fill="none" />
      <circle cx="64" cy="64" r="16" stroke={isHovered ? "#8E75FF" : "currentColor"} strokeWidth="4" fill={isHovered ? "#8E75FF" : "none"} fillOpacity={0.3} />
      <circle cx="64" cy="64" r="6" fill={isHovered ? "#8E75FF" : "currentColor"} />
    </svg>
  ),

  generic: ({ className = "w-6 h-6", isHovered }) => (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path d="M46 44L26 64l20 20M82 44l20 20-20 20M70 34L58 94" stroke={isHovered ? "var(--color-lavender)" : "currentColor"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
