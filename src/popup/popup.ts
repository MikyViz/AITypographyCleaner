import browser from 'webextension-polyfill';
import { normalize } from '../core/normalize';
import { getMessage, localizeDocument, resolveLanguage } from '../shared/i18n';
import { getSettings } from '../shared/settings';
import { applyTheme } from '../shared/theme';

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
  output.value = normalize(input.value, settings.options).text;
  copyButton.disabled = output.value.length === 0;
  status.textContent = '';
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(output.value);
  status.textContent = getMessage(activeLanguage, 'copiedStatus');
  setTimeout(() => {
    status.textContent = '';
  }, 1500);
});
