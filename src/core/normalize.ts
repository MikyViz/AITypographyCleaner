import {
  type DashMode,
  collapseSpaces,
  removeEmojis,
  removeInvisibles,
  replaceArrows,
  replaceBullets,
  replaceDashes,
  replaceEllipsis,
  replaceMinus,
  replaceQuotes,
  replaceSpecialSpaces,
  replaceSymbols,
  splitProtectedSegments,
} from './rules';

export interface Options {
  quotes: boolean;
  dashes: boolean;
  dashMode: DashMode;
  ellipsis: boolean;
  spaces: boolean;
  invisibles: boolean;
  misc: boolean;
  emojis: boolean;
  collapseSpaces: boolean;
}

export interface Stats {
  total: number;
  byGroup: {
    quotes: number;
    dashes: number;
    ellipsis: number;
    spaces: number;
    invisibles: number;
    minus: number;
    arrows: number;
    bullets: number;
    symbols: number;
  };
}

export const defaultOptions: Options = {
  quotes: true,
  dashes: true,
  dashMode: ' - ',
  ellipsis: true,
  spaces: true,
  invisibles: true,
  misc: true,
  emojis: false,
  collapseSpaces: true,
};

export function createEmptyStats(): Stats {
  return {
    total: 0,
    byGroup: {
      quotes: 0,
      dashes: 0,
      ellipsis: 0,
      spaces: 0,
      invisibles: 0,
      minus: 0,
      arrows: 0,
      bullets: 0,
      symbols: 0,
    },
  };
}

/** Суммирует статистику нескольких normalize()-вызовов (например, по текстовым узлам одного выделения). */
export function mergeStats(a: Stats, b: Stats): Stats {
  return {
    total: a.total + b.total,
    byGroup: {
      quotes: a.byGroup.quotes + b.byGroup.quotes,
      dashes: a.byGroup.dashes + b.byGroup.dashes,
      ellipsis: a.byGroup.ellipsis + b.byGroup.ellipsis,
      spaces: a.byGroup.spaces + b.byGroup.spaces,
      invisibles: a.byGroup.invisibles + b.byGroup.invisibles,
      minus: a.byGroup.minus + b.byGroup.minus,
      arrows: a.byGroup.arrows + b.byGroup.arrows,
      bullets: a.byGroup.bullets + b.byGroup.bullets,
      symbols: a.byGroup.symbols + b.byGroup.symbols,
    },
  };
}

/**
 * Чистая функция: превращает типографские спецсимволы ИИ-текста в обычные
 * клавиатурные аналоги. Не трогает содержимое URL и email-адресов.
 */
export function normalize(text: string, opts: Options = defaultOptions): { text: string; stats: Stats } {
  const stats = createEmptyStats();
  const count = (group: keyof Stats['byGroup']) => (removed: string): void => {
    for (const _character of removed) {
      stats.byGroup[group] += 1;
      stats.total += 1;
    }
  };

  const segments = splitProtectedSegments(text);

  const processed = segments
    .map((segment) => {
      if (segment.protected) return segment.value;

      let value = segment.value;
      if (opts.quotes) value = replaceQuotes(value, count('quotes'));
      if (opts.dashes) value = replaceDashes(value, opts.dashMode, count('dashes'));
      if (opts.ellipsis) value = replaceEllipsis(value, count('ellipsis'));
      if (opts.spaces) value = replaceSpecialSpaces(value, count('spaces'));
      if (opts.invisibles) value = removeInvisibles(value, count('invisibles'));
      if (opts.misc) {
        value = replaceMinus(value, count('minus'));
        value = replaceArrows(value, count('arrows'));
        value = replaceBullets(value, count('bullets'));
        value = replaceSymbols(value, count('symbols'));
      }
      // Эмодзи — мелкие символы вне алфавита, относим к той же группе "symbols", что и ×/прайм.
      if (opts.emojis) value = removeEmojis(value, count('symbols'));
      // Схлопнутые лишние пробелы — про пробелы, относим к группе "spaces".
      if (opts.collapseSpaces) value = collapseSpaces(value, count('spaces'));
      return value;
    })
    .join('');

  return { text: processed, stats };
}
