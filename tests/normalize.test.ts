import { describe, expect, it } from 'vitest';
import {
  createEmptyStats,
  defaultOptions,
  mergeStats,
  normalize as normalizeWithStats,
  type Options,
} from '../src/core/normalize';

const opts = (overrides: Partial<Options> = {}): Options => ({ ...defaultOptions, ...overrides });
const normalize = (text: string, options?: Options): string => normalizeWithStats(text, options).text;

describe('quotes', () => {
  it('replaces curly double quotes and guillemets with "', () => {
    expect(normalize('\u201Chello\u201D', opts())).toBe('"hello"');
    expect(normalize('\u00ABhello\u00BB', opts())).toBe('"hello"');
    expect(normalize('\u201Ehello\u201C', opts())).toBe('"hello"');
  });

  it('replaces curly single quotes and single guillemets with \'', () => {
    expect(normalize('\u2018hello\u2019', opts())).toBe("'hello'");
    expect(normalize('\u2039hello\u203A', opts())).toBe("'hello'");
    expect(normalize('it\u2019s', opts())).toBe("it's");
  });

  it('can be disabled', () => {
    expect(normalize('\u201Chello\u201D', opts({ quotes: false }))).toBe('\u201Chello\u201D');
  });
});

describe('dashes', () => {
  it('replaces em/en dash between words with the configured mode (default " - ")', () => {
    expect(normalize('foo\u2014bar', opts())).toBe('foo - bar');
    expect(normalize('foo \u2013 bar', opts())).toBe('foo - bar');
  });

  it('collapses dash between digits with no surrounding spaces (ranges)', () => {
    expect(normalize('5\u201310', opts())).toBe('5-10');
    expect(normalize('2020\u20142023', opts())).toBe('2020-2023');
  });

  it('supports alternate dash modes', () => {
    expect(normalize('foo\u2014bar', opts({ dashMode: '-' }))).toBe('foo-bar');
    expect(normalize('foo\u2014bar', opts({ dashMode: ', ' }))).toBe('foo, bar');
  });

  it('can be disabled', () => {
    expect(normalize('foo\u2014bar', opts({ dashes: false }))).toBe('foo\u2014bar');
  });
});

describe('ellipsis', () => {
  it('replaces horizontal ellipsis with three dots', () => {
    expect(normalize('wait\u2026', opts())).toBe('wait...');
  });

  it('can be disabled', () => {
    expect(normalize('wait\u2026', opts({ ellipsis: false }))).toBe('wait\u2026');
  });
});

describe('special spaces', () => {
  it('replaces non-breaking and other special spaces with a normal space', () => {
    expect(normalize('a\u00A0b', opts())).toBe('a b');
    expect(normalize('a\u2007b', opts())).toBe('a b');
    expect(normalize('a\u2009b', opts())).toBe('a b');
    expect(normalize('a\u202Fb', opts())).toBe('a b');
    expect(normalize('a\u3000b', opts())).toBe('a b');
  });

  it('can be disabled', () => {
    expect(normalize('a\u00A0b', opts({ spaces: false }))).toBe('a\u00A0b');
  });
});

describe('invisibles', () => {
  it('removes zero-width and bidi control characters', () => {
    expect(normalize('a\u200Bb', opts())).toBe('ab');
    expect(normalize('a\u2060b', opts())).toBe('ab');
    expect(normalize('\uFEFFhello', opts())).toBe('hello');
    expect(normalize('a\u00ADb', opts())).toBe('ab');
    expect(normalize('a\u200Eb\u200Fc', opts())).toBe('abc');
  });

  it('never removes ZWJ or variation selector-16 used in emoji sequences', () => {
    const familyEmoji = '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}';
    expect(normalize(familyEmoji, opts())).toBe(familyEmoji);

    const keycap = '\u0023\uFE0F\u20E3';
    expect(normalize(keycap, opts())).toBe(keycap);
  });

  it('can be disabled', () => {
    expect(normalize('a\u200Bb', opts({ invisibles: false }))).toBe('a\u200Bb');
  });
});

