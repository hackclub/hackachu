import type { Metadata } from "next";
import { IBM_Plex_Mono, Press_Start_2P } from "next/font/google";
import TrainerDashboard from "@/components/TrainerDashboard";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "hackachu · Trainer Dashboard",
  description: "your trainer dashboard. ship projects, evolve your prizes.",
};

export default function DashboardPage() {
  return (
    <div className={`${pressStart.variable} ${plexMono.variable}`}>
      <TrainerDashboard />
    </div>
  );
}
