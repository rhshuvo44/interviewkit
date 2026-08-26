"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { getTopicsByCategory } from "@/lib/topics";

export function Sidebar({ locale, t }: { locale: string; t: Record<string, any> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const categories = getTopicsByCategory();

  const isActive = (slug: string) => pathname.includes(`/content/${slug}`);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-neat md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border/40 bg-background/95 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto py-6 px-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t.sidebar.menu}
          </p>
          <Link
            href={`/${locale}`}
            className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            {t.sidebar.exploreAll}
          </Link>

          {Object.entries(categories).map(([category, topics]) => (
            <div key={category} className="mb-6">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {category}
              </p>
              <ul className="space-y-0.5">
                {topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/${locale}/content/${topic.slug}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                        isActive(topic.slug)
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {topic.title.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
