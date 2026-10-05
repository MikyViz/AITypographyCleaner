import { describe, expect, it } from 'vitest';
import { createEmptyStats, type Stats } from '../src/core/normalize';
import { plural } from '../src/shared/i18n';
import { formatToastBreakdown, formatToastTitle } from '../src/shared/toastMessages';

function statsWith(overrides: Partial<Stats['byGroup']>): Stats {
  const stats = createEmptyStats();
  Object.assign(stats.byGroup, overrides);
  stats.total = Object.values(stats.byGroup).reduce((sum, n) => sum + n, 0);
  return stats;
}

describe('plural', () => {
  it('picks the "one" form for numbers ending in 1 (except 11)', () => {
    expect(plural(1, ['символ', 'символа', 'символов'])).toBe('символ');
    expect(plural(21, ['символ', 'символа', 'символов'])).toBe('символ');
    expect(plural(101, ['символ', 'символа', 'символов'])).toBe('символ');
  });

  it('picks the "few" form for numbers ending in 2-4 (except 12-14)', () => {
    expect(plural(2, ['символ', 'символа', 'символов'])).toBe('символа');
    expect(plural(3, ['символ', 'символа', 'символов'])).toBe('символа');
    expect(plural(4, ['символ', 'символа', 'символов'])).toBe('символа');
    expect(plural(22, ['символ', 'символа', 'символов'])).toBe('символа');
  });

  it('picks the "many" form for 0, 5-20, and numbers ending in 11-14', () => {
    expect(plural(0, ['символ', 'символа', 'символов'])).toBe('символов');
    expect(plural(5, ['символ', 'символа', 'символов'])).toBe('символов');
    expect(plural(11, ['символ', 'символа', 'символов'])).toBe('символов');
    expect(plural(12, ['символ', 'символа', 'символов'])).toBe('символов');
    expect(plural(14, ['символ', 'символа', 'символов'])).toBe('символов');
    expect(plural(111, ['символ', 'символа', 'символов'])).toBe('символов');
  });
});

describe('formatToastTitle', () => {
  it('uses correct Russian plural forms for the character count', () => {
    expect(formatToastTitle('ru', 1)).toBe('Очищено: 1 символ');
    expect(formatToastTitle('ru', 2)).toBe('Очищено: 2 символа');
    expect(formatToastTitle('ru', 5)).toBe('Очищено: 5 символов');
    expect(formatToastTitle('ru', 21)).toBe('Очищено: 21 символ');
  });

  it('uses English singular/plural for the character count', () => {
    expect(formatToastTitle('en', 1)).toBe('Cleaned: 1 symbol');
    expect(formatToastTitle('en', 8)).toBe('Cleaned: 8 symbols');
  });

  it('falls back to English for unsupported toast keys in other locales', () => {
    expect(formatToastTitle('fr', 1)).toBe('Cleaned: 1 symbol');
  });
});

describe('formatToastBreakdown', () => {
  it('lists non-zero groups sorted by count descending', () => {
    const stats = statsWith({ quotes: 1, dashes: 3, ellipsis: 1 });
    expect(formatToastBreakdown('ru', stats)).toBe('3 тире, 1 кавычка, 1 многоточие');
  });

  it('keeps declaration order as a tie-breaker when counts are equal', () => {
    const stats = statsWith({ dashes: 2, quotes: 2 });
    expect(formatToastBreakdown('ru', stats)).toBe('2 кавычки, 2 тире');
  });

  it('returns an empty string when nothing was replaced', () => {
    expect(formatToastBreakdown('ru', createEmptyStats())).toBe('');
  });

  it('pluralizes each group independently, including the new minus/arrows/bullets/symbols groups', () => {
    const stats = statsWith({ quotes: 5, invisibles: 2, minus: 1 });
    expect(formatToastBreakdown('ru', stats)).toBe('5 кавычек, 2 невидимых символа, 1 минус');
  });

  it('collapses groups beyond the top 3 into "и ещё N" (sum of the remaining counts)', () => {
    const stats = statsWith({ quotes: 5, dashes: 4, ellipsis: 3, spaces: 2, invisibles: 1 });
    expect(formatToastBreakdown('ru', stats)).toBe('5 кавычек, 4 тире, 3 многоточия, и ещё 3');
  });

  it('collapses the overflow in English as "and N more"', () => {
    const stats = statsWith({ quotes: 5, dashes: 4, ellipsis: 3, spaces: 2, invisibles: 1 });
    expect(formatToastBreakdown('en', stats)).toBe('5 quotes, 4 dashes, 3 ellipses, and 3 more');
  });

  it('formats English breakdown with singular/plural nouns, sorted by count', () => {
    const stats = statsWith({ quotes: 1, dashes: 2 });
    expect(formatToastBreakdown('en', stats)).toBe('2 dashes, 1 quote');
  });

  it('formats English breakdown for the new groups, collapsing overflow past 3', () => {
    const stats = statsWith({ minus: 1, arrows: 2, bullets: 3, symbols: 4 });
    expect(formatToastBreakdown('en', stats)).toBe('4 signs, 3 bullets, 2 arrows, and 1 more');
  });
});
