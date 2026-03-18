"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Image from "next/image";
import LottieIcon from "@/components/LottieIcon";
import musicNote from "@/../public/lottie/music-note.json";
import wifiOff from "@/../public/lottie/wifi-off.json";
import lightning from "@/../public/lottie/lightning.json";
import headphones from "@/../public/lottie/headphones.json";

const lottieData = [musicNote, wifiOff, lightning, headphones];

export default function Features() {
  const t = useTranslations("features");
  const ref = useScrollReveal();

  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="features" className="py-28 sm:py-36">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Header — left aligned, human */}
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
        </div>

        {/* Asymmetric feature grid with product visual */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Large featured card — with real gameplay screenshot */}
          <div className="card-soft overflow-hidden lg:col-span-7">
            <div className="relative flex h-72 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-background to-surface sm:h-80">
              <Image
                src="/screenshots/gameplay.png"
                alt="Rhythm Game gameplay — notes flowing down the highway"
                width={280}
                height={560}
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <LottieIcon
                animationData={lottieData[0]}
                size={40}
                playOnHover
              />
              <h3 className="mt-3 text-xl font-semibold">{items[0].title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{items[0].description}</p>
            </div>
          </div>

          {/* Stacked smaller cards */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {items.slice(1).map((item, i) => (
              <div key={i} className="card-soft relative flex-1 overflow-hidden p-6">
                {/* Score screenshot as atmospheric bg on last card */}
                {i === 2 && (
                  <div className="absolute inset-0 flex items-end justify-end pointer-events-none">
                    <Image
                      src="/screenshots/score.png"
                      alt=""
                      width={120}
                      height={240}
                      className="opacity-[0.07] blur-[1px] translate-x-4 translate-y-4"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="relative z-10">
                  <LottieIcon
                    animationData={lottieData[i + 1]}
                    size={36}
                    playOnHover
                  />
                  <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
