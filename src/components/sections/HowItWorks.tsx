"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Image from "next/image";

// Real app screenshots: pick song → AI analyzes → play
const stepImages = [
  "/screenshots/home.png",
  "/screenshots/analyzing.png",
  "/screenshots/song-details.png",
];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const ref = useScrollReveal();

  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div ref={ref} className="reveal mx-auto max-w-5xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>

        {/* Steps — alternating layout with screenshots */}
        <div className="space-y-16 sm:space-y-20">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col gap-8 sm:gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center`}
            >
              {/* Phone mockup with real screenshot */}
              <div className="flex w-full justify-center md:w-1/2">
                <div className="relative rounded-[2rem] border-2 border-border/60 bg-background p-2 shadow-2xl shadow-accent/5">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={stepImages[i]}
                      alt={step.title}
                      width={240}
                      height={480}
                      className="h-auto w-[200px] object-contain sm:w-[240px]"
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <span className="step-number">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
