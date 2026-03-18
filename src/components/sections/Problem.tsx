"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Image from "next/image";

export default function Problem() {
  const t = useTranslations("problem");
  const ref = useScrollReveal();

  const items = t.raw("items") as { title: string; description: string }[];

  // Varying card sizes for visual hierarchy
  const cardStyles = [
    "p-7 sm:p-10", // first: largest
    "p-6 sm:p-8 ml-0 sm:ml-8", // second: indented
    "p-5 sm:p-7 ml-0 sm:ml-4", // third: compact, slight indent
  ];

  return (
    <section id="problem" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Blurred background from last scrollytelling frame — continuity */}
      <Image
        src="/scrollytelling/00192.png"
        alt=""
        fill
        className="object-cover opacity-[0.04] blur-[24px] scale-110"
        sizes="100vw"
        priority={false}
      />
      {/* Dark radial overlay for depth */}
      <div className="absolute inset-0 bg-radial-[at_50%_30%] from-transparent to-background/80" />

      <div ref={ref} className="reveal relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-14">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Broken grid — left border accent, no numbers */}
        <div className="space-y-5">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group rounded-xl bg-surface border-l-[3px] border-l-peach/60 border border-border/50 transition-all duration-300 hover:border-l-[5px] hover:border-l-peach hover:translate-x-1 hover:bg-surface-alt ${cardStyles[i]}`}
            >
              <h3 className={`font-bold ${i === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-loose text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
