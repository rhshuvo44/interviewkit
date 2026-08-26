"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ArrowRight, Command } from "lucide-react";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchItems: SearchItem[] = [
  { title: "JavaScript", description: "Core concepts, Event Loop, and modern ES6+ patterns.", href: "/content/javascript", category: "Topics" },
  { title: "TypeScript", description: "Type safety, Generics, and advanced utility types.", href: "/content/typescript", category: "Topics" },
  { title: "Node.js", description: "Runtime, Streams, and Backend architecture.", href: "/content/nodejs", category: "Topics" },
  { title: "Express.js", description: "Middleware, Routing, and RESTful API patterns.", href: "/content/expressjs", category: "Topics" },
  { title: "MongoDB", description: "NoSQL patterns, Aggregations, and indexing.", href: "/content/mongodb", category: "Topics" },
  { title: "System Design", description: "Scalability, Caching, and Load balancing.", href: "/content/system-design", category: "Topics" },
  { title: "Problem Solving", description: "Algorithms, Data Structures, and Big-O notation.", href: "/content/problem-solving", category: "Topics" },
  { title: "Introduction to JavaScript", description: "History, evolution, versions, execution environments.", href: "/content/javascript/introduction", category: "JavaScript" },
  { title: "Variables, Scoping, and Hoisting", description: "var, let, const, TDZ, scoping rules.", href: "/content/javascript/variables", category: "JavaScript" },
  { title: "Event Loop", description: "Call Stack, Macrotasks vs Microtasks.", href: "/content/javascript/event-loop", category: "JavaScript" },
  { title: "Introduction to TypeScript", description: "Fundamentals, type annotations, compiler.", href: "/content/typescript/introduction", category: "TypeScript" },
  { title: "Introduction to System Design", description: "Distributed systems and scalability.", href: "/content/system-design/introduction", category: "System Design" },
  { title: "Complexity Analysis (Big-O)", description: "Time and space efficiency analysis.", href: "/content/problem-solving/complexity-analysis", category: "Problem Solving" },
];

export function CommandPalette({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(`/${locale}${href}`);
    },
    [locale, router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2.5 text-sm text-muted-foreground shadow-neat backdrop-blur-sm transition-all hover:text-foreground md:hidden"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => { setOpen(false); setQuery(""); }}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border/50 bg-background shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-border/30 px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found.
            </li>
          )}
          {filtered.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleSelect(item.href)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
              >
                <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground bg-muted/50 rounded px-1.5 py-0.5">
                  {item.category}
                </span>
                <ArrowRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-border/30 px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Navigate with ↑↓</span>
          <span>Select with Enter</span>
        </div>
      </div>
    </div>
  );
}
