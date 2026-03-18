"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Star } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useScrollReveal();

  const items = t.raw("items") as {
    name: string;
    role: string;
    quote: string;
    stars: number;
  }[];

  return (
    <section className="py-24 sm:py-32">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="card-soft p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-peach text-peach"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-300 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-peach text-xs font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