describe('misc', () => {
  it('replaces minus sign and non-breaking hyphen with -', () => {
    expect(normalize('5\u22123', opts())).toBe('5-3');
    expect(normalize('co\u2011author', opts())).toBe('co-author');
  });

  it('replaces bullet with -', () => {
    expect(normalize('\u2022 item', opts())).toBe('- item');
  });

  it('replaces arrows with -> and <-', () => {
    expect(normalize('a\u2192b', opts())).toBe('a->b');
    expect(normalize('a\u2190b', opts())).toBe('a<-b');
  });

  it('replaces multiplication sign with x only when tight between letters/digits', () => {
    expect(normalize('1920\u00D71080', opts())).toBe('1920x1080');
    expect(normalize('2 \u00D7 2', opts())).toBe('2 \u00D7 2');
  });

  it('replaces prime and double prime with straight quotes', () => {
    expect(normalize('5\u2032', opts())).toBe("5'");
    expect(normalize('5\u2033', opts())).toBe('5"');
  });

  it('can be disabled', () => {
    expect(normalize('\u2022 item', opts({ misc: false }))).toBe('\u2022 item');
  });
});

describe('emojis', () => {
  it('is disabled by default', () => {
    expect(normalize('Hello 😀 world', opts())).toBe('Hello 😀 world');
  });

  it('removes simple emoji when enabled', () => {
    expect(normalize('Hello 😀 world', opts({ emojis: true }))).toBe('Hello world');
  });

  it('removes emoji with skin tone modifiers', () => {
    expect(normalize('Thumbs up 👍🏽 nice', opts({ emojis: true }))).toBe('Thumbs up nice');
  });

  it('removes ZWJ emoji sequences (family, professions) as a whole', () => {
    const family = '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}';
    expect(normalize(`Family ${family} photo`, opts({ emojis: true }))).toBe('Family photo');
  });

  it('removes flag sequences (regional indicator pairs)', () => {
    expect(normalize('Flag \u{1F1FA}\u{1F1F8} day', opts({ emojis: true }))).toBe('Flag day');
  });

  it('removes keycap sequences', () => {
    expect(normalize('Count 3\uFE0F\u20E3 two', opts({ emojis: true }))).toBe('Count two');
  });

  it('can be disabled explicitly', () => {
    expect(normalize('Hello 😀', opts({ emojis: false }))).toBe('Hello 😀');
  });
});

describe('collapseSpaces', () => {
  it('collapses doubled spaces created by replacements', () => {
    expect(normalize('foo\u00A0 bar', opts())).toBe('foo bar');
  });

  it('preserves leading indentation and newlines', () => {
    const input = '  indented   line\nsecond   line';
    expect(normalize(input, opts())).toBe('  indented line\nsecond line');
  });

  it('can be disabled', () => {
    expect(normalize('a  b', opts({ collapseSpaces: false }))).toBe('a  b');
  });
});

describe('untouched content', () => {
  it('leaves Hebrew punctuation and niqqud untouched', () => {
    const hebrew = '\u05D0\u05B4\u05DD \u05D2\u05F4\u05E6 \u05D2\u05F3 \u05DE\u05BE\u05D0';
    expect(normalize(hebrew, opts())).toBe(hebrew);
  });

  it('does not alter content inside URLs', () => {
    const input = 'see https://example.com/a\u2013b?x=1\u20142 for details';
    expect(normalize(input, opts())).toBe('see https://example.com/a\u2013b?x=1\u20142 for details');
  });

  it('does not alter email addresses', () => {
    const input = 'contact me\u2014write to john\u2019s.name@example.com please';
    expect(normalize(input, opts())).toBe("contact me - write to john's.name@example.com please");
  });
});

