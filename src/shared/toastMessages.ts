import type { Stats } from '../core/normalize';
import { getMessage, plural, type SupportedLanguage } from './i18n';

type UnitBase =
  | 'toastUnitCharacter'
  | 'toastUnitQuotes'
  | 'toastUnitDashes'
  | 'toastUnitEllipsis'
  | 'toastUnitSpaces'
  | 'toastUnitInvisibles'
  | 'toastUnitOther';

/**
 * Возвращает словоформу для числа n. Для русского — три формы (1 / 2-4 / 5+),
 * для остальных языков (по умолчанию английские правила) — одна/многие.
 */
function unit(language: SupportedLanguage, base: UnitBase, n: number): string {
  const forms: [string, string, string] = [
    getMessage(language, `${base}One`),
    getMessage(language, `${base}Few`),
    getMessage(language, `${base}Many`),
  ];
  if (language === 'ru') return plural(n, forms);
  return n === 1 ? forms[0] : forms[2];
}

/** "Скопировано очищенным: заменено 8 символов" / "Copied cleaned: replaced 8 characters". */
export function formatToastTitle(language: SupportedLanguage, total: number): string {
  return getMessage(language, 'toastTitle', {
    count: String(total),
    unit: unit(language, 'toastUnitCharacter', total),
  });
}

const GROUP_ORDER: ReadonlyArray<{ key: keyof Stats['byGroup']; base: UnitBase }> = [
  { key: 'quotes', base: 'toastUnitQuotes' },
  { key: 'dashes', base: 'toastUnitDashes' },
  { key: 'ellipsis', base: 'toastUnitEllipsis' },
  { key: 'spaces', base: 'toastUnitSpaces' },
  { key: 'invisibles', base: 'toastUnitInvisibles' },
  { key: 'other', base: 'toastUnitOther' },
];

/** "2 кавычки, 1 тире, 1 многоточие, 1 спецпробел" — только ненулевые группы. */
export function formatToastBreakdown(language: SupportedLanguage, stats: Stats): string {
  return GROUP_ORDER.filter(({ key }) => stats.byGroup[key] > 0)
    .map(({ key, base }) => `${stats.byGroup[key]} ${unit(language, base, stats.byGroup[key])}`)
    .join(', ');
}
