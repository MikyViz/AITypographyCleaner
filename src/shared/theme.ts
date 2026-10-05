export type Theme = 'system' | 'light' | 'dark';

export const DEFAULT_THEME: Theme = 'system';

/**
 * Проставляет data-theme на <html>: для 'system' атрибут снимается и
 * управление отдаётся media-запросу prefers-color-scheme в CSS, для
 * 'light'/'dark' — атрибут форсирует тему независимо от ОС/браузера.
 */
export function applyTheme(theme: Theme): void {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
