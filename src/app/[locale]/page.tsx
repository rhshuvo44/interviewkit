import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TopicCardGrid } from "@/components/TopicCardGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "bn") notFound();

  const t = getTranslations(locale as Locale);

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <div className="relative min-h-screen bg-background font-sans selection:bg-primary/10">
          <div className="doc-hero-bg opacity-70" />
          <div className="hero-grid" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
            <HeroSection t={t} locale={locale} />
            <TopicCardGrid locale={locale} />
            <FeaturesSection t={t} />
            <NewsletterSection t={t} />
          </div>
        </div>
      </main>
      <Footer t={t} />
    </>
  );
}
