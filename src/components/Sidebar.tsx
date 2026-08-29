"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getTopicsByCategory } from "@/lib/topics";

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    "Programming Languages": "Programming Languages",
    "Frontend Development": "Frontend Development",
    "Backend Development": "Backend Development",
    Databases: "Databases",
    "Systems & Architecture": "Systems & Architecture",
    "Algorithms & Problem Solving": "Algorithms & Problem Solving",
    "DevOps & Infrastructure": "DevOps & Infrastructure",
  },
  bn: {
    "Programming Languages": "প্রোগ্রামিং ল্যাঙ্গুয়েজ",
    "Frontend Development": "ফ্রন্টএন্ড ডেভেলপমেন্ট",
    "Backend Development": "ব্যাকএন্ড ডেভেলপমেন্ট",
    Databases: "ডেটাবেস",
    "Systems & Architecture": "সিস্টেম ও আর্কিটেকচার",
    "Algorithms & Problem Solving": "অ্যালগোরিদম ও সমস্যা সমাধান",
    "DevOps & Infrastructure": "ডেভঅপস ও ইনফ্রাস্ট্রাকচার",
  },
};

const topicIcons: Record<string, string> = {
  javascript: "code-xml",
  typescript: "file-code",
  python: "terminal",
  golang: "terminal",
  next: "workflow",
  react: "atom",
  nodejs: "server",
  expressjs: "zap",
  nestjs: "layers",
  mongodb: "database",
  sql: "database",
  postgresql: "database",
  prisma: "database",
  "system-design": "grid-3x3",
  "problem-solving": "brain",
  devops: "infinity",
};

export function Sidebar({ locale, t }: { locale: string; t: Record<string, any> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const categories = getTopicsByCategory();
  const labels = categoryLabels[locale] || categoryLabels.en;

  const isActive = (slug: string) => pathname.includes(`/content/${slug}`);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <>
      {/* Mobile sidebar trigger */}
      <div className="sticky top-0 z-20 flex h-12 items-center gap-4 border-b border-border/40 bg-background/80 px-4 backdrop-blur-lg md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md size-7 hover:bg-muted hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
          </svg>
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <div className="h-4 w-px bg-border/60"></div>
        <span className="text-sm font-medium text-muted-foreground">Menu</span>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={`flex w-(--sidebar-width) flex-col text-sidebar-foreground sticky top-14 h-[calc(100vh-3.5rem)] border-none bg-transparent transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      >
        <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto px-3 py-6 space-y-6 overflow-x-hidden">
          {Object.entries(categories).map(([category, topics]) => (
            <div key={category} className="relative flex w-full min-w-0 flex-col p-2 px-0 py-0">
              <div className="flex h-8 shrink-0 items-center rounded-md px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 select-none">
                {labels[category] || category}
              </div>
              <div className="w-full text-sm space-y-3">
                {topics.map((topic) => (
                  <div key={topic.slug} className="relative flex items-center w-full rounded-md hover:bg-muted/60 transition-colors">
                    <Link
                      href={`/${locale}/content/${topic.slug}`}
                      onClick={() => setOpen(false)}
                      className={`flex flex-1 items-center gap-2.5 min-w-0 px-2 h-9 outline-none ${
                        isActive(topic.slug)
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-primary/70 dark:text-white">
                        <path d="m18 16 4-4-4-4"></path>
                        <path d="m6 8-4 4 4 4"></path>
                        <path d="m14.5 4-5 16"></path>
                      </svg>
                      <span className="capitalize truncate">{topic.title.toLowerCase()}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="h-9 w-9 shrink-0 flex items-center justify-center bg-transparent border-0 outline-none"
                    >
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
