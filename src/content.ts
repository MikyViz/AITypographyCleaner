import browser from 'webextension-polyfill';
import { createEmptyStats, mergeStats, normalize, type Options, type Stats } from './core/normalize';
import { showCopyToast } from './content/toast';
import type { ContentMessage } from './shared/messages';
import { getSettings, onSettingsChanged, type StoredSettings } from './shared/settings';

declare global {
  interface Window {
    __aiTypographyCleanerInjected?: boolean;
  }
}

if (!window.__aiTypographyCleanerInjected) {
  window.__aiTypographyCleanerInjected = true;
  init();
}

function init(): void {
  let currentSettings: StoredSettings | null = null;

  void getSettings().then((settings) => {
    currentSettings = settings;
  });
  onSettingsChanged((settings) => {
    currentSettings = settings;
  });

  document.addEventListener('copy', handleCopy, true);
  browser.runtime.onMessage.addListener(handleMessage);

  function handleCopy(event: ClipboardEvent): void {
    if (!currentSettings || !event.clipboardData) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

    const cleaned = cleanSelectionRange(selection.getRangeAt(0), currentSettings.options);
    if (!cleaned) return;

    event.clipboardData.setData('text/plain', cleaned.plain);
    event.clipboardData.setData('text/html', cleaned.html);
    event.preventDefault();

    presentToast(cleaned.stats);
  }

  async function handleMessage(message: unknown): Promise<unknown> {
    const msg = message as ContentMessage;
    if (msg.type === 'ping') return true;
    if (msg.type === 'clean-selection') {
      await cleanSelectionToClipboard();
      return;
    }
    if (msg.type === 'paste-cleaned') {
      await pasteCleanedFromClipboard();
    }
  }

  async function cleanSelectionToClipboard(): Promise<void> {
    const opts = currentSettings?.options ?? (await getSettings()).options;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const cleaned = cleanSelectionRange(selection.getRangeAt(0), opts);
    if (!cleaned) return;
    await navigator.clipboard.writeText(cleaned.plain);
    presentToast(cleaned.stats);
  }

  async function pasteCleanedFromClipboard(): Promise<void> {
    const opts = currentSettings?.options ?? (await getSettings()).options;
    const text = await navigator.clipboard.readText();
    insertTextAtCursor(safeNormalizeText(text, opts).text);
  }

  /** Показывает тост с разбивкой; ошибка здесь никогда не должна мешать копированию. */
  function presentToast(stats: Stats): void {
    try {
      if (!currentSettings) return;
      showCopyToast(
        stats,
        { showToast: currentSettings.showToast, showBreakdown: currentSettings.showBreakdown },
        currentSettings.language,
      );
    } catch {
      // Тост необязателен — молча игнорируем любой сбой.
    }
  }
}

/** Обёртка над normalize(): если подсчёт/замена по какой-то причине упадёт, возвращает исходный текст без изменений. */
function safeNormalizeText(text: string, opts: Options): { text: string; stats: Stats } {
  try {
    return normalize(text, opts);
  } catch {
    return { text, stats: createEmptyStats() };
  }
}

function cleanSelectionRange(
  range: Range,
  opts: Options,
): { plain: string; html: string; stats: Stats } | null {
  const fragment = range.cloneContents();
  const container = document.createElement('div');
  container.appendChild(fragment);
  const stats = cleanFragment(container, opts);
  return { plain: container.textContent ?? '', html: container.innerHTML, stats };
}

/** Обходит текстовые ноды вне <pre>/<code>, прогоняет их через normalize() и суммирует статистику. */
function cleanFragment(root: HTMLElement, opts: Options): Stats {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }
  let stats = createEmptyStats();
  for (const textNode of textNodes) {
    if (isInsideCodeOrPre(textNode)) continue;
    const result = safeNormalizeText(textNode.textContent ?? '', opts);
    textNode.textContent = result.text;
    stats = mergeStats(stats, result.stats);
  }
  return stats;
}

function isInsideCodeOrPre(node: Node): boolean {
  let el = node.parentElement;
  while (el) {
    if (el.tagName === 'PRE' || el.tagName === 'CODE') return true;
    el = el.parentElement;
  }
  return false;
}

function insertTextAtCursor(text: string): void {
  const active = document.activeElement;
  if (active instanceof HTMLTextAreaElement || active instanceof HTMLInputElement) {
    const start = active.selectionStart ?? active.value.length;
    const end = active.selectionEnd ?? active.value.length;
    active.setRangeText(text, start, end, 'end');
    active.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  document.execCommand('insertText', false, text);
}
