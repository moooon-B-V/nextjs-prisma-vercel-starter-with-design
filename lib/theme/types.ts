/**
 * Theme types for the two-axis design system.
 *
 * Axis 1 — Color (light/dark base, accent override, full-palette override)
 * Axis 2 — Shape (display-style controls radius/shadow/spacing/density)
 *
 * See docs/DESIGN.md for the rationale.
 */

/** Tier 1 — light/dark base. `system` follows OS preference at runtime. */
export type ThemePattern = 'system' | 'light' | 'dark';

/** Resolved pattern (what data-theme is set to after `system` resolves). */
export type ResolvedThemePattern = 'light' | 'dark';

/**
 * Axis 2 — shape personality. Overrides radius / shadow / spacing / density.
 * `default` is Notion-sober rectangles; `soft` is Figma-pill.
 */
export type DisplayStyle = 'default' | 'soft';

/** Storage keys for persisting user preferences. */
export const THEME_STORAGE_KEYS = {
  pattern: 'app.theme.pattern',
  displayStyle: 'app.theme.displayStyle',
} as const;

/** Sensible defaults if localStorage is empty. */
export const THEME_DEFAULTS = {
  pattern: 'system' as ThemePattern,
  displayStyle: 'default' as DisplayStyle,
} as const;
