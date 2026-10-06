import browser from 'webextension-polyfill';
import { normalize, type Stats } from '../core/normalize';
import { getMessage, localizeDocument, resolveLanguage } from '../shared/i18n';
import { getSettings } from '../shared/settings';
import { applyTheme } from '../shared/theme';
import { formatToastBreakdown, formatToastTitle } from '../shared/toastMessages';

// Локализуем сразу по языку браузера; если пользователь выбрал язык вручную,
// настройки подгрузятся асинхронно и перелокализуют страницу.
let activeLanguage = resolveLanguage('auto');
localizeDocument(activeLanguage);

const input = document.getElementById('input') as HTMLTextAreaElement;
const output = document.getElementById('output') as HTMLTextAreaElement;
const cleanButton = document.getElementById('clean') as HTMLButtonElement;
const copyButton = document.getElementById('copy') as HTMLButtonElement;
const status = document.getElementById('status') as HTMLParagraphElement;
const openOptions = document.getElementById('open-options') as HTMLAnchorElement;
const counter = document.getElementById('counter') as HTMLDivElement;
const counterTitle = document.getElementById('counter-title') as HTMLParagraphElement;
const counterBreakdown = document.getElementById('counter-breakdown') as HTMLParagraphElement;

void getSettings().then((settings) => {
  applyTheme(settings.theme);
  activeLanguage = resolveLanguage(settings.language);
  localizeDocument(activeLanguage);
});

openOptions.addEventListener('click', (event) => {
  event.preventDefault();
  void browser.runtime.openOptionsPage();
});

cleanButton.addEventListener('click', async () => {
  const settings = await getSettings();
  const result = normalize(input.value, settings.options);
  output.value = result.text;
  copyButton.disabled = output.value.length === 0;
  status.textContent = '';
  updateCounter(result.stats, settings.showBreakdown);
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(output.value);
  status.textContent = getMessage(activeLanguage, 'copiedStatus');
  setTimeout(() => {
    status.textContent = '';
  }, 1500);
});

/** Показывает "Очищено: N символов" (+ разбивку по группам) под результатом; прячет блок, если замен не было. */
function updateCounter(stats: Stats, showBreakdown: boolean): void {
  try {
    if (stats.total <= 0) {
      counter.hidden = true;
      counterTitle.textContent = '';
      counterBreakdown.textContent = '';
      return;
    }
    counterTitle.textContent = formatToastTitle(activeLanguage, stats.total);
    counterBreakdown.textContent = showBreakdown ? formatToastBreakdown(activeLanguage, stats) : '';
    counter.hidden = false;
  } catch {
    // Счётчик второстепенен: сбой здесь не должен мешать очистке/копированию в попапе.
    counter.hidden = true;
  }
}
