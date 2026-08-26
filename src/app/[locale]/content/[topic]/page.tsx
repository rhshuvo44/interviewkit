import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { getTopicContent, contentData } from "@/lib/content";
import { getTopicBySlug } from "@/lib/topics";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";

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

const topicLabels: Record<string, string> = {
  javascript: "Javascript",
  typescript: "Typescript",
  python: "Python",
  golang: "Golang",
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

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header locale={locale} />
      <div className="flex flex-1">
        <Sidebar locale={locale} t={t} />
        <main className="flex-1 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <div className="xl:grid xl:grid-cols-[1fr_240px] xl:gap-10">
              <div className="mx-auto w-full min-w-0 max-w-4xl">
                <div className="pb-24">
                  {/* Hero Section */}
                  <div className="relative mb-20">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-primary/5 blur-3xl rounded-[3rem] opacity-50" />
                    <div className="relative z-10">
                      <Link
                        href={`/${locale}`}
                        className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group mb-10 w-fit"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {t.sidebar.exploreAll}
                      </Link>

                      <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary tracking-widest uppercase mb-4">
                            Documentation Module
                          </div>
                          <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-gradient">
                            Overview
                          </h1>
                          <p className="max-w-[700px] text-base text-muted-foreground leading-relaxed">
                            {locale === "bn"
                              ? `${topicLabels[topic] || topic} ইন্টারভিউ কিটে আপনাকে স্বাগতম।`
                              : `Welcome to the ${topicLabels[topic] || topic} interview kit.`}
                          </p>
                        </div>

                        <div className="hidden lg:flex h-32 w-32 items-center justify-center rounded-3xl bg-card border border-border shadow-2xl shadow-primary/10">
                          <div className="h-16 w-16 text-primary opacity-80">
                            <FileText className="h-full w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content with left border */}
                  <div className="mb-24 relative border-l border-border/40 pl-8 ml-2">
                    <div className="prose dark:prose-invert max-w-none transition-colors duration-300 prose-headings:scroll-mt-20 prose-headings:font-black prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground dark:prose-strong:text-white prose-strong:font-bold prose-code:text-primary dark:prose-code:text-white dark:prose-code:bg-white/10 prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0">
                      <h1>{topicMeta.title} Mastery Guide</h1>
                      <p>{topicContent.overview}</p>
                      <hr />
                      <h2>Core Curriculum</h2>
                      <p>
                        {locale === "bn"
                          ? `এই সেকশনগুলো ${topicLabels[topic] || topic} এর মূল বিষয়গুলো কভার করে।`
                          : `These sections cover the core concepts of ${topicLabels[topic] || topic}.`}
                      </p>
                      <p>
                        <strong>{topicContent.subtopics.length}</strong>{" "}
                        {locale === "bn" ? "টি মডিউল" : "modules"}
                      </p>
                    </div>
                  </div>

                  {/* Subtopic Cards */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {topicContent.subtopics.map((subtopic, idx) => (
                      <Link
                        key={subtopic.slug}
                        href={`/${locale}/content/${topic}/${subtopic.slug}`}
                        className="group rounded-xl border border-border/50 bg-background p-6 transition-colors hover:bg-muted/30"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors">
                              {subtopic.title}
                            </h4>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {subtopic.description}
                            </p>
                          </div>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          {t.topic.startLearning}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar TOC */}
              <aside className="hidden xl:block">
                <div className="sticky top-24">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {locale === "bn" ? "এই নিবন্ধে" : "In this article"}
                  </p>
                  <ul className="space-y-1.5 border-l border-border/30 pl-3">
                    <li>
                      <a href="#overview" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {locale === "bn" ? "ওভারভিউ" : "Overview"}
                      </a>
                    </li>
                    {topicContent.subtopics.map((sub) => (
                      <li key={sub.slug}>
                        <a href={`#${sub.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
      <Footer t={t} />
    </div>
  );
}
