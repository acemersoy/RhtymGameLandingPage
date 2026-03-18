"use client";

import { useRef, useEffect, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

interface LottieIconProps {
  animationData: object;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  className?: string;
  fallback?: string;
}

export default function LottieIcon({
  animationData,
  size = 48,
  loop = false,
  autoplay = true,
  playOnHover = false,
  className = "",
  fallback,
}: LottieIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load — only render when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (playOnHover && lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ width: size, height: size }}
    >
      {isVisible ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={playOnHover ? false : loop}
          autoplay={playOnHover ? false : autoplay}
          style={{ width: size, height: size }}
        />
      ) : (
        <div className="rounded-lg bg-surface-alt/50" style={{ width: size, height: size }} />
      )}
    </div>
  );
}
