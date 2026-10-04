/**
 * Чистые regex-правила и хелперы для normalize().
 * Ни одна функция здесь не имеет побочных эффектов.
 */

export type DashMode = ' - ' | '-' | ', ';

/** Кавычки-«ёлочки», немецкие „ “, английские “ ” и угловые « » → прямая ". */
const DOUBLE_QUOTES = /[\u201C\u201D\u201E\u00AB\u00BB]/g;
/** Одиночные ‘ ’ ‚ и одиночные угловые ‹ › → прямая '. */
const SINGLE_QUOTES = /[\u2018\u2019\u201A\u2039\u203A]/g;

export function replaceQuotes(text: string): string {
  return text.replace(DOUBLE_QUOTES, '"').replace(SINGLE_QUOTES, "'");
}

const DASH_RUN = /\s*[\u2013\u2014]\s*/g;

/**
 * Тире между цифрами (диапазоны вида 5–10) всегда схлопывается в голый "-".
 * Тире между словами заменяется на настраиваемый режим (" - " / "-" / ", ").
 */
export function replaceDashes(text: string, mode: DashMode): string {
  return text.replace(DASH_RUN, (match, offset: number) => {
    const before = text.slice(0, offset).match(/(\S)\s*$/)?.[1] ?? '';
    const after = text.slice(offset + match.length).match(/^\s*(\S)/)?.[1] ?? '';
    const isDigitRange = /\d/.test(before) && /\d/.test(after);
    return isDigitRange ? '-' : mode;
  });
}

export function replaceEllipsis(text: string): string {
  return text.replace(/\u2026/g, '...');
}

/** U+00A0, U+2002..U+200A, U+202F, U+205F, U+3000 → обычный пробел. */
const SPECIAL_SPACES = /[\u00A0\u2002-\u200A\u202F\u205F\u3000]/g;

export function replaceSpecialSpaces(text: string): string {
  return text.replace(SPECIAL_SPACES, ' ');
}

/**
 * Невидимые управляющие символы удаляются.
 * U+200D (ZWJ) и U+FE0F (variation selector-16) намеренно НЕ входят в набор —
 * они нужны для составных эмодзи-последовательностей и не трогаются никогда.
 */
const INVISIBLES = /[\u200B\u2060\uFEFF\u00AD\u200E\u200F]/g;

export function removeInvisibles(text: string): string {
  return text.replace(INVISIBLES, '');
}

/** × заменяется на x только когда вплотную примыкает к букве/цифре с обеих сторон (не в формулах с пробелами). */
const MULTIPLICATION_TIGHT = /(?<=[\p{L}\p{N}])\u00D7(?=[\p{L}\p{N}])/gu;

export function replaceMisc(text: string): string {
  return text
    .replace(/[\u2212\u2011]/g, '-') // минус (U+2212), неразрывный дефис (U+2011)
    .replace(/\u2022/g, '-') // буллет •
    .replace(/\u2192/g, '->') // →
    .replace(/\u2190/g, '<-') // ←
    .replace(MULTIPLICATION_TIGHT, 'x') // ×
    .replace(/\u2032/g, "'") // прайм ′
    .replace(/\u2033/g, '"'); // двойной прайм ″
}

/**
 * Эмодзи и их расширенные последовательности: базовый пиктограф (Extended_Pictographic,
 * покрывает эмодзи-блоки и часть символов вроде ©/®/™/★) с необязательными модификаторами
 * тона кожи, variation selector-16 и ZWJ-цепочками (составные эмодзи вроде 👨‍👩‍👧),
 * плюс флаги (пары regional indicator) и keycap-последовательности (digit/#/* + ⃣).
 */
const EMOJI =
  /\p{Extended_Pictographic}(?:[\u{1F3FB}-\u{1F3FF}]|\uFE0F|\u200D\p{Extended_Pictographic})*|[\u{1F1E6}-\u{1F1FF}]{2}|[0-9#*]\uFE0F?\u20E3/gu;

export function removeEmojis(text: string): string {
  return text.replace(EMOJI, '');
}

const LINE_SPLIT = /(\r\n|\n)/;

/**
 * Схлопывает повторяющиеся пробелы внутри строки, не трогая ведущие отступы
 * (пробелы/табы в начале строки) и переводы строк.
 */
export function collapseSpaces(text: string): string {
  return text
    .split(LINE_SPLIT)
    .map((part) => {
      if (part === '\n' || part === '\r\n') return part;
      const m = part.match(/^([ \t]*)([\s\S]*)$/);
      const indent = m?.[1] ?? '';
      const rest = m?.[2] ?? '';
      return indent + rest.replace(/ {2,}/g, ' ');
    })
    .join('');
}

/** URL и email — защищённые сегменты, которые правила не должны трогать. */
const PROTECTED_PATTERN =
  /(https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

export interface TextSegment {
  value: string;
  protected: boolean;
}

/** Разбивает текст на чередующиеся защищённые (URL/email) и обычные сегменты. */
export function splitProtectedSegments(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(PROTECTED_PATTERN)) {
    const idx = match.index ?? 0;
    if (idx > lastIndex) {
      segments.push({ value: text.slice(lastIndex, idx), protected: false });
    }
    segments.push({ value: match[0], protected: true });
    lastIndex = idx + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ value: text.slice(lastIndex), protected: false });
  }
  return segments;
}
