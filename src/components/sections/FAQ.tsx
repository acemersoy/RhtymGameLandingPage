"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

export default function FAQ() {
  const t = useTranslations("faq");
  const ref = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t.raw("items") as { question: string; answer: string }[];

  const toggle = (i: number) => {
    if (openIndex !== i) {
      trackEvent("open_faq", { question: i });
    }
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-surface/40">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
        </div>

        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="faq-item overflow-hidden rounded-r-lg"
            >
              <button
                id={`faq-trigger-${i}`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-sm font-medium pr-4">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-6 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
