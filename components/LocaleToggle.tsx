'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeLabel, type Locale } from '@/lib/i18n/locales';
import { setLocale } from '@/lib/i18n/actions';

// Locale switcher — a native <select> styled with design-system tokens. Writes
// the NEXT_LOCALE cookie via the setLocale server action inside a transition,
// then router.refresh() re-renders server components in the new locale (no full
// reload) — the same UX as the theme toggle.
export function LocaleToggle() {
  const current = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      aria-label="Language"
      value={current}
      disabled={isPending}
      onChange={(event) => {
        const next = event.target.value as Locale;
        startTransition(async () => {
          await setLocale(next);
          router.refresh();
        });
      }}
      className="rounded-(--radius-control) border border-(--color-hairline) bg-background px-(--spacing-sm) py-(--spacing-xs) font-sans text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color)"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabel[locale]}
        </option>
      ))}
    </select>
  );
}
