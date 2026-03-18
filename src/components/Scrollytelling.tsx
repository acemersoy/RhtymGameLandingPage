"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const TOTAL_FRAMES = 192;
const MORPH_START = 0.85; // Start morph at 85% scroll progress

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(5, "0");
  return `/scrollytelling/${num}.png`;
}

export default function Scrollytelling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [morphProgress, setMorphProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      if (i === 0) {
        img.onload = () => drawFrame(0);
      }
      images.push(img);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;

      // How far through the section we've scrolled (0 to 1)
      const scrollProgress = Math.min(
        Math.max(-rect.top / sectionHeight, 0),
        1
      );

      const frameIndex = Math.min(
        Math.floor(scrollProgress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }

      // Morph progress: 0 at MORPH_START, 1 at scroll end
      if (scrollProgress > MORPH_START) {
        const mp = (scrollProgress - MORPH_START) / (1 - MORPH_START);
        setMorphProgress(Math.min(mp, 1));
      } else {
        setMorphProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Morph styles: progressive blur, opacity fade, slight zoom
  const blurAmount = morphProgress * 16;
  const opacityAmount = 1 - morphProgress * 0.7;
  const scaleAmount = 1 + morphProgress * 0.05;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky canvas container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{
            display: "block",
            filter: `blur(${blurAmount}px)`,
            opacity: opacityAmount,
            transform: `scale(${scaleAmount})`,
            transition: "filter 0.1s linear, opacity 0.1s linear, transform 0.1s linear",
          }}
        />
        {/* Gradient overlay — taller for smoother morph */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
