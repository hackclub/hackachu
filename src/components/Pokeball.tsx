"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Pokeball.module.css";

const GRAVITY = 3600; // px/s^2
const LAUNCH_V = -950; // px/s, upward
const RESTITUTION = 0.58; // energy kept per bounce
const REST_V = 60; // settle when rebound is slower than this

export default function Pokeball({ size = 48 }: { size?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const sim = useRef({ y: 0, v: 0, raf: 0, last: 0 });

  useEffect(() => {
    const s = sim.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const step = (now: number) => {
    const s = sim.current;
    const dt = Math.min((now - s.last) / 1000, 0.032);
    s.last = now;
    s.v += GRAVITY * dt;
    s.y += s.v * dt;
    if (s.y >= 0) {
      // hit the floor: rebound with damping
      s.y = 0;
      s.v = -s.v * RESTITUTION;
      if (-s.v < REST_V) {
        s.v = 0;
        s.raf = 0;
        if (ref.current) ref.current.style.transform = "";
        return;
      }
    }
    if (ref.current) ref.current.style.transform = `translateY(${s.y}px)`;
    s.raf = requestAnimationFrame(step);
  };

  const launch = () => {
    const s = sim.current;
    s.v = LAUNCH_V;
    if (!s.raf) {
      s.last = performance.now();
      s.raf = requestAnimationFrame(step);
    }
  };

  return (
    <span ref={ref} className={styles.pokeball} onClick={launch}>
      <Image src="/pokeball.webp" alt="pokeball" width={size} height={size} />
    </span>
  );
}
