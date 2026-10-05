import browser from 'webextension-polyfill';
import { defaultOptions, type Options } from '../core/normalize';
import { DEFAULT_THEME, type Theme } from './theme';

export interface StoredSettings {
  options: Options;
  whitelist: string[];
  theme: Theme;
}

export const DEFAULT_WHITELIST = ['chatgpt.com', 'claude.ai', 'gemini.google.com'];

export const defaultSettings: StoredSettings = {
  options: defaultOptions,
  whitelist: DEFAULT_WHITELIST,
  theme: DEFAULT_THEME,
};

export async function getSettings(): Promise<StoredSettings> {
  const stored = (await browser.storage.sync.get(
    defaultSettings as unknown as Record<string, unknown>,
  )) as unknown as StoredSettings;
  return {
    options: { ...defaultOptions, ...stored.options },
    whitelist: stored.whitelist ?? DEFAULT_WHITELIST,
    theme: stored.theme ?? DEFAULT_THEME,
  };
}

export async function saveSettings(settings: StoredSettings): Promise<void> {
  await browser.storage.sync.set(settings as unknown as Record<string, unknown>);
}

export function onSettingsChanged(callback: (settings: StoredSettings) => void): void {
  browser.storage.onChanged.addListener((_changes, area) => {
    if (area !== 'sync') return;
    void getSettings().then(callback);
  });
}

/** Отбрасывает протокол/путь введённого пользователем адреса, оставляя голый домен. */
export function sanitizeDomain(input: string): string | null {
  const stripped = input.trim().toLowerCase().replace(/^[a-z]+:\/\//, '').split('/')[0] ?? '';
  return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(stripped) ? stripped : null;
}

export function domainToOriginPattern(domain: string): string {
  return `*://${domain}/*`;
}
