import Link from "next/link";
import {
  Code,
  Shield,
  Globe,
  Server,
  Database,
  Share2,
  ArrowRight,
  FileCode,
  Layout,
  Atom,
  Boxes,
  Table,
  Brain,
  Container,
} from "lucide-react";
import { homepageTopics, getTopicBySlug } from "@/lib/topics";

const iconMap: Record<string, React.ComponentType<any>> = {
  code: Code,
  shield: Shield,
  globe: Globe,
  server: Server,
  database: Database,
  share: Share2,
  "file-code": FileCode,
  layout: Layout,
  atom: Atom,
  boxes: Boxes,
  table: Table,
  brain: Brain,
  container: Container,
};

export function TopicCardGrid({ locale }: { locale: string }) {
  return (
    <section className="mb-32">
      <div className="grid grid-cols-1 gap-px bg-border/20 overflow-hidden rounded-2xl border border-border/50 sm:grid-cols-2 lg:grid-cols-3">
        {homepageTopics.map((slug) => {
          const topic = getTopicBySlug(slug);
          if (!topic) return null;
          const Icon = iconMap[topic.icon] || Code;
          return (
            <Link
              key={topic.slug}
              href={`/${locale}/content/${topic.slug}`}
              className="group relative bg-background p-8 transition-colors hover:bg-muted/30"
            >
              <div className="doc-card-icon shadow-neat mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {topic.description}
              </p>
              <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
