import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const pokemonGb = localFont({
  src: "../../public/PokemonGb-RAeo.ttf",
  variable: "--font-gb",
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
    <html lang="en" className={cn("font-sans", geist.variable, pokemonGb.variable)}>
      <body>{children}</body>
    </html>
  );
}
