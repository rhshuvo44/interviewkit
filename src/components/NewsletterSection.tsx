export function NewsletterSection({ t }: { t: Record<string, any> }) {
  return (
    <section className="py-24 border-t border-border/30">
      <div className="rounded-3xl bg-muted/10 border border-border/40 px-6 py-16 sm:px-16 sm:py-24 lg:flex lg:items-center lg:px-24">
        <div className="lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.newsletter.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t.newsletter.description}
          </p>
        </div>
        <div className="mt-8 lg:ml-12 lg:mt-0 lg:flex-shrink-0">
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t.newsletter.emailPlaceholder}
              required
              className="rounded-lg border border-border/50 bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-neat transition-all hover:opacity-90"
            >
              {t.newsletter.subscribe}
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            {t.newsletter.socialProof}
          </p>
        </div>
      </div>
    </section>
  );
}
