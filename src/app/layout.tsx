import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist, Bitter, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const pokemonGb = localFont({
  src: "../../public/PokemonGb-RAeo.ttf",
  variable: "--font-gb",
});

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-slab",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "hackachu",
  description: "build a card game, gamble with pokemon cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, pokemonGb.variable, bitter.variable, plexMono.variable)}>
      <body>{children}</body>
    </html>
  );
}
