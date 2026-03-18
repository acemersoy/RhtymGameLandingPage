"use client";

const notes = ["♪", "♫", "♬", "♩", "♭", "♯"];

const particles = Array.from({ length: 18 }, (_, i) => {
  const seed = i * 7 + 3;
  return {
    id: i,
    note: notes[i % notes.length],
    left: `${(seed * 13) % 100}%`,
    delay: `${(i * 1.3) % 8}s`,
    duration: `${12 + (seed % 10)}s`,
    size: 12 + (seed % 10),
    opacity: 0.06 + (i % 5) * 0.02,
  };
});

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-particle-float select-none"
          style={{
            left: p.left,
            bottom: "-40px",
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            color: "var(--color-accent-light)",
            willChange: "transform",
          }}
        >
          {p.note}
        </span>
      ))}
    </div>
  );
}
