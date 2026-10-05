import browser, { type Scripting } from 'webextension-polyfill';
import type { ContentMessage } from './shared/messages';
import { DEFAULT_WHITELIST, domainToOriginPattern, getSettings, onSettingsChanged } from './shared/settings';

const STATIC_DOMAINS = new Set(DEFAULT_WHITELIST);
const DYNAMIC_SCRIPT_ID = 'ai-typography-cleaner-dynamic';

const CLEAN_SELECTION_MENU_ID = 'ai-typography-cleaner-clean-selection';
const PASTE_CLEANED_MENU_ID = 'ai-typography-cleaner-paste-cleaned';

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: CLEAN_SELECTION_MENU_ID,
    title: browser.i18n.getMessage('contextCleanSelection'),
    contexts: ['selection'],
  });
  browser.contextMenus.create({
    id: PASTE_CLEANED_MENU_ID,
    title: browser.i18n.getMessage('contextPasteCleaned'),
    contexts: ['editable'],
  });
  void syncDynamicContentScripts();
});

browser.runtime.onStartup.addListener(() => {
  void syncDynamicContentScripts();
});

onSettingsChanged(() => void syncDynamicContentScripts());
browser.permissions.onAdded.addListener(() => void syncDynamicContentScripts());
browser.permissions.onRemoved.addListener(() => void syncDynamicContentScripts());

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return;
  if (info.menuItemId === CLEAN_SELECTION_MENU_ID) {
    void sendToTab(tab.id, { type: 'clean-selection' });
  } else if (info.menuItemId === PASTE_CLEANED_MENU_ID) {
    void sendToTab(tab.id, { type: 'paste-cleaned' });
  }
});

async function sendToTab(tabId: number, message: ContentMessage): Promise<void> {
  if (!(await ping(tabId))) {
    // activeTab даёт разовое разрешение на инъекцию даже вне whitelist-доменов.
    await browser.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
  }
  await browser.tabs.sendMessage(tabId, message);
}

async function ping(tabId: number): Promise<boolean> {
  try {
    await browser.tabs.sendMessage(tabId, { type: 'ping' } satisfies ContentMessage);
    return true;
  } catch {
    return false;
  }
}

/** Регистрирует content script для доменов whitelist поверх дефолтных трёх, но только там, где разрешение уже выдано. */
async function syncDynamicContentScripts(): Promise<void> {
  const { whitelist } = await getSettings();
  const customDomains = whitelist.filter((domain) => !STATIC_DOMAINS.has(domain));

  const granted = await browser.permissions.getAll();
  const grantedOrigins = new Set(granted.origins ?? []);
  const matches = customDomains
    .map(domainToOriginPattern)
    .filter((pattern) => grantedOrigins.has(pattern));

  const existing = await browser.scripting.getRegisteredContentScripts({ ids: [DYNAMIC_SCRIPT_ID] });

  if (matches.length === 0) {
    if (existing.length > 0) {
      await browser.scripting.unregisterContentScripts({ ids: [DYNAMIC_SCRIPT_ID] });
    }
    return;
  }

  const script: Scripting.RegisteredContentScript = {
    id: DYNAMIC_SCRIPT_ID,
    matches,
    js: ['content.js'],
    runAt: 'document_idle',
  };

  if (existing.length > 0) {
    await browser.scripting.updateContentScripts([script]);
  } else {
    await browser.scripting.registerContentScripts([script]);
  }
}
