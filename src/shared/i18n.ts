import browser from 'webextension-polyfill';
import de from '../../_locales/de/messages.json';
import en from '../../_locales/en/messages.json';
import es from '../../_locales/es/messages.json';
import fr from '../../_locales/fr/messages.json';
import he from '../../_locales/he/messages.json';
import hi from '../../_locales/hi/messages.json';
import it from '../../_locales/it/messages.json';
import ja from '../../_locales/ja/messages.json';
import ko from '../../_locales/ko/messages.json';
import nl from '../../_locales/nl/messages.json';
import pl from '../../_locales/pl/messages.json';
import ptBR from '../../_locales/pt_BR/messages.json';
import ptPT from '../../_locales/pt_PT/messages.json';
import ru from '../../_locales/ru/messages.json';
import uk from '../../_locales/uk/messages.json';
import zhCN from '../../_locales/zh_CN/messages.json';
import zhTW from '../../_locales/zh_TW/messages.json';

type MessageCatalog = Record<string, { message: string }>;

/** Доступные для ручного выбора языки интерфейса; 'auto' определяется по языку браузера. */
export const SUPPORTED_LANGUAGES = [
  'en',
  'ru',
  'uk',
  'he',
  'de',
  'fr',
  'es',
  'it',
  'pt_BR',
  'pt_PT',
  'nl',
  'pl',
  'zh_CN',
  'zh_TW',
  'ja',
  'ko',
  'hi',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type LanguageSetting = 'auto' | SupportedLanguage;

export const DEFAULT_LANGUAGE: LanguageSetting = 'auto';

const CATALOGS: Record<SupportedLanguage, MessageCatalog> = {
  en,
  ru,
  uk,
  he,
  de,
  fr,
  es,
  it,
  pt_BR: ptBR,
  pt_PT: ptPT,
  nl,
  pl,
  zh_CN: zhCN,
  zh_TW: zhTW,
  ja,
  ko,
  hi,
};

/** Нативные названия языков для <select>; "auto" подписывается переводом ключа languageAuto. */
export const LANGUAGE_NATIVE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  he: 'עברית',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt_BR: 'Português (Brasil)',
  pt_PT: 'Português (Portugal)',
  nl: 'Nederlands',
  pl: 'Polski',
  zh_CN: '简体中文',
  zh_TW: '繁體中文',
  ja: '日本語',
  ko: '한국어',
  hi: 'हिन्दी',
};

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/** Приводит код языка браузера (например "ru-RU", "zh-Hant-TW", "pt-BR") к одному из поддерживаемых. */
function normalizeBrowserLanguage(uiLanguage: string): SupportedLanguage {
  const normalized = uiLanguage.toLowerCase().replace(/-/g, '_');
  if (isSupportedLanguage(normalized)) return normalized;

  if (normalized === 'iw') return 'he'; // устаревший код иврита в некоторых браузерах
  if (normalized.startsWith('zh')) {
    return normalized.includes('tw') || normalized.includes('hant') || normalized.includes('hk')
      ? 'zh_TW'
      : 'zh_CN';
  }
  if (normalized.startsWith('pt')) {
    return normalized.includes('br') ? 'pt_BR' : 'pt_PT';
  }

  const base = normalized.split('_')[0] ?? '';
  return isSupportedLanguage(base) ? base : 'en';
}

/** Превращает хранимую настройку языка в конкретный язык каталога ('auto' → язык браузера). */
export function resolveLanguage(setting: LanguageSetting): SupportedLanguage {
  if (setting === 'auto') return normalizeBrowserLanguage(browser.i18n.getUILanguage());
  return setting;
}

/** Подставляет {token} в сообщении значениями из substitutions (если заданы). */
export function getMessage(
  language: SupportedLanguage,
  key: string,
  substitutions?: Record<string, string>,
): string {
  const raw = CATALOGS[language]?.[key]?.message ?? CATALOGS.en[key]?.message ?? key;
  if (!substitutions) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, token: string) => substitutions[token] ?? match);
}

/**
 * Выбирает нужную словоформу по числу для языков со славянской системой
 * множественного числа (1 / 2-4 / 5+, кроме 11-14): forms = [one, few, many].
 * Например plural(2, ['кавычка', 'кавычки', 'кавычек']) → 'кавычки'.
 */
export function plural(n: number, forms: readonly [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

/** Локализует все элементы с data-i18n/data-i18n-placeholder и проставляет lang/dir на <html>. */
export function localizeDocument(language: SupportedLanguage): void {
  document.documentElement.lang = language.replace('_', '-');
  document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    element.textContent = getMessage(language, element.dataset.i18n ?? '');
  });

  document
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]')
    .forEach((element) => {
      element.placeholder = getMessage(language, element.dataset.i18nPlaceholder ?? '');
    });
}
