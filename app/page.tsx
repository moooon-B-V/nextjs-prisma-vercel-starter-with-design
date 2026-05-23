export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-serif text-6xl font-semibold tracking-tight">Next.js + Prisma starter</h1>
      <p className="text-muted-foreground mt-4 text-sm">with a polished design system</p>
      <a
        href="/tokens"
        className="mt-8 text-xs underline-offset-4 hover:underline"
        style={{ color: 'var(--color-link)' }}
      >
        view design tokens →
      </a>
    </main>
  );
}
