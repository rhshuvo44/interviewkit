import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavItem {
  slug: string;
  title: string;
}

export function ArticleNav({
  locale,
  topicSlug,
  prev,
  next,
  t,
}: {
  locale: string;
  topicSlug: string;
  prev: NavItem | null;
  next: NavItem | null;
  t: Record<string, any>;
}) {
  return (
    <nav className="mt-12 flex items-center justify-between border-t border-border/30 pt-8">
      {prev ? (
        <Link
          href={`/${locale}/content/${topicSlug}/${prev.slug}`}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <div>
            <p className="text-xs text-muted-foreground">{t.topic.previous}</p>
            <p className="font-medium">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/${locale}/content/${topicSlug}/${next.slug}`}
          className="group flex items-center gap-2 text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <div>
            <p className="text-xs text-muted-foreground">{t.topic.next}</p>
            <p className="font-medium">{next.title}</p>
          </div>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
