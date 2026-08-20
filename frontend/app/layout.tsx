import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import DevConsole from "@/components/ui/DevConsole";
import { EasterEggProvider } from "@/components/easter-eggs/EasterEggContext";
import EasterEggToast from "@/components/easter-eggs/EasterEggToast";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteDescription =
  "Portfolio of Hemandu Tapraniya — AI/ML & Full Stack Developer. Building web applications, AI integrations, and digital experiences with Next.js, TypeScript, React, and Node.js.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hemandu.com"),
  title: {
    default: "Hemandu — AI/ML & Full Stack Developer",
    template: "%s | Hemandu",
  },
  description: siteDescription,
  keywords: [
    "Hemandu",
    "Hemandu Tapraniya",
    "hemandu.com",
    "AI/ML Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "React Developer",
    "Portfolio",
  ],
  authors: [{ name: "Hemandu Tapraniya", url: "https://hemandu.com/" }],
  creator: "Hemandu Tapraniya",
  publisher: "Hemandu Tapraniya",
  alternates: {
    canonical: "https://hemandu.com/",
  },
  openGraph: {
    title: "Hemandu — AI/ML & Full Stack Developer",
    description: siteDescription,
    url: "https://hemandu.com/",
    siteName: "Hemandu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/portrait.jpeg",
        width: 800,
        height: 1000,
        alt: "Hemandu Tapraniya — AI/ML & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemandu — AI/ML & Full Stack Developer",
    description: siteDescription,
    images: ["/images/portrait.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full bg-black text-paper">
        <JsonLd />
        <EasterEggProvider>
          {children}
          <DevConsole />
          <EasterEggToast />
        </EasterEggProvider>
      </body>
    </html>
  );
}
