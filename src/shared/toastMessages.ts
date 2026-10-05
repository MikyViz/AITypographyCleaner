import type { Stats } from '../core/normalize';
import { getMessage, plural, type SupportedLanguage } from './i18n';

type UnitBase =
  | 'toastUnitCharacter'
  | 'toastUnitQuotes'
  | 'toastUnitDashes'
  | 'toastUnitEllipsis'
  | 'toastUnitSpaces'
  | 'toastUnitInvisibles'
  | 'toastUnitMinus'
  | 'toastUnitArrows'
  | 'toastUnitBullets'
  | 'toastUnitSymbols';

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

/** Короткий однострочный заголовок: "Очищено: 6 символов" / "Cleaned: 6 symbols". */
export function formatToastTitle(language: SupportedLanguage, total: number): string {
  return getMessage(language, 'toastTitle', {
    count: String(total),
    unit: unit(language, 'toastUnitCharacter', total),
  });
}

/** Порядок используется только как tie-breaker при равном count — сортировка по убыванию ниже первична. */
const GROUP_ORDER: ReadonlyArray<{ key: keyof Stats['byGroup']; base: UnitBase }> = [
  { key: 'quotes', base: 'toastUnitQuotes' },
  { key: 'dashes', base: 'toastUnitDashes' },
  { key: 'ellipsis', base: 'toastUnitEllipsis' },
  { key: 'spaces', base: 'toastUnitSpaces' },
  { key: 'invisibles', base: 'toastUnitInvisibles' },
  { key: 'minus', base: 'toastUnitMinus' },
  { key: 'arrows', base: 'toastUnitArrows' },
  { key: 'bullets', base: 'toastUnitBullets' },
  { key: 'symbols', base: 'toastUnitSymbols' },
];

/** Не более стольких групп выводится явно; остальное сворачивается в "и ещё N". */
const MAX_VISIBLE_GROUPS = 3;

/**
 * "3 тире, 2 кавычки, 1 минус" — только ненулевые группы, отсортированные по убыванию count.
 * Если групп больше MAX_VISIBLE_GROUPS, остаток схлопывается в "и ещё N" (сумма их count).
 */
export function formatToastBreakdown(language: SupportedLanguage, stats: Stats): string {
  const nonZero = GROUP_ORDER.filter(({ key }) => stats.byGroup[key] > 0).sort(
    (a, b) => stats.byGroup[b.key] - stats.byGroup[a.key],
  );

  const visible = nonZero.slice(0, MAX_VISIBLE_GROUPS);
  const rest = nonZero.slice(MAX_VISIBLE_GROUPS);

  const parts = visible.map(
    ({ key, base }) => `${stats.byGroup[key]} ${unit(language, base, stats.byGroup[key])}`,
  );

  if (rest.length > 0) {
    const restTotal = rest.reduce((sum, { key }) => sum + stats.byGroup[key], 0);
    parts.push(getMessage(language, 'toastAndMore', { count: String(restTotal) }));
  }

  return parts.join(', ');
}
