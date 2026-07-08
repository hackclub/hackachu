import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={pokemonGb.variable}>
      <body>{children}</body>
    </html>
  );
}
