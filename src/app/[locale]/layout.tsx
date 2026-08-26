import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "bn" }];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Metadata {
  return {
    title: "InterviewKit - Ace Your Tech Interviews",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="relative flex min-h-screen flex-col">
      {children}
    </div>
  );
}
