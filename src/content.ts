import { normalize, type Options } from './core/normalize';
import type { ContentMessage } from './shared/messages';
import { getSettings, onSettingsChanged } from './shared/settings';

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
  let currentOptions: Options | null = null;

  void getSettings().then((settings) => {
    currentOptions = settings.options;
  });
  onSettingsChanged((settings) => {
    currentOptions = settings.options;
  });

  document.addEventListener('copy', handleCopy, true);
  chrome.runtime.onMessage.addListener(handleMessage);

  function handleCopy(event: ClipboardEvent): void {
    if (!currentOptions || !event.clipboardData) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

    const cleaned = cleanSelectionRange(selection.getRangeAt(0), currentOptions);
    if (!cleaned) return;

    event.clipboardData.setData('text/plain', cleaned.plain);
    event.clipboardData.setData('text/html', cleaned.html);
    event.preventDefault();
  }

  function handleMessage(
    message: ContentMessage,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
  ): boolean | void {
    if (message.type === 'ping') {
      sendResponse(true);
      return;
    }
    if (message.type === 'clean-selection') {
      void cleanSelectionToClipboard();
      return;
    }
    if (message.type === 'paste-cleaned') {
      void pasteCleanedFromClipboard();
    }
  }

  async function cleanSelectionToClipboard(): Promise<void> {
    const opts = currentOptions ?? (await getSettings()).options;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const cleaned = cleanSelectionRange(selection.getRangeAt(0), opts);
    if (!cleaned) return;
    await navigator.clipboard.writeText(cleaned.plain);
  }

  async function pasteCleanedFromClipboard(): Promise<void> {
    const opts = currentOptions ?? (await getSettings()).options;
    const text = await navigator.clipboard.readText();
    insertTextAtCursor(normalize(text, opts));
  }
}

function cleanSelectionRange(range: Range, opts: Options): { plain: string; html: string } | null {
  const fragment = range.cloneContents();
  const container = document.createElement('div');
  container.appendChild(fragment);
  cleanFragment(container, opts);
  return { plain: container.textContent ?? '', html: container.innerHTML };
}

/** Обходит текстовые ноды вне <pre>/<code> и прогоняет их через normalize(). */
function cleanFragment(root: HTMLElement, opts: Options): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }
  for (const textNode of textNodes) {
    if (isInsideCodeOrPre(textNode)) continue;
    textNode.textContent = normalize(textNode.textContent ?? '', opts);
  }
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
