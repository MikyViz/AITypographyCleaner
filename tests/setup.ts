// webextension-polyfill throws immediately on import unless `chrome.runtime.id`
// looks like a real extension context. Stub the minimum needed so modules that
// depend on it (shared/i18n.ts, shared/settings.ts, etc.) can be unit-tested
// in Node without pulling in a full browser/extension environment.
(globalThis as { chrome?: unknown }).chrome ??= {
  runtime: { id: 'test-extension-id' },
};
