import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import DevConsole from "@/components/ui/DevConsole";
import { EasterEggProvider } from "@/components/easter-eggs/EasterEggContext";
import EasterEggToast from "@/components/easter-eggs/EasterEggToast";
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

export const metadata: Metadata = {
  title: "Hemandu Tapraniya — Full Stack Developer · AI & ML Student",
  description:
    "I build things. Full-stack developer, AI/ML student, professional overthinker of button spacing.",
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
        <EasterEggProvider>
          {children}
          <DevConsole />
          <EasterEggToast />
        </EasterEggProvider>
      </body>
    </html>
  );
}
