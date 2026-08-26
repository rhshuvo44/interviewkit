import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { getTopicContent, contentData } from "@/lib/content";
import { getTopicBySlug } from "@/lib/topics";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(contentData).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { topic } = await params;
  const topicData = getTopicBySlug(topic);
  return {
    title: topicData
      ? `${topicData.title} - Interview Kit`
      : "Interview Kit",
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const t = getTranslations(locale as Locale);
  const topicContent = getTopicContent(topic);
  const topicMeta = getTopicBySlug(topic);

  if (!topicContent || !topicMeta) notFound();

  const topicLabels: Record<string, string> = {
    javascript: "Javascript",
    typescript: "Typescript",
    python: "Python",
    next: "Next.js",
    react: "React",
    nodejs: "Node.js",
    expressjs: "Express.js",
    nestjs: "NestJS",
    mongodb: "MongoDB",
    sql: "SQL",
    postgresql: "PostgreSQL",
    "system-design": "System Design",
    "problem-solving": "Problem Solving",
    devops: "DevOps",
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header locale={locale} />
      <div className="flex flex-1">
        <Sidebar locale={locale} t={t} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-4xl px-4 py-10 md:px-8">
            <div className="mb-8 rounded-lg border border-border/40 bg-muted/20 px-4 py-3">
              <Link
                href={`/${locale}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.sidebar.exploreAll}
              </Link>
            </div>

            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
              Documentation Module
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Overview
            </h1>
            <p className="mt-2 text-muted-foreground">
              Welcome to the {topicLabels[topic] || topic} interview kit.
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight">
                {topicMeta.title} Mastery Guide
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {topicContent.overview}
              </p>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold mb-2">
                {t.topic.coreCurriculum}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {t.topic.fundamentalModules}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {topicContent.subtopics.length} {t.topic.modules}
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {topicContent.subtopics.map((subtopic) => (
                  <Link
                    key={subtopic.slug}
                    href={`/${locale}/content/${topic}/${subtopic.slug}`}
                    className="group rounded-xl border border-border/50 bg-background p-6 transition-colors hover:bg-muted/30"
                  >
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {subtopic.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {subtopic.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {t.topic.startLearning}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer t={t} />
    </div>
  );
}
