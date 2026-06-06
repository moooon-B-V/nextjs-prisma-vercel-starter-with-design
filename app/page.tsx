import { getTranslations } from 'next-intl/server';
import { LocaleToggle } from '@/components/LocaleToggle';

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-serif text-6xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground mt-4 text-sm">{t('subtitle')}</p>
      <a
        href="/tokens"
        className="mt-8 text-xs underline-offset-4 hover:underline"
        style={{ color: 'var(--color-link)' }}
      >
        {t('viewTokens')}
      </a>
      <div className="mt-8">
        <LocaleToggle />
      </div>
    </main>
  );
}
