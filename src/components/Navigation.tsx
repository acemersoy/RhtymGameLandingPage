"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X, Music2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "techStack", href: "#tech-stack" },
  { key: "faq", href: "#faq" },
];

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = () => {
    const next = locale === "tr" ? "en" : "tr";
    trackEvent("switch_language", { from: locale, to: next });
    router.replace(pathname, { locale: next });
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2 text-lg font-bold"
        >
          <Music2 className="h-6 w-6 text-accent" />
          <span className="gradient-text">Rhythm Game</span>
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ key, href }) => (
            <button
              key={key}
              onClick={() => scrollTo(href)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(key)}
            </button>
          ))}
          <button
            onClick={switchLocale}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium tracking-wide text-muted transition-all hover:border-accent/50 hover:text-foreground hover:bg-accent/5"
          >
            {t("language")}
          </button>
          <a
            href="https://github.com/acemersoy/RhtymGameLandingPage"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_github", { location: "nav" })}
            className="rounded-full bg-gradient-to-r from-accent to-peach-dark px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-peach/15"
          >
            {t("github")}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="glass border-t border-border md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => scrollTo(href)}
                className="text-left text-sm text-muted transition-colors hover:text-foreground"
              >
                {t(key)}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={switchLocale}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted hover:border-accent/50 hover:text-foreground"
              >
                {t("language")}
              </button>
              <a
                href="https://github.com/acemersoy/RhtymGameLandingPage"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
              >
                {t("github")}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
