import { describe, expect, it } from 'vitest';
import { defaultOptions, normalize, type Options } from '../src/core/normalize';

const opts = (overrides: Partial<Options> = {}): Options => ({ ...defaultOptions, ...overrides });

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
