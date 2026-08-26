"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuizzes: Record<string, QuizQuestion[]> = {
  javascript: [
    {
      question: "What is the output of typeof null?",
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correct: 2,
      explanation:
        'typeof null returns "object" — this is a well-known bug in JavaScript that has existed since the first version.',
    },
    {
      question: "What does the Event Loop primarily manage?",
      options: [
        "Memory allocation",
        "Thread pool management",
        "Callback queue and microtask queue execution order",
        "DOM rendering",
      ],
      correct: 2,
      explanation:
        "The Event Loop manages the execution of callbacks from the macrotask and microtask queues when the call stack is empty.",
    },
    {
      question: "Which keyword creates a block-scoped variable?",
      options: ["var", "let", "Both var and let", "Neither"],
      correct: 1,
      explanation:
        "let (and const) are block-scoped. var is function-scoped, meaning it ignores block boundaries.",
    },
  ],
  typescript: [
    {
      question: "What is the difference between interface and type?",
      options: [
        "No difference",
        "Interface supports declaration merging, type uses intersection",
        "Type is faster at runtime",
        "Interface cannot have optional properties",
      ],
      correct: 1,
      explanation:
        "Interfaces support declaration merging and extends. Types support intersection (&) and more complex type operations.",
    },
  ],
  "system-design": [
    {
      question: "What is the primary purpose of a load balancer?",
      options: [
        "Encrypt data",
        "Distribute traffic across multiple servers",
        "Store cached data",
        "Manage database connections",
      ],
      correct: 1,
      explanation:
        "Load balancers distribute incoming network traffic across multiple servers to ensure no single server is overwhelmed.",
    },
  ],
};

export function QuizSection({ topic }: { topic: string }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions = sampleQuizzes[topic] || sampleQuizzes.javascript;
  const q = questions[current];

  if (!q) return null;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrent((c) => (c + 1) % questions.length);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="mt-12 rounded-xl border border-border/50 bg-muted/10 p-6">
      <h3 className="text-lg font-bold mb-1">Quick Quiz</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Test your knowledge on this topic.
      </p>

      <p className="font-medium text-sm mb-4">{q.question}</p>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let style = "border border-border/50 bg-background hover:bg-muted/30";
          if (showResult && idx === q.correct) {
            style = "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400";
          } else if (showResult && idx === selected && idx !== q.correct) {
            style = "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400";
          } else if (!showResult && idx === selected) {
            style = "border-primary bg-primary/5";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all ${style}`}
            >
              {showResult && idx === q.correct && (
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
              )}
              {showResult && idx === selected && idx !== q.correct && (
                <XCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
              )}
              {!showResult && (
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-border/50 text-[10px] font-medium text-muted-foreground">
                  {String.fromCharCode(65 + idx)}
                </span>
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4 rounded-lg bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Explanation</p>
          {q.explanation}
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
        >
          Next Question
        </button>
      )}
    </div>
  );
}
