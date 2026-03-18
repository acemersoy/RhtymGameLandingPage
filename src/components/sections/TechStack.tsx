"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Code2, Palette, Music, Link2, Database, Volume2 } from "lucide-react";
import { type ReactNode } from "react";
import Image from "next/image";

const techIcons: Record<string, ReactNode> = {
  Kotlin: <Code2 className="h-5 w-5 text-accent" />,
  "Jetpack Compose": <Palette className="h-5 w-5 text-peach" />,
  "Python / Librosa": <Music className="h-5 w-5 text-peach-light" />,
  Chaquopy: <Link2 className="h-5 w-5 text-cyan" />,
  "Room DB": <Database className="h-5 w-5 text-accent-light" />,
  ExoPlayer: <Volume2 className="h-5 w-5 text-peach" />,
};

export default function TechStack() {
  const t = useTranslations("techStack");
  const ref = useScrollReveal();

  const items = t.raw("items") as { name: string; description: string }[];

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-surface/40 overflow-hidden">
      {/* Atmospheric AI flowchart background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/screenshots/ai-flowchart.png"
          alt=""
          width={800}
          height={600}
          className="opacity-[0.04] blur-sm scale-110"
          aria-hidden="true"
        />
      </div>
      <div ref={ref} className="reveal relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="card-soft p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-alt">
                  {techIcons[item.name] || <Code2 className="h-5 w-5 text-muted" />}
                </div>
                <h3 className="font-semibold">{item.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
