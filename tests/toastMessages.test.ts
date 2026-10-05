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
    expect(formatToastTitle('ru', 1)).toBe('Скопировано очищенным: заменено 1 символ');
    expect(formatToastTitle('ru', 2)).toBe('Скопировано очищенным: заменено 2 символа');
    expect(formatToastTitle('ru', 5)).toBe('Скопировано очищенным: заменено 5 символов');
    expect(formatToastTitle('ru', 21)).toBe('Скопировано очищенным: заменено 21 символ');
  });

  it('uses English singular/plural for the character count', () => {
    expect(formatToastTitle('en', 1)).toBe('Copied cleaned: replaced 1 character');
    expect(formatToastTitle('en', 8)).toBe('Copied cleaned: replaced 8 characters');
  });

  it('falls back to English for unsupported toast keys in other locales', () => {
    expect(formatToastTitle('fr', 1)).toBe('Copied cleaned: replaced 1 character');
  });
});

describe('formatToastBreakdown', () => {
  it('lists only non-zero groups in a fixed order', () => {
    const stats = statsWith({ quotes: 2, dashes: 1, ellipsis: 1, spaces: 1 });
    expect(formatToastBreakdown('ru', stats)).toBe('2 кавычки, 1 тире, 1 многоточие, 1 спецпробел');
  });

  it('returns an empty string when nothing was replaced', () => {
    expect(formatToastBreakdown('ru', createEmptyStats())).toBe('');
  });

  it('pluralizes each group independently', () => {
    const stats = statsWith({ quotes: 5, invisibles: 2, other: 1 });
    expect(formatToastBreakdown('ru', stats)).toBe(
      '5 кавычек, 2 невидимых символа, 1 прочий символ',
    );
  });

  it('formats English breakdown with singular/plural nouns', () => {
    const stats = statsWith({ quotes: 1, dashes: 2 });
    expect(formatToastBreakdown('en', stats)).toBe('1 quote, 2 dashes');
  });
});
