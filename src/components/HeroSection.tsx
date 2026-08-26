import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export function HeroSection({
  t,
  locale,
}: {
  t: Record<string, any>;
  locale: string;
}) {
  return (
    <section className="flex flex-col items-center justify-center pt-20 pb-16 text-center md:pt-32 md:pb-28">
      <div className="animate-in fade-in slide-in-from-bottom-3 duration-1000">
        <Link
          href="#"
          className="command-pill mb-8 text-muted-foreground"
        >
          {t.hero.announcement}
          <span className="font-medium text-foreground">
            {t.hero.readAnnouncement}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-foreground">{t.hero.headline1}</span>
          <br />
          <span className="hero-text-gradient italic">
            {t.hero.headline2}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/content/javascript`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-neat transition-all hover:opacity-90"
          >
            {t.hero.getStarted}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative flex items-center rounded-xl border border-border/50 bg-background/80 px-4 py-3 shadow-neat backdrop-blur-sm">
            <Search className="mr-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={t.hero.searchPlaceholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </section>
  );
}