describe('normalize with all rules combined', () => {
  it('produces plain keyboard-typed text from a typical AI response', () => {
    const input =
      '\u201CHello\u201D \u2014 this costs 5\u201310 dollars\u2026 It\u2019s great \u2014 really\u00A0great.';
    const expected =
      '"Hello" - this costs 5-10 dollars... It\'s great - really great.';
    expect(normalize(input, opts())).toBe(expected);
  });
});

describe('normalization statistics', () => {
  it('counts every replaced quote', () => {
    expect(normalizeWithStats('\u201Chello\u201D it\u2019s', opts()).stats).toEqual({
      total: 3,
      byGroup: { quotes: 3, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0, other: 0 },
    });
  });

  it('counts dash characters but not surrounding whitespace', () => {
    expect(normalizeWithStats('a\u2014b 5\u201310', opts()).stats.byGroup.dashes).toBe(2);
  });

  it('counts each ellipsis character, not the output dots', () => {
    expect(normalizeWithStats('\u2026\u2026', opts()).stats.byGroup.ellipsis).toBe(2);
  });

  it('counts each special space', () => {
    expect(normalizeWithStats('a\u00A0b\u2009c', opts()).stats.byGroup.spaces).toBe(2);
  });

  it('counts each removed invisible character', () => {
    expect(normalizeWithStats('a\u200Bb\u2060c', opts()).stats.byGroup.invisibles).toBe(2);
  });

  it('counts replacements from other rules', () => {
    expect(normalizeWithStats('\u2022 \u2192 1920\u00D71080', opts()).stats.byGroup.other).toBe(3);
  });

  it('counts mixed replacements across groups', () => {
    const result = normalizeWithStats('\u201CHi\u201D\u2014wait\u2026\u00A0\u200B\u2022', opts());
    expect(result).toEqual({
      text: '"Hi" - wait... -',
      stats: {
        total: 7,
        byGroup: { quotes: 2, dashes: 1, ellipsis: 1, spaces: 1, invisibles: 1, other: 1 },
      },
    });
  });

  it('returns zero statistics when no rule replaces anything', () => {
    expect(normalizeWithStats('plain text', opts()).stats).toEqual({
      total: 0,
      byGroup: { quotes: 0, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0, other: 0 },
    });
  });

  it('does not count disabled groups', () => {
    const result = normalizeWithStats('\u201C\u2014\u2026\u00A0\u200B\u2022', opts({
      quotes: false,
      dashes: false,
      ellipsis: false,
      spaces: false,
      invisibles: false,
      misc: false,
    }));
    expect(result.text).toBe('\u201C\u2014\u2026\u00A0\u200B\u2022');
    expect(result.stats.total).toBe(0);
    expect(Object.values(result.stats.byGroup)).toEqual([0, 0, 0, 0, 0, 0]);
  });

  it('counts collapsed spaces as other changes', () => {
    expect(normalizeWithStats('a   b', opts()).stats.byGroup.other).toBe(2);
  });
});

describe('createEmptyStats / mergeStats', () => {
  it('createEmptyStats returns all-zero counters', () => {
    expect(createEmptyStats()).toEqual({
      total: 0,
      byGroup: { quotes: 0, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0, other: 0 },
    });
  });

  it('mergeStats sums totals and every group (used to aggregate across text nodes)', () => {
    const a = normalizeWithStats('\u201Chi\u201D', opts()).stats;
    const b = normalizeWithStats('wait\u2026', opts()).stats;
    expect(mergeStats(a, b)).toEqual({
      total: 3,
      byGroup: { quotes: 2, dashes: 0, ellipsis: 1, spaces: 0, invisibles: 0, other: 0 },
    });
  });

  it('mergeStats with an empty stats object returns the other operand unchanged', () => {
    const a = normalizeWithStats('\u201Chi\u201D it\u2019s', opts()).stats;
    expect(mergeStats(a, createEmptyStats())).toEqual(a);
  });
});
