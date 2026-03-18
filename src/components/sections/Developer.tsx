"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Image from "next/image";
import { User } from "lucide-react";

export default function Developer() {
  const t = useTranslations("developer");
  const ref = useScrollReveal();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-28 sm:py-36">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border p-8 sm:p-12">
          {/* Subtle glow behind card */}
          <div className="blob-glow -top-16 -right-16 h-32 w-32 bg-peach" />
          <div className="blob-glow -bottom-16 -left-16 h-32 w-32 bg-accent" />

          <div className="relative z-10 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 sm:gap-8">
            {/* Photo with gradient ring */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 rounded-full p-[3px] bg-gradient-to-br from-accent via-peach to-accent-light">
                <div className="flex h-full w-full items-center justify-center rounded-full overflow-hidden bg-surface">
                  {imgError ? (
                    <User className="h-10 w-10 text-muted" />
                  ) : (
                    <Image
                      src="/developer-photo.jpg"
                      alt={t("name")}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">{t("name")}</h3>
              <p className="mt-1 text-sm text-peach-light">{t("role")}</p>
              <p className="mt-4 leading-relaxed text-muted italic">
                &ldquo;{t("quote")}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
