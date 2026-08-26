import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl animate-blob" />
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-green-500/10 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
          Page Not Found
        </span>
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-bold">Lost in the Code?</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Looks like you&apos;ve wandered into the digital void. The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/en"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-neat transition-all hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/en/content/javascript"
            className="inline-flex items-center rounded-lg border border-border/50 px-6 py-3 text-sm font-medium transition-all hover:bg-muted/30"
          >
            Browse JavaScript
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Error Code: 404
        </p>
      </div>
    </div>
  );
}
