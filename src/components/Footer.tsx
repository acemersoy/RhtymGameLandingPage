"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Music2,
  Heart,
  Github,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Loader2,
  CheckCircle,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/acemersoy/Ritim-Oyunu-",
    icon: <Github className="h-4 w-4" />,
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/avnicemm/",
    icon: <Instagram className="h-4 w-4" />,
  },
  {
    name: "Facebook",
    href: "#",
    icon: <Facebook className="h-4 w-4" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/avni-cem-ersoy-683331233",
    icon: <Linkedin className="h-4 w-4" />,
  },
];

const navLinks = [
  { href: "#features", key: "features" },
  { href: "#how-it-works", key: "howItWorks" },
  { href: "#tech-stack", key: "techStack" },
  { href: "#faq", key: "faq" },
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
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
    <footer className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Main grid — 3 columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Brand + description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Music2 className="h-5 w-5 text-peach" />
              <span className="text-lg font-bold text-foreground">
                Rhythm Game
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {t("description")}
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-peach-light mb-3">
                {t("newsletter_title")}
              </p>
              {status === "success" ? (
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {t("newsletter_success")}
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("newsletter_placeholder")}
                      className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted/50 focus:border-peach focus:outline-none focus:ring-1 focus:ring-peach/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="shrink-0 rounded-lg bg-gradient-to-r from-accent to-peach px-4 py-2 text-xs font-medium text-white transition-all hover:shadow-md hover:shadow-peach/20 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      t("newsletter_button")
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-peach-light mb-4">
              {t("sections.links")}
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-peach"
                  >
                    {tNav(link.key)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/acemersoy/Ritim-Oyunu-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-peach"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal + Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-peach-light mb-4">
              {t("sections.legal")}
            </p>
            <ul className="space-y-2.5 mb-6">
              <li>
                <span className="text-sm text-muted transition-colors hover:text-peach cursor-pointer">
                  {t("links.privacy")}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted transition-colors hover:text-peach cursor-pointer">
                  {t("links.terms")}
                </span>
              </li>
            </ul>

            <p className="text-xs font-semibold uppercase tracking-wider text-peach-light mb-3">
              {t("sections.social")}
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-all hover:border-peach/40 hover:text-peach hover:bg-surface-alt"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-xs text-muted/70">
            {t("madeWith")} <Heart className="h-3 w-3 text-peach" />
          </p>
          <p className="text-xs text-muted/70">
            &copy; {year} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
