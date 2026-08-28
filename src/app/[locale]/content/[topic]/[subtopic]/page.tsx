import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ArticleNav } from "@/components/ArticleNav";
import { QuizSection } from "@/components/QuizSection";
import {
  getTopicContent,
  getSubtopic,
  getAdjacentSubtopics,
  contentData,
} from "@/lib/content";
import { getTopicBySlug } from "@/lib/topics";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const params: { locale: string; topic: string; subtopic: string }[] = [];
  for (const [topicSlug, topicData] of Object.entries(contentData)) {
    for (const sub of topicData.subtopics) {
      params.push({ locale: "en", topic: topicSlug, subtopic: sub.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string; subtopic: string }>;
}) {
  const { topic, subtopic } = await params;
  const sub = getSubtopic(topic, subtopic);
  return {
    title: sub ? `${sub.title} - Interview Kit` : "Interview Kit",
    description: sub?.description,
  };
}

function readMdxFile(topic: string, subtopic: string): string | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "en",
      topic,
      `${subtopic}.mdx`
    );
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; topic: string; subtopic: string }>;
}) {
  const { locale, topic, subtopic } = await params;
  const t = getTranslations(locale as Locale);
  const topicContent = getTopicContent(topic);
  const subtopicData = getSubtopic(topic, subtopic);
  const topicMeta = getTopicBySlug(topic);

  if (!topicContent || !subtopicData || !topicMeta) notFound();

  const mdxContent = readMdxFile(topic, subtopic);
  if (!mdxContent) notFound();

  const { prev, next } = getAdjacentSubtopics(topic, subtopic);

  const readMinutes = Math.max(
    1,
    Math.round(mdxContent.replace(/```[\s\S]*?```/g, "").split(/\s+/).length / 200)
  );

  const headings = mdxContent
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      slug: line
        .replace("## ", "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ /g, "-"),
      title: line.replace("## ", ""),
    }));

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header locale={locale} />
      <div className="flex flex-1">
        <Sidebar locale={locale} t={t} />
        <main className="flex-1 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <div className="xl:grid xl:grid-cols-[1fr_240px] xl:gap-10">
              <div className="mx-auto w-full min-w-0 max-w-3xl">
                <div className="mb-12">
                  <Link
                    href={`/${locale}/content/${topic}`}
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {locale === "bn" ? "ফিরে যান" : "Back to"}{" "}
                    {topicLabels[topic] || topic}
                  </Link>

                  <div className="mt-8">
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-gradient">
                      {subtopicData.title}
                    </h1>
                    <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                      {subtopicData.description}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {locale === "bn"
                        ? `~${readMinutes} মিনিট পড়া`
                        : `~${readMinutes} min read`}
                    </p>
                  </div>
                </div>

                <div className="relative border-l border-border/40 pl-8 ml-2">
                  <div className="prose dark:prose-invert max-w-none transition-colors duration-300 prose-headings:scroll-mt-20 prose-headings:font-black prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground dark:prose-strong:text-white prose-strong:font-bold prose-code:text-primary dark:prose-code:text-white dark:prose-code:bg-white/10 prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-img:rounded-3xl prose-img:border prose-img:border-border/40 prose-img:shadow-2xl">
                    <MDXRemote
                      source={mdxContent}
                      options={{
                        mdxOptions: {
                          remarkPlugins: [remarkGfm],
                          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                        },
                      }}
                    />
                  </div>
                </div>

                <QuizSection topic={topic} />

                <ArticleNav
                  locale={locale}
                  topicSlug={topic}
                  prev={prev}
                  next={next}
                  t={t}
                />

                <div className="mt-12 rounded-lg border border-border/40 bg-muted/20 px-6 py-4 text-center text-sm text-muted-foreground">
                  {t.topic.madeWith}{" "}
                  <a
                    href="https://github.com/rhshuvo44/interviewkit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:underline"
                  >
                    rhshuvo44
                  </a>{" "}
                  · {t.topic.feedback}{" "}
                  <a href="#" className="font-medium text-foreground hover:underline">
                    {t.topic.fillForm}
                  </a>
                </div>
              </div>

              {/* Right sidebar TOC */}
              {headings.length > 0 && (
                <aside className="hidden xl:block">
                  <div className="sticky top-24">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.topic.inThisArticle}
                    </p>
                    <ul className="space-y-1.5 border-l border-border/30 pl-3">
                      {headings.map((h) => (
                        <li key={h.slug}>
                          <a
                            href={`#${h.slug}`}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {h.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
