export interface SubtopicMeta {
  slug: string;
  title: string;
  description: string;
}

export interface TopicContent {
  slug: string;
  title: string;
  description: string;
  overview: string;
  subtopics: SubtopicMeta[];
}

export const contentData: Record<string, TopicContent> = {
  javascript: {
    slug: "javascript",
    title: "JavaScript",
    description:
      "Core concepts, Event Loop, and modern ES6+ patterns.",
    overview:
      "Welcome to the JavaScript interview kit. Accelerate your path to becoming a Senior JavaScript Engineer. This curated guide dives deep into the engine internals, advanced patterns, and technical mental models required to excel in modern high-performance environments.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to JavaScript",
        description:
          "A comprehensive interview-focused introduction to JavaScript covering its history, evolution, versions, execution environments, and how JavaScript works.",
      },
      {
        slug: "variables",
        title: "Variables, Scoping, and Hoisting",
        description:
          "A comprehensive interview-focused guide covering variable declarations (var, let, const), scoping rules, hoisting mechanics, the Temporal Dead Zone, and variable naming conventions.",
      },
      {
        slug: "functions",
        title: "Functions - Parameters, Arrow Functions, IIFE, Closures & Built-ins",
        description:
          "A comprehensive interview-focused guide covering function parameters (default & rest), arrow functions, IIFE, scope and the function call stack, and essential built-in JavaScript functions.",
      },
      {
        slug: "event-loop",
        title: "Event Loop",
        description:
          "Mastering the Event Loop, Call Stack, and Macrotasks vs Microtasks.",
      },
      {
        slug: "closures",
        title: "Closures",
        description:
          "Understanding lexical scoping and closures in JavaScript.",
      },
      {
        slug: "promises",
        title: "Promises",
        description:
          "Asynchronous operations and Error handling with Promises.",
      },
    ],
  },
  typescript: {
    slug: "typescript",
    title: "TypeScript",
    description:
      "Type safety, Generics, and advanced utility types.",
    overview:
      "Welcome to the TypeScript interview kit. TypeScript adds a powerful type system on top of JavaScript, enabling better tooling, early error detection, and more maintainable codebases.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to TypeScript",
        description:
          "Understanding TypeScript fundamentals, type annotations, and the compiler.",
      },
      {
        slug: "basic-types",
        title: "Basic Types and Annotations",
        description:
          "Primitives, arrays, tuples, enums, any, unknown, and void.",
      },
      {
        slug: "generics",
        title: "Generics",
        description:
          "Creating reusable, type-safe components with generics.",
      },
    ],
  },
  "system-design": {
    slug: "system-design",
    title: "System Design",
    description:
      "Scalability, Caching, and Load balancing.",
    overview:
      "Welcome to the System Design interview kit. Learn the principles of designing large-scale distributed systems, from load balancing to database sharding.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to System Design",
        description:
          "Fundamental concepts of distributed systems and scalability.",
      },
      {
        slug: "load-balancing",
        title: "Load Balancing",
        description:
          "Strategies for distributing traffic across servers.",
      },
      {
        slug: "caching",
        title: "Caching Strategies",
        description:
          "In-memory caches, CDN, and cache invalidation patterns.",
      },
    ],
  },
  "problem-solving": {
    slug: "problem-solving",
    title: "Problem Solving",
    description:
      "Algorithms, Data Structures, and Big-O notation.",
    overview:
      "Welcome to the Problem Solving interview kit. Master algorithmic thinking, data structures, and computational complexity analysis.",
    subtopics: [
      {
        slug: "complexity-analysis",
        title: "Complexity Analysis (Big-O)",
        description:
          "Mathematical foundations for analyzing time and space efficiency.",
      },
      {
        slug: "data-structures",
        title: "Memory & Data Structures",
        description:
          "The structural theory underlying Arrays, Linked Lists, & Hash Maps.",
      },
      {
        slug: "algorithmic-patterns",
        title: "Algorithmic Patterns",
        description:
          "Reusable heuristics like Sliding Window and Two Pointers.",
      },
    ],
  },
  nodejs: {
    slug: "nodejs",
    title: "Node.js",
    description:
      "Runtime, Streams, and Backend architecture.",
    overview:
      "Welcome to the Node.js interview kit. Understand the V8-powered runtime, event-driven architecture, and backend patterns.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to Node.js",
        description:
          "Understanding the runtime, V8 engine, and non-blocking I/O.",
      },
      {
        slug: "modules",
        title: "Modules and NPM",
        description:
          "CommonJS, ES Modules, and package management.",
      },
    ],
  },
  expressjs: {
    slug: "expressjs",
    title: "Express.js",
    description:
      "Middleware, Routing, and RESTful API patterns.",
    overview:
      "Welcome to the Express.js interview kit. Master the most popular Node.js web framework.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to Express.js",
        description:
          "Routing, middleware, and request/response cycle.",
      },
      {
        slug: "middleware",
        title: "Middleware Deep Dive",
        description:
          "Custom middleware, error handling, and authentication.",
      },
    ],
  },
  mongodb: {
    slug: "mongodb",
    title: "MongoDB",
    description:
      "NoSQL patterns, Aggregations, and indexing.",
    overview:
      "Welcome to the MongoDB interview kit. Master document-based database design and optimization.",
    subtopics: [
      {
        slug: "introduction",
        title: "Introduction to MongoDB",
        description:
          "Document model, collections, and CRUD operations.",
      },
      {
        slug: "aggregation",
        title: "Aggregation Pipeline",
        description:
          "Data transformation and analysis with aggregation stages.",
      },
    ],
  },
};

export function getTopicContent(topicSlug: string): TopicContent | undefined {
  return contentData[topicSlug];
}

export function getSubtopic(
  topicSlug: string,
  subtopicSlug: string
): SubtopicMeta | undefined {
  const topic = contentData[topicSlug];
  return topic?.subtopics.find((s) => s.slug === subtopicSlug);
}

export function getAdjacentSubtopics(
  topicSlug: string,
  subtopicSlug: string
): { prev: SubtopicMeta | null; next: SubtopicMeta | null } {
  const topic = contentData[topicSlug];
  if (!topic) return { prev: null, next: null };
  const idx = topic.subtopics.findIndex((s) => s.slug === subtopicSlug);
  return {
    prev: idx > 0 ? topic.subtopics[idx - 1] : null,
    next:
      idx < topic.subtopics.length - 1 ? topic.subtopics[idx + 1] : null,
  };
}
