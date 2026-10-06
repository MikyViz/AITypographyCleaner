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

  it('replaces multiplication sign with x only between two digits or two letters', () => {
    expect(normalize('1920\u00D71080', opts())).toBe('1920x1080');
    expect(normalize('Width\u00D7Height', opts())).toBe('WidthxHeight');
    expect(normalize('2 \u00D7 2', opts())).toBe('2 \u00D7 2');
  });

  it('does not replace multiplication sign between a digit and a letter (mixed, breaks formulas)', () => {
    expect(normalize('5\u00D7x', opts())).toBe('5\u00D7x');
  });

  it('replaces prime and double prime with straight quotes', () => {
    expect(normalize('5\u2032', opts())).toBe("5'");
    expect(normalize('5\u2033', opts())).toBe('5"');
  });

  it('can be disabled', () => {
    expect(normalize('\u2022 item', opts({ misc: false }))).toBe('\u2022 item');
  });

  it('replaces a minus sign in a formula and touches nothing else (byGroup.minus only)', () => {
    const result = normalizeWithStats('Residual = Actual \u2212 Predicted', opts());
    expect(result.text).toBe('Residual = Actual - Predicted');
    expect(result.stats.total).toBe(1);
    expect(result.stats.byGroup.minus).toBe(1);
    expect(result.stats.byGroup.arrows).toBe(0);
    expect(result.stats.byGroup.bullets).toBe(0);
    expect(result.stats.byGroup.symbols).toBe(0);
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

describe('emoji statistics (regression: multi-codepoint sequences must count as one symbol)', () => {
  it('counts a simple single-codepoint emoji as 1', () => {
    expect(normalizeWithStats('Hello 😀', opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts an emoji with a skin-tone modifier as 1, not 2', () => {
    expect(normalizeWithStats('👍🏽', opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts a ZWJ sequence (e.g. singer 🧑\u200D🎤, 3 code points) as 1, not 3', () => {
    const singer = '\u{1F9D1}\u200D\u{1F3A4}';
    expect(normalizeWithStats(singer, opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts a multi-person ZWJ family sequence (4 pictographs + 3 ZWJ) as 1, not 7', () => {
    const family = '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}';
    expect(normalizeWithStats(family, opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts a flag sequence (2 regional indicators) as 1, not 2', () => {
    expect(normalizeWithStats('\u{1F1FA}\u{1F1F8}', opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts a keycap sequence (digit + variation selector + combining enclosing keycap) as 1, not 3', () => {
    expect(normalizeWithStats('3\uFE0F\u20E3', opts({ emojis: true })).stats.byGroup.symbols).toBe(1);
  });

  it('counts 5 mixed emoji (including one ZWJ sequence) as exactly 5, matching the toast counter', () => {
    const text = '\u{1F923}\u{1F921}\u{1F920}\u{1F977}\u{1F9D1}\u200D\u{1F3A4}';
    const stats = normalizeWithStats(text, opts({ emojis: true })).stats;
    expect(stats.byGroup.symbols).toBe(5);
    expect(stats.total).toBe(5);
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
      byGroup: {
        quotes: 3, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0,
        minus: 0, arrows: 0, bullets: 0, symbols: 0,
      },
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

  it('counts minus sign and non-breaking hyphen in the minus group', () => {
    expect(normalizeWithStats('5\u22123 co\u2011author', opts()).stats.byGroup.minus).toBe(2);
  });

  it('counts → and ← in the arrows group', () => {
    expect(normalizeWithStats('a\u2192b\u2190c', opts()).stats.byGroup.arrows).toBe(2);
  });

  it('counts • in the bullets group', () => {
    expect(normalizeWithStats('\u2022 one\n\u2022 two', opts()).stats.byGroup.bullets).toBe(2);
  });

  it('counts ×/primes in the symbols group', () => {
    expect(normalizeWithStats('1920\u00D71080 5\u2032 5\u2033', opts()).stats.byGroup.symbols).toBe(3);
  });

  it('counts mixed replacements across groups', () => {
    const result = normalizeWithStats('\u201CHi\u201D\u2014wait\u2026\u00A0\u200B\u2022', opts());
    expect(result).toEqual({
      text: '"Hi" - wait... -',
      stats: {
        total: 7,
        byGroup: {
          quotes: 2, dashes: 1, ellipsis: 1, spaces: 1, invisibles: 1,
          minus: 0, arrows: 0, bullets: 1, symbols: 0,
        },
      },
    });
  });

  it('total always equals the sum of byGroup counters on mixed text', () => {
    const result = normalizeWithStats(
      '\u201CHi\u201D\u2014wait\u2026\u00A0\u200B\u2022\u2192\u2212co\u2011op 1920\u00D71080',
      opts(),
    );
    const sum = Object.values(result.stats.byGroup).reduce((total, n) => total + n, 0);
    expect(result.stats.total).toBe(sum);
    expect(result.stats.total).toBeGreaterThan(0);
  });

  it('replaces a minus sign in a formula and touches nothing else', () => {
    const result = normalizeWithStats('Residual = Actual \u2212 Predicted', opts());
    expect(result.stats.total).toBe(1);
    expect(result.stats.byGroup).toEqual({
      quotes: 0, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0,
      minus: 1, arrows: 0, bullets: 0, symbols: 0,
    });
  });

  it('returns zero statistics when no rule replaces anything', () => {
    expect(normalizeWithStats('plain text', opts()).stats).toEqual({
      total: 0,
      byGroup: {
        quotes: 0, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0,
        minus: 0, arrows: 0, bullets: 0, symbols: 0,
      },
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
    expect(Object.values(result.stats.byGroup)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('counts collapsed extra spaces in the spaces group', () => {
    expect(normalizeWithStats('a   b', opts()).stats.byGroup.spaces).toBe(2);
  });
});

describe('createEmptyStats / mergeStats', () => {
  it('createEmptyStats returns all-zero counters', () => {
    expect(createEmptyStats()).toEqual({
      total: 0,
      byGroup: {
        quotes: 0, dashes: 0, ellipsis: 0, spaces: 0, invisibles: 0,
        minus: 0, arrows: 0, bullets: 0, symbols: 0,
      },
    });
  });

  it('mergeStats sums totals and every group (used to aggregate across text nodes)', () => {
    const a = normalizeWithStats('\u201Chi\u201D', opts()).stats;
    const b = normalizeWithStats('wait\u2026', opts()).stats;
    expect(mergeStats(a, b)).toEqual({
      total: 3,
      byGroup: {
        quotes: 2, dashes: 0, ellipsis: 1, spaces: 0, invisibles: 0,
        minus: 0, arrows: 0, bullets: 0, symbols: 0,
      },
    });
  });

  it('mergeStats with an empty stats object returns the other operand unchanged', () => {
    const a = normalizeWithStats('\u201Chi\u201D it\u2019s', opts()).stats;
    expect(mergeStats(a, createEmptyStats())).toEqual(a);
  });
});
