import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    title: sub ? `${sub.title} - InterviewKit` : "InterviewKit",
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
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-4xl px-4 py-10 md:px-8">
            <div className="mb-8">
              <Link
                href={`/${locale}/content/${topic}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.sidebar.backTo} {topicLabels[topic] || topic}
              </Link>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {subtopicData.title}
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {subtopicData.description}
            </p>

            <hr className="my-8 border-border/30" />

            <div className="mdx-content">
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

          {headings.length > 0 && (
            <aside className="hidden xl:block fixed right-8 top-24 w-56">
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
            </aside>
          )}
        </main>
      </div>
      <Footer t={t} />
    </div>
  );
}
