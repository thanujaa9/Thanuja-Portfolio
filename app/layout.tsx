import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://thanuja-international-airport.thanuja9sekuri.chatgpt.site"),
  title: "Thanuja International Airport · Software Engineer",
  description: "Board an interactive journey through Thanuja Sekuri's software engineering projects, systems, and achievements.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Thanuja International Airport",
    description: "Engineering journeys begin here. Explore Thanuja Sekuri's interactive software engineering portfolio.",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Thanuja International Airport portfolio at golden hour" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${space.variable} ${mono.variable}`}>{children}</body></html>;
}
