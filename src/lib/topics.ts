export type TopicSlug =
  | "javascript"
  | "typescript"
  | "nodejs"
  | "expressjs"
  | "mongodb"
  | "system-design"
  | "problem-solving"
  | "python"
  | "next"
  | "react"
  | "sql"
  | "postgresql"
  | "nestjs"
  | "devops";

export interface TopicMeta {
  slug: TopicSlug;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const topics: TopicMeta[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Core concepts, Event Loop, and modern ES6+ patterns.",
    icon: "code",
    category: "Programming Languages",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    description: "Type safety, Generics, and advanced utility types.",
    icon: "shield",
    category: "Programming Languages",
  },
  {
    slug: "python",
    title: "Python",
    description: "Data structures, decorators, and async patterns.",
    icon: "file-code",
    category: "Programming Languages",
  },
  {
    slug: "next",
    title: "Next.js",
    description: "App Router, Server Components, and full-stack patterns.",
    icon: "layout",
    category: "Frontend Development",
  },
  {
    slug: "react",
    title: "React",
    description: "Hooks, Context, reconciliation, and performance.",
    icon: "atom",
    category: "Frontend Development",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    description: "Runtime, Streams, and Backend architecture.",
    icon: "globe",
    category: "Backend Development",
  },
  {
    slug: "expressjs",
    title: "Express.js",
    description: "Middleware, Routing, and RESTful API patterns.",
    icon: "server",
    category: "Backend Development",
  },
  {
    slug: "nestjs",
    title: "NestJS",
    description: "Modules, Guards, and enterprise architecture.",
    icon: "boxes",
    category: "Backend Development",
  },
  {
    slug: "mongodb",
    title: "MongoDB",
    description: "NoSQL patterns, Aggregations, and indexing.",
    icon: "database",
    category: "Databases",
  },
  {
    slug: "sql",
    title: "SQL",
    description: "Joins, subqueries, indexing, and optimization.",
    icon: "table",
    category: "Databases",
  },
  {
    slug: "postgresql",
    title: "PostgreSQL",
    description: "Advanced queries, JSONB, and performance tuning.",
    icon: "database",
    category: "Databases",
  },
  {
    slug: "system-design",
    title: "System Design",
    description: "Scalability, Caching, and Load balancing.",
    icon: "share",
    category: "Systems & Architecture",
  },
  {
    slug: "problem-solving",
    title: "Problem Solving",
    description: "Algorithms, Data Structures, and Big-O notation.",
    icon: "brain",
    category: "Algorithms & Problem Solving",
  },
  {
    slug: "devops",
    title: "DevOps",
    description: "CI/CD, Docker, Kubernetes, and cloud deployment.",
    icon: "container",
    category: "DevOps & Infrastructure",
  },
];

export const homepageTopics: TopicSlug[] = [
  "javascript",
  "typescript",
  "python",
  "next",
  "react",
  "nodejs",
  "expressjs",
  "nestjs",
  "mongodb",
  "sql",
  "postgresql",
  "system-design",
  "problem-solving",
  "devops",
];

export function getTopicBySlug(slug: string): TopicMeta | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicsByCategory(): Record<string, TopicMeta[]> {
  const grouped: Record<string, TopicMeta[]> = {};
  for (const topic of topics) {
    if (!grouped[topic.category]) {
      grouped[topic.category] = [];
    }
    grouped[topic.category].push(topic);
  }
  return grouped;
}
