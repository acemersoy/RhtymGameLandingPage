"use client";

import { useTranslations } from "next-intl";
import { Github, Bell, ChevronDown, Star } from "lucide-react";
import TypingAnimation from "@/components/TypingAnimation";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const t = useTranslations("hero");
  const phrases = t.raw("typing") as string[];

  return (
    <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center">
      <div className="pointer-events-auto mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-accent-light">
            {t("badge")}
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-delay-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
          <span className="gradient-text drop-shadow-lg">{t("title")}</span>
        </h1>

        {/* Typing Animation */}
        <div className="animate-fade-in-delay-2 mt-4 h-8 text-lg sm:text-xl">
          <TypingAnimation phrases={phrases} />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-delay-2 mx-auto mt-6 max-w-2xl rounded-2xl bg-black/30 p-5 text-base leading-relaxed text-gray-200/90 backdrop-blur-sm sm:text-lg">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/acemersoy/Ritim-Oyunu-"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_github", { location: "hero" })}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-peach-dark px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-peach/20"
          >
            <Github className="h-4 w-4" />
            {t("cta_github")}
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs">
              <Star className="h-3 w-3 fill-current" />
              12
            </span>
          </a>
          <a
            href="#cta"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-peach hover:text-peach"
          >
            <Bell className="h-4 w-4" />
            {t("cta_waitlist")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </div>
  );
}
