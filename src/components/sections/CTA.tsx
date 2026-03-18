"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Github, Loader2, CheckCircle, Mail, AlertCircle, Users } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

export default function CTA() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const ref = useScrollReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    fetch("/api/waitlist-count")
      .then((r) => r.json())
      .then((d) => setWaitlistCount(d.count))
      .catch(() => {});
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    trackEvent("submit_waitlist", {
      email_domain: email.split("@")[1] || "unknown",
    });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="cta" className="py-32 sm:py-40">
      <div ref={ref} className="reveal relative mx-auto max-w-2xl px-6 text-center">
        {/* Decorative blur blobs */}
        <div className="blob-glow -top-32 left-1/4 h-64 w-64 bg-accent" />
        <div className="blob-glow -bottom-32 right-1/4 h-64 w-64 bg-peach" />

        <div className="relative z-10">
          <p className="section-label mb-3">{t("badge")}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted text-base max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Waitlist Form — glass container */}
          <div className="mt-10 rounded-2xl border border-border/50 bg-surface/60 p-6 backdrop-blur-md sm:p-8">
            {status === "success" ? (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/5 px-6 py-4 text-sm text-green-400">
                <CheckCircle className="h-5 w-5" />
                {t("success_message")}
              </div>
            ) : status === "error" ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-4 text-sm text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  {t("error_message")}
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="block mx-auto text-sm text-muted hover:text-peach transition-colors"
                >
                  {t("try_again")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <div className="relative w-full max-w-sm">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("email_placeholder")}
                    className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/60 focus:border-peach focus:outline-none focus:ring-1 focus:ring-peach/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-xl bg-gradient-to-r from-accent to-peach px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-peach/20 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("loading_message")}
                    </span>
                  ) : (
                    t("button_submit")
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Waitlist counter */}
          {waitlistCount > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent-light">
              <Users className="h-3.5 w-3.5" />
              <span>{waitlistCount} {t("waitlist_count")}</span>
            </div>
          )}

          {/* GitHub */}
          <div className="mt-6">
            <a
              href="https://github.com/acemersoy/Ritim-Oyunu-"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_github", { location: "cta" })}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-peach"
            >
              <Github className="h-4 w-4" />
              {t("button_github")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
