"use client";

import { useState, useEffect } from "react";

interface Props {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypingAnimation({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2000,
}: Props) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.substring(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(current.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-semibold">{text}</span>
      <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-accent" />
    </span>
  );
}
