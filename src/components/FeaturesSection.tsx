import { Zap } from "lucide-react";

export function FeaturesSection({ t }: { t: Record<string, any> }) {
  const features = [
    {
      title: t.features.deepDive,
      description: t.features.deepDiveDesc,
    },
    {
      title: t.features.algorithms,
      description: t.features.algorithmsDesc,
    },
    {
      title: t.features.system,
      description: t.features.systemDesc,
    },
  ];

  return (
    <section className="py-24 border-t border-border/30">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t.features.description}
          </p>
          <dl className="mt-8 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <dt className="flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary/60" />
                </dt>
                <dd>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-xl border border-border/50 bg-muted/10 p-6 shadow-neat">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-3 w-3 rounded-full bg-red-500/50" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <span className="h-3 w-3 rounded-full bg-green-500/50" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              bash — 80×24
            </span>
          </div>
          <pre className="font-mono text-sm leading-relaxed text-foreground overflow-x-auto">
            <code>
              <span className="text-green-500">$</span> npx
              interview-kit@latest init
              {"\n"}
              <span className="text-muted-foreground">
                # Initializing interview path...
              </span>
              {"\n"}
              {"\n"}
              <span className="text-muted-foreground">?</span> Select target
              track:
              {"\n"}
              <span className="text-green-500">❯</span> Fullstack (React +
              Node.js)
              {"\n"}
              {"  "} Backend (System Design + Go)
              {"\n"}
              {"  "} Frontend (Performance + Architecture)
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
