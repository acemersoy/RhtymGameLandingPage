"use client";

import { useEffect, useRef } from "react";

export default function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = glowRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.setProperty("--glow-x", `${e.clientX}px`);
      el.style.setProperty("--glow-y", `${e.clientY}px`);
      el.style.opacity = "1";
    };

    const handleLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[5] opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(600px circle at var(--glow-x, -100px) var(--glow-y, -100px), rgba(139,92,246,0.06), transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}
