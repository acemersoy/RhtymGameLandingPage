import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const t = useTranslations("privacy");

  const sections = t.raw("sections") as { title: string; content: string }[];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-peach transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <h1 className="text-3xl font-bold sm:text-4xl gradient-text mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-muted mb-12">{t("lastUpdated")}</p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-peach-light mb-3">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
