"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCountUp } from "@/lib/useCountUp";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? value.slice(numericMatch[1].length) : "";
  const isSpecial = value === "∞";

  const { count, ref } = useCountUp(numericValue, 1800);

  return (
    <div ref={ref} className="text-center">
      <div className="gradient-text-warm text-3xl font-bold sm:text-4xl">
        {isSpecial ? "∞" : `${count}${suffix}`}
      </div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

export default function Stats() {
  const t = useTranslations("stats");
  const ref = useScrollReveal();

  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="py-16 sm:py-20">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border p-8 sm:p-12">
          {/* Decorative glow */}
          <div className="blob-glow -top-20 -right-20 h-40 w-40 bg-accent" />
          <div className="blob-glow -bottom-20 -left-20 h-40 w-40 bg-peach" />

          <div className="relative z-10 grid grid-cols-2 gap-10 md:grid-cols-4">
            {items.map((item, i) => (
              <AnimatedStat key={i} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
