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

/**
 * Чистая функция: превращает типографские спецсимволы ИИ-текста в обычные
 * клавиатурные аналоги. Не трогает содержимое URL и email-адресов.
 */
export function normalize(text: string, opts: Options = defaultOptions): string {
  const segments = splitProtectedSegments(text);

  const processed = segments
    .map((segment) => {
      if (segment.protected) return segment.value;

      let value = segment.value;
      if (opts.quotes) value = replaceQuotes(value);
      if (opts.dashes) value = replaceDashes(value, opts.dashMode);
      if (opts.ellipsis) value = replaceEllipsis(value);
      if (opts.spaces) value = replaceSpecialSpaces(value);
      if (opts.invisibles) value = removeInvisibles(value);
      if (opts.misc) value = replaceMisc(value);
      if (opts.emojis) value = removeEmojis(value);
      if (opts.collapseSpaces) value = collapseSpaces(value);
      return value;
    })
    .join('');

  return processed;
}
