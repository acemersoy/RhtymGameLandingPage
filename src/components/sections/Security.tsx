"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import LottieIcon from "@/components/LottieIcon";
import shieldData from "@/../public/lottie/shield.json";
import lockData from "@/../public/lottie/lock.json";
import eyeData from "@/../public/lottie/eye.json";

const lottieData = [shieldData, lockData, eyeData];

export default function Security() {
  const t = useTranslations("security");
  const ref = useScrollReveal();

  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="security" className="py-20 sm:py-28">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-lg leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="card-soft p-6 text-center flex flex-col items-center"
            >
              <LottieIcon
                animationData={lottieData[i]}
                size={48}
                playOnHover
              />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
