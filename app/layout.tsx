import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://thanuja-international-airport.thanuja9sekuri.chatgpt.site"),
  title: "Thanuja Sekuri · Software Engineer Portfolio",
  description: "Board an interactive journey through Thanuja Sekuri's software engineering projects, systems, and achievements.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Thanuja Sekuri · Portfolio Airport",
    description: "Explore Thanuja Sekuri's software engineering projects, skills, experience, and achievements.",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Thanuja Sekuri's Portfolio Airport at golden hour" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${space.variable} ${mono.variable}`}>{children}</body></html>;
}
