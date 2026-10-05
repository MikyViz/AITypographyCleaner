import {
  type DashMode,
  collapseSpaces,
  removeEmojis,
  removeInvisibles,
  replaceDashes,
  replaceEllipsis,
  replaceMisc,
  replaceQuotes,
  replaceSpecialSpaces,
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
    other: number;
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
      other: 0,
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
      other: a.byGroup.other + b.byGroup.other,
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
      if (opts.misc) value = replaceMisc(value, count('other'));
      if (opts.emojis) value = removeEmojis(value, count('other'));
      if (opts.collapseSpaces) value = collapseSpaces(value, count('other'));
      return value;
    })
    .join('');

  return { text: processed, stats };
}
