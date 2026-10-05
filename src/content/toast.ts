import type { Stats } from '../core/normalize';
import { resolveLanguage, type LanguageSetting } from '../shared/i18n';
import { formatToastBreakdown, formatToastTitle } from '../shared/toastMessages';

const HOST_ID = 'ai-typography-cleaner-toast-host';
const AUTO_HIDE_MS = 2500;
const TRANSITION_MS = 150;

const TOAST_CSS = `
  :host { all: initial; }
  .toast {
    box-sizing: border-box;
    max-width: 320px;
    padding: 10px 14px;
    border-radius: 10px;
    font: 13px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #1f1f1f;
    color: #f5f5f5;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transform: translateY(6px);
    transition: opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease;
    pointer-events: none;
  }
  .toast.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .toast-title {
    font-weight: 600;
  }
  .toast-breakdown {
    margin-top: 2px;
    font-size: 11px;
    opacity: 0.75;
  }
  .toast-breakdown:empty {
    display: none;
  }
  @media (prefers-color-scheme: light) {
    .toast {
      background: #ffffff;
      color: #1a1a1a;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .toast {
      transition: none;
    }
  }
`;

interface ToastRefs {
  box: HTMLDivElement;
  title: HTMLDivElement;
  breakdown: HTMLDivElement;
}

let refs: ToastRefs | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

/** Создаёт хост-элемент с closed Shadow DOM лениво, один раз на страницу. */
function ensureToast(): ToastRefs {
  if (refs) return refs;

  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.all = 'initial';
  host.style.position = 'fixed';
  host.style.inset = 'auto 16px 16px auto';
  host.style.zIndex = '2147483647';
  host.style.pointerEvents = 'none';

  const shadow = host.attachShadow({ mode: 'closed' });

  const style = document.createElement('style');
  style.textContent = TOAST_CSS;
  shadow.appendChild(style);

  const box = document.createElement('div');
  box.className = 'toast';
  box.setAttribute('role', 'status');
  box.setAttribute('aria-live', 'polite');

  const title = document.createElement('div');
  title.className = 'toast-title';

  const breakdown = document.createElement('div');
  breakdown.className = 'toast-breakdown';

  box.append(title, breakdown);
  shadow.appendChild(box);

  (document.documentElement ?? document.body).appendChild(host);

  refs = { box, title, breakdown };
  return refs;
}

export interface ToastSettings {
  showToast: boolean;
  showBreakdown: boolean;
}

/**
 * Показывает/обновляет тост с количеством замен. Если тост уже виден — не создаёт
 * второй, а обновляет текст и перезапускает таймер автоскрытия. Копирование не должно
 * ломаться из-за тоста, поэтому любая ошибка здесь проглатывается.
 */
export function showCopyToast(stats: Stats, settings: ToastSettings, language: LanguageSetting): void {
  try {
    if (!settings.showToast || stats.total <= 0) return;

    const activeLanguage = resolveLanguage(language);
    const { box, title, breakdown } = ensureToast();

    title.textContent = formatToastTitle(activeLanguage, stats.total);
    breakdown.textContent = settings.showBreakdown ? formatToastBreakdown(activeLanguage, stats) : '';

    box.classList.add('visible');

    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      box.classList.remove('visible');
      hideTimer = null;
    }, AUTO_HIDE_MS);
  } catch {
    // Тост второстепенен: сбой здесь никогда не должен влиять на копирование.
  }
}
