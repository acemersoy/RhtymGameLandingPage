"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Autoplay after first user interaction (browser policy)
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0.12;
          audio.play().then(() => setPlaying(true)).catch(() => {});
        }
      }
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [hasInteracted]);

  // Show scroll-to-top after scrolling past first viewport
  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.12;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="none" />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-surface/80 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-surface ${
            showScrollTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ArrowUp className="h-4 w-4 text-accent-light" />
        </button>

        {/* Music toggle */}
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Mute background music" : "Play background music"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-surface/80 backdrop-blur-md transition-all hover:border-peach/40 hover:bg-surface"
        >
          {playing ? (
            <Volume2 className="h-4 w-4 text-peach" />
          ) : (
            <VolumeX className="h-4 w-4 text-muted" />
          )}
        </button>
      </div>
    </>
  );
}
