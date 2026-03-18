"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";

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
              <div key={i} className="text-center">
                <div className="gradient-text-warm text-3xl font-bold sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-muted">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
