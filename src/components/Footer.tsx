import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer({ t }: { t: Record<string, any> }) {
  return (
    <footer className="border-t border-border/40 py-8 md:py-12">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold">Interview Kit</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p className="text-xs text-muted-foreground">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rhshuvo44/interviewkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="inline h-3.5 w-3.5 mr-1" />
                {t.footer.github}
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="inline h-3.5 w-3.5 mr-1" />
                {t.footer.twitter}
              </a>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="inline h-3.5 w-3.5 mr-1" />
                {t.footer.discord}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
