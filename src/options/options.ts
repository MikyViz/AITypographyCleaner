import browser from 'webextension-polyfill';
import type { Options } from '../core/normalize';
import {
  DEFAULT_WHITELIST,
  domainToOriginPattern,
  getSettings,
  saveSettings,
  sanitizeDomain,
} from '../shared/settings';
import { applyTheme, DEFAULT_THEME, type Theme } from '../shared/theme';

const checkboxIds = [
  'quotes',
  'dashes',
  'ellipsis',
  'spaces',
  'invisibles',
  'misc',
  'emojis',
  'collapseSpaces',
] as const;

const dashModeSelect = document.getElementById('dashMode') as HTMLSelectElement;
const themeSelect = document.getElementById('theme') as HTMLSelectElement;
const whitelistEl = document.getElementById('whitelist') as HTMLUListElement;
const newDomainInput = document.getElementById('new-domain') as HTMLInputElement;
const addDomainButton = document.getElementById('add-domain') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLParagraphElement;

let whitelist: string[] = [...DEFAULT_WHITELIST];
let theme: Theme = DEFAULT_THEME;

function checkbox(id: (typeof checkboxIds)[number]): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

function readOptionsFromForm(base: Options): Options {
  return {
    ...base,
    quotes: checkbox('quotes').checked,
    dashes: checkbox('dashes').checked,
    dashMode: dashModeSelect.value as Options['dashMode'],
    ellipsis: checkbox('ellipsis').checked,
    spaces: checkbox('spaces').checked,
    invisibles: checkbox('invisibles').checked,
    misc: checkbox('misc').checked,
    emojis: checkbox('emojis').checked,
    collapseSpaces: checkbox('collapseSpaces').checked,
  };
}

async function load(): Promise<void> {
  const settings = await getSettings();

  for (const id of checkboxIds) {
    checkbox(id).checked = settings.options[id];
    checkbox(id).addEventListener('change', onOptionsChange);
  }
  dashModeSelect.value = settings.options.dashMode;
  dashModeSelect.addEventListener('change', onOptionsChange);

  theme = settings.theme;
  themeSelect.value = theme;
  applyTheme(theme);
  themeSelect.addEventListener('change', onThemeChange);

  whitelist = [...settings.whitelist];
  renderWhitelist();
}

async function onOptionsChange(): Promise<void> {
  const settings = await getSettings();
  const options = readOptionsFromForm(settings.options);
  await saveSettings({ options, whitelist, theme });
  showStatus('Сохранено');
}

async function onThemeChange(): Promise<void> {
  theme = themeSelect.value as Theme;
  applyTheme(theme);
  const settings = await getSettings();
  await saveSettings({ options: settings.options, whitelist, theme });
  showStatus('Сохранено');
}

function renderWhitelist(): void {
  whitelistEl.innerHTML = '';
  for (const domain of whitelist) {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = domain;
    const removeButton = document.createElement('button');
    removeButton.textContent = '✕';
    removeButton.addEventListener('click', () => void removeDomain(domain));
    li.append(label, removeButton);
    whitelistEl.append(li);
  }
}

async function removeDomain(domain: string): Promise<void> {
  whitelist = whitelist.filter((d) => d !== domain);
  const settings = await getSettings();
  await saveSettings({ options: settings.options, whitelist, theme });
  renderWhitelist();
  showStatus('Сохранено');
}

addDomainButton.addEventListener('click', async () => {
  const domain = sanitizeDomain(newDomainInput.value);
  if (!domain) {
    showStatus('Некорректный домен', true);
    return;
  }
  if (whitelist.includes(domain)) {
    showStatus('Домен уже в списке', true);
    return;
  }

  const granted = await browser.permissions.request({ origins: [domainToOriginPattern(domain)] });
  if (!granted) {
    showStatus('Доступ не предоставлен', true);
    return;
  }

  whitelist = [...whitelist, domain];
  const settings = await getSettings();
  await saveSettings({ options: settings.options, whitelist, theme });
  newDomainInput.value = '';
  renderWhitelist();
  showStatus('Домен добавлен');
});

function showStatus(text: string, isError = false): void {
  statusEl.textContent = text;
  statusEl.classList.toggle('error', isError);
  setTimeout(() => {
    statusEl.textContent = '';
  }, 2000);
}

void load();

