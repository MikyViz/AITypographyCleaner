import browser from 'webextension-polyfill';

export function localizeDocument(): void {
  const locale = browser.i18n.getUILanguage();
  document.documentElement.lang = locale;
  document.documentElement.dir = locale.toLowerCase().startsWith('he') ? 'rtl' : 'ltr';

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    element.textContent = browser.i18n.getMessage(element.dataset.i18n ?? '');
  });

  document
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]')
    .forEach((element) => {
      element.placeholder = browser.i18n.getMessage(element.dataset.i18nPlaceholder ?? '');
    });
}
