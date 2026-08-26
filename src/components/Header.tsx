"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Github, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/content/javascript", label: "Content" },
  { href: "/content/typescript", label: "TypeScript" },
  { href: "/content/system-design", label: "System Design" },
  { href: "/content/problem-solving", label: "Algorithms" },
];

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href={`/${locale}`} className="text-sm font-bold">
            Interview Kit
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname.includes(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <a
            href="https://github.com/rhshuvo44/interviewkit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/20 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            Star on GitHub
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted/50 transition-colors"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm transition-colors hover:text-foreground ${
                pathname.includes(link.href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/rhshuvo44/interviewkit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            Star on GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
