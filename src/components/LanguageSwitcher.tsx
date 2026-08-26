"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  const switchLocale = (target: string) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/");
  };

  return (
    <div className="flex items-center rounded-full border border-border/60 bg-muted/20 p-1 shadow-sm backdrop-blur-md">
      <Link
        href={switchLocale("en")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
          locale === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Globe className="h-3 w-3" />
        ENG
      </Link>
      <Link
        href={switchLocale("bn")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
          locale === "bn"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        বাংলা
      </Link>
    </div>
  );
}
