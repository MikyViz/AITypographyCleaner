"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/webextension-polyfill/dist/browser-polyfill.js
  var require_browser_polyfill = __commonJS({
    "node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports, module) {
      (function(global, factory) {
        if (typeof define === "function" && define.amd) {
          define("webextension-polyfill", ["module"], factory);
        } else if (typeof exports !== "undefined") {
          factory(module);
        } else {
          var mod = {
            exports: {}
          };
          factory(mod);
          global.browser = mod.exports;
        }
      })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module2) {
        "use strict";
        if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
          throw new Error("This script should only be loaded in a browser extension.");
        }
        if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
          const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
          const wrapAPIs = (extensionAPIs) => {
            const apiMetadata = {
              "alarms": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "clearAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "bookmarks": {
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getChildren": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getRecent": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getSubTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTree": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeTree": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "browserAction": {
                "disable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "enable": {
                  "minArgs": 0,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "getBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "openPopup": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setBadgeBackgroundColor": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setBadgeText": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "browsingData": {
                "remove": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "removeCache": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCookies": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeDownloads": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFormData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeHistory": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeLocalStorage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePasswords": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removePluginData": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "settings": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "commands": {
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "contextMenus": {
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "cookies": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAllCookieStores": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "devtools": {
                "inspectedWindow": {
                  "eval": {
                    "minArgs": 1,
                    "maxArgs": 2,
                    "singleCallbackArg": false
                  }
                },
                "panels": {
                  "create": {
                    "minArgs": 3,
                    "maxArgs": 3,
                    "singleCallbackArg": true
                  },
                  "elements": {
                    "createSidebarPane": {
                      "minArgs": 1,
                      "maxArgs": 1
                    }
                  }
                }
              },
              "downloads": {
                "cancel": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "download": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "erase": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFileIcon": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "open": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "pause": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeFile": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "resume": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "extension": {
                "isAllowedFileSchemeAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "isAllowedIncognitoAccess": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "history": {
                "addUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "deleteRange": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "deleteUrl": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getVisits": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "search": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "i18n": {
                "detectLanguage": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAcceptLanguages": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "identity": {
                "launchWebAuthFlow": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "idle": {
                "queryState": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "management": {
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getSelf": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "setEnabled": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "uninstallSelf": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "notifications": {
                "clear": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPermissionLevel": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              },
              "pageAction": {
                "getPopup": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getTitle": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "hide": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setIcon": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "setPopup": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "setTitle": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                },
                "show": {
                  "minArgs": 1,
                  "maxArgs": 1,
                  "fallbackToNoCallback": true
                }
              },
              "permissions": {
                "contains": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "request": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "runtime": {
                "getBackgroundPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getPlatformInfo": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "openOptionsPage": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "requestUpdateCheck": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "sendMessage": {
                  "minArgs": 1,
                  "maxArgs": 3
                },
                "sendNativeMessage": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "setUninstallURL": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "sessions": {
                "getDevices": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getRecentlyClosed": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "restore": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "storage": {
                "local": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                },
                "managed": {
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  }
                },
                "sync": {
                  "clear": {
                    "minArgs": 0,
                    "maxArgs": 0
                  },
                  "get": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "getBytesInUse": {
                    "minArgs": 0,
                    "maxArgs": 1
                  },
                  "remove": {
                    "minArgs": 1,
                    "maxArgs": 1
                  },
                  "set": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              },
              "tabs": {
                "captureVisibleTab": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "create": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "detectLanguage": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "discard": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "duplicate": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "executeScript": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "getZoom": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getZoomSettings": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goBack": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "goForward": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "highlight": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "insertCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "move": {
                  "minArgs": 2,
                  "maxArgs": 2
                },
                "query": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "reload": {
                  "minArgs": 0,
                  "maxArgs": 2
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "removeCSS": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "sendMessage": {
                  "minArgs": 2,
                  "maxArgs": 3
                },
                "setZoom": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "setZoomSettings": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "update": {
                  "minArgs": 1,
                  "maxArgs": 2
                }
              },
              "topSites": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "webNavigation": {
                "getAllFrames": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "getFrame": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "webRequest": {
                "handlerBehaviorChanged": {
                  "minArgs": 0,
                  "maxArgs": 0
                }
              },
              "windows": {
                "create": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "get": {
                  "minArgs": 1,
                  "maxArgs": 2
                },
                "getAll": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getCurrent": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getLastFocused": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "update": {
                  "minArgs": 2,
                  "maxArgs": 2
                }
              }
            };
            if (Object.keys(apiMetadata).length === 0) {
              throw new Error("api-metadata.json has not been included in browser-polyfill");
            }
            class DefaultWeakMap extends WeakMap {
              constructor(createItem, items = void 0) {
                super(items);
                this.createItem = createItem;
              }
              get(key) {
                if (!this.has(key)) {
                  this.set(key, this.createItem(key));
                }
                return super.get(key);
              }
            }
            const isThenable = (value) => {
              return value && typeof value === "object" && typeof value.then === "function";
            };
            const makeCallback = (promise, metadata) => {
              return (...callbackArgs) => {
                if (extensionAPIs.runtime.lastError) {
                  promise.reject(new Error(extensionAPIs.runtime.lastError.message));
                } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                  promise.resolve(callbackArgs[0]);
                } else {
                  promise.resolve(callbackArgs);
                }
              };
            };
            const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
            const wrapAsyncFunction = (name, metadata) => {
              return function asyncFunctionWrapper(target, ...args) {
                if (args.length < metadata.minArgs) {
                  throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
                }
                if (args.length > metadata.maxArgs) {
                  throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
                }
                return new Promise((resolve, reject) => {
                  if (metadata.fallbackToNoCallback) {
                    try {
                      target[name](...args, makeCallback({
                        resolve,
                        reject
                      }, metadata));
                    } catch (cbError) {
                      console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                      target[name](...args);
                      metadata.fallbackToNoCallback = false;
                      metadata.noCallback = true;
                      resolve();
                    }
                  } else if (metadata.noCallback) {
                    target[name](...args);
                    resolve();
                  } else {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  }
                });
              };
            };
            const wrapMethod = (target, method, wrapper) => {
              return new Proxy(method, {
                apply(targetMethod, thisObj, args) {
                  return wrapper.call(thisObj, target, ...args);
                }
              });
            };
            let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            const wrapObject = (target, wrappers = {}, metadata = {}) => {
              let cache = /* @__PURE__ */ Object.create(null);
              let handlers = {
                has(proxyTarget2, prop) {
                  return prop in target || prop in cache;
                },
                get(proxyTarget2, prop, receiver) {
                  if (prop in cache) {
                    return cache[prop];
                  }
                  if (!(prop in target)) {
                    return void 0;
                  }
                  let value = target[prop];
                  if (typeof value === "function") {
                    if (typeof wrappers[prop] === "function") {
                      value = wrapMethod(target, target[prop], wrappers[prop]);
                    } else if (hasOwnProperty(metadata, prop)) {
                      let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                      value = wrapMethod(target, target[prop], wrapper);
                    } else {
                      value = value.bind(target);
                    }
                  } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                    value = wrapObject(value, wrappers[prop], metadata[prop]);
                  } else if (hasOwnProperty(metadata, "*")) {
                    value = wrapObject(value, wrappers[prop], metadata["*"]);
                  } else {
                    Object.defineProperty(cache, prop, {
                      configurable: true,
                      enumerable: true,
                      get() {
                        return target[prop];
                      },
                      set(value2) {
                        target[prop] = value2;
                      }
                    });
                    return value;
                  }
                  cache[prop] = value;
                  return value;
                },
                set(proxyTarget2, prop, value, receiver) {
                  if (prop in cache) {
                    cache[prop] = value;
                  } else {
                    target[prop] = value;
                  }
                  return true;
                },
                defineProperty(proxyTarget2, prop, desc) {
                  return Reflect.defineProperty(cache, prop, desc);
                },
                deleteProperty(proxyTarget2, prop) {
                  return Reflect.deleteProperty(cache, prop);
                }
              };
              let proxyTarget = Object.create(target);
              return new Proxy(proxyTarget, handlers);
            };
            const wrapEvent = (wrapperMap) => ({
              addListener(target, listener, ...args) {
                target.addListener(wrapperMap.get(listener), ...args);
              },
              hasListener(target, listener) {
                return target.hasListener(wrapperMap.get(listener));
              },
              removeListener(target, listener) {
                target.removeListener(wrapperMap.get(listener));
              }
            });
            const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onRequestFinished(req) {
                const wrappedReq = wrapObject(req, {}, {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                });
                listener(wrappedReq);
              };
            });
            const onMessageWrappers = new DefaultWeakMap((listener) => {
              if (typeof listener !== "function") {
                return listener;
              }
              return function onMessage(message, sender, sendResponse) {
                let didCallSendResponse = false;
                let wrappedSendResponse;
                let sendResponsePromise = new Promise((resolve) => {
                  wrappedSendResponse = function(response) {
                    didCallSendResponse = true;
                    resolve(response);
                  };
                });
                let result;
                try {
                  result = listener(message, sender, wrappedSendResponse);
                } catch (err) {
                  result = Promise.reject(err);
                }
                const isResultThenable = result !== true && isThenable(result);
                if (result !== true && !isResultThenable && !didCallSendResponse) {
                  return false;
                }
                const sendPromisedResult = (promise) => {
                  promise.then((msg) => {
                    sendResponse(msg);
                  }, (error) => {
                    let message2;
                    if (error && (error instanceof Error || typeof error.message === "string")) {
                      message2 = error.message;
                    } else {
                      message2 = "An unexpected error occurred";
                    }
                    sendResponse({
                      __mozWebExtensionPolyfillReject__: true,
                      message: message2
                    });
                  }).catch((err) => {
                    console.error("Failed to send onMessage rejected reply", err);
                  });
                };
                if (isResultThenable) {
                  sendPromisedResult(result);
                } else {
                  sendPromisedResult(sendResponsePromise);
                }
                return true;
              };
            });
            const wrappedSendMessageCallback = ({
              reject,
              resolve
            }, reply) => {
              if (extensionAPIs.runtime.lastError) {
                if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                  resolve();
                } else {
                  reject(new Error(extensionAPIs.runtime.lastError.message));
                }
              } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                reject(new Error(reply.message));
              } else {
                resolve(reply);
              }
            };
            const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                const wrappedCb = wrappedSendMessageCallback.bind(null, {
                  resolve,
                  reject
                });
                args.push(wrappedCb);
                apiNamespaceObj.sendMessage(...args);
              });
            };
            const staticWrappers = {
              devtools: {
                network: {
                  onRequestFinished: wrapEvent(onRequestFinishedWrappers)
                }
              },
              runtime: {
                onMessage: wrapEvent(onMessageWrappers),
                onMessageExternal: wrapEvent(onMessageWrappers),
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 1,
                  maxArgs: 3
                })
              },
              tabs: {
                sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                  minArgs: 2,
                  maxArgs: 3
                })
              }
            };
            const settingMetadata = {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            };
            apiMetadata.privacy = {
              network: {
                "*": settingMetadata
              },
              services: {
                "*": settingMetadata
              },
              websites: {
                "*": settingMetadata
              }
            };
            return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
          };
          module2.exports = wrapAPIs(chrome);
        } else {
          module2.exports = globalThis.browser;
        }
      });
    }
  });

  // src/popup/popup.ts
  var import_webextension_polyfill3 = __toESM(require_browser_polyfill(), 1);

  // src/core/rules.ts
  var DOUBLE_QUOTES = /[\u201C\u201D\u201E\u00AB\u00BB]/g;
  var SINGLE_QUOTES = /[\u2018\u2019\u201A\u2039\u203A]/g;
  function replaceQuotes(text, onReplace) {
    return text.replace(DOUBLE_QUOTES, (match) => {
      onReplace?.(1);
      return '"';
    }).replace(SINGLE_QUOTES, (match) => {
      onReplace?.(1);
      return "'";
    });
  }
  var DASH_RUN = /\s*[\u2013\u2014]\s*/g;
  function replaceDashes(text, mode, onReplace) {
    return text.replace(DASH_RUN, (match, offset) => {
      const before = text.slice(0, offset).match(/(\S)\s*$/)?.[1] ?? "";
      const after = text.slice(offset + match.length).match(/^\s*(\S)/)?.[1] ?? "";
      const isDigitRange = /\d/.test(before) && /\d/.test(after);
      for (const character of match) {
        if (character === "\u2013" || character === "\u2014") onReplace?.(1);
      }
      return isDigitRange ? "-" : mode;
    });
  }
  function replaceEllipsis(text, onReplace) {
    return text.replace(/\u2026/g, (match) => {
      onReplace?.(1);
      return "...";
    });
  }
  var SPECIAL_SPACES = /[\u00A0\u2002-\u200A\u202F\u205F\u3000]/g;
  function replaceSpecialSpaces(text, onReplace) {
    return text.replace(SPECIAL_SPACES, (match) => {
      onReplace?.(1);
      return " ";
    });
  }
  var INVISIBLES = /[\u200B\u2060\uFEFF\u00AD\u200E\u200F]/g;
  function removeInvisibles(text, onReplace) {
    return text.replace(INVISIBLES, (match) => {
      onReplace?.(1);
      return "";
    });
  }
  function replaceMinus(text, onReplace) {
    return text.replace(/[\u2212\u2011]/g, (match) => {
      onReplace?.(1);
      return "-";
    });
  }
  function replaceArrows(text, onReplace) {
    return text.replace(/\u2192/g, (match) => {
      onReplace?.(1);
      return "->";
    }).replace(/\u2190/g, (match) => {
      onReplace?.(1);
      return "<-";
    });
  }
  function replaceBullets(text, onReplace) {
    return text.replace(/\u2022/g, (match) => {
      onReplace?.(1);
      return "-";
    });
  }
  var MULTIPLICATION_TIGHT = new RegExp("(?<=\\p{N})\\u00D7(?=\\p{N})|(?<=\\p{L})\\u00D7(?=\\p{L})", "gu");
  function replaceSymbols(text, onReplace) {
    return text.replace(MULTIPLICATION_TIGHT, (match) => {
      onReplace?.(1);
      return "x";
    }).replace(/\u2032/g, (match) => {
      onReplace?.(1);
      return "'";
    }).replace(/\u2033/g, (match) => {
      onReplace?.(1);
      return '"';
    });
  }
  var EMOJI = new RegExp("\\p{Extended_Pictographic}(?:[\\u{1F3FB}-\\u{1F3FF}]|\\uFE0F|\\u200D\\p{Extended_Pictographic})*|[\\u{1F1E6}-\\u{1F1FF}]{2}|[0-9#*]\\uFE0F?\\u20E3", "gu");
  function removeEmojis(text, onReplace) {
    return text.replace(EMOJI, (match) => {
      onReplace?.(1);
      return "";
    });
  }
  var LINE_SPLIT = /(\r\n|\n)/;
  function collapseSpaces(text, onReplace) {
    return text.split(LINE_SPLIT).map((part) => {
      if (part === "\n" || part === "\r\n") return part;
      const m = part.match(/^([ \t]*)([\s\S]*)$/);
      const indent = m?.[1] ?? "";
      const rest = m?.[2] ?? "";
      return indent + rest.replace(/ {2,}/g, (match) => {
        onReplace?.(match.length - 1);
        return " ";
      });
    }).join("");
  }
  var PROTECTED_PATTERN = /(https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;
  function splitProtectedSegments(text) {
    const segments = [];
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

  // src/core/normalize.ts
  var defaultOptions = {
    quotes: true,
    dashes: true,
    dashMode: " - ",
    ellipsis: true,
    spaces: true,
    invisibles: true,
    misc: true,
    emojis: false,
    collapseSpaces: true
  };
  function createEmptyStats() {
    return {
      total: 0,
      byGroup: {
        quotes: 0,
        dashes: 0,
        ellipsis: 0,
        spaces: 0,
        invisibles: 0,
        minus: 0,
        arrows: 0,
        bullets: 0,
        symbols: 0
      }
    };
  }
  function normalize(text, opts = defaultOptions) {
    const stats = createEmptyStats();
    const count = (group) => (n) => {
      stats.byGroup[group] += n;
      stats.total += n;
    };
    const segments = splitProtectedSegments(text);
    const processed = segments.map((segment) => {
      if (segment.protected) return segment.value;
      let value = segment.value;
      if (opts.quotes) value = replaceQuotes(value, count("quotes"));
      if (opts.dashes) value = replaceDashes(value, opts.dashMode, count("dashes"));
      if (opts.ellipsis) value = replaceEllipsis(value, count("ellipsis"));
      if (opts.spaces) value = replaceSpecialSpaces(value, count("spaces"));
      if (opts.invisibles) value = removeInvisibles(value, count("invisibles"));
      if (opts.misc) {
        value = replaceMinus(value, count("minus"));
        value = replaceArrows(value, count("arrows"));
        value = replaceBullets(value, count("bullets"));
        value = replaceSymbols(value, count("symbols"));
      }
      if (opts.emojis) value = removeEmojis(value, count("symbols"));
      if (opts.collapseSpaces) value = collapseSpaces(value, count("spaces"));
      return value;
    }).join("");
    return { text: processed, stats };
  }

  // src/shared/i18n.ts
  var import_webextension_polyfill = __toESM(require_browser_polyfill(), 1);

  // _locales/de/messages.json
  var messages_default = {
    appName: { message: "KI-Typografie bereinigen" },
    appDescription: { message: "Ersetzt typografische KI-Zeichen beim Kopieren durch normale Tastaturzeichen." },
    popupPasteLabel: { message: "Text einf\xFCgen" },
    popupInputPlaceholder: { message: "Text hier einf\xFCgen..." },
    cleanButton: { message: "Bereinigen" },
    copyButton: { message: "Kopieren" },
    resultLabel: { message: "Ergebnis" },
    settingsLink: { message: "Einstellungen" },
    copiedStatus: { message: "Kopiert!" },
    optionsTitle: { message: "KI-Typografie bereinigen \u2014 Einstellungen" },
    themeHeading: { message: "Darstellung" },
    themeLabel: { message: "Design" },
    themeSystem: { message: "System" },
    themeLight: { message: "Hell" },
    themeDark: { message: "Dunkel" },
    languageLabel: { message: "Sprache" },
    languageAuto: { message: "Automatisch (Browsersprache)" },
    rulesHeading: { message: "Regelgruppen" },
    quotesRule: { message: `Anf\xFChrungszeichen (\u201E \u201C \xBB \xAB \u2018 \u2019 \u2192 " und ')` },
    dashesRule: { message: "Gedankenstriche (\u2014 / \u2013 \u2192 Bindestrich)" },
    dashModeSpaced: { message: '" - " (mit Leerzeichen)' },
    dashModeTight: { message: '"-" (ohne Leerzeichen)' },
    dashModeComma: { message: '", " (Komma)' },
    ellipsisRule: { message: "Auslassungspunkte (\u2026 \u2192 ...)" },
    spacesRule: { message: "Sonderleerzeichen \u2192 normale Leerzeichen" },
    invisiblesRule: { message: "Unsichtbare Zeichen entfernen" },
    miscRule: { message: "Sonstiges (Minus, Aufz\xE4hlungszeichen, Pfeile, \xD7, Striche)" },
    emojisRule: { message: "Emojis entfernen (\u{1F600}, Flaggen, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Mehrfache Leerzeichen zusammenfassen" },
    whitelistTitle: { message: "Zugelassene Websites" },
    whitelistDescription: { message: "Die automatische Bereinigung beim Kopieren (Strg+C) funktioniert nur auf diesen Websites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Hinzuf\xFCgen" },
    savedStatus: { message: "Gespeichert" },
    invalidDomainStatus: { message: "Ung\xFCltige Domain" },
    duplicateDomainStatus: { message: "Domain ist bereits in der Liste" },
    permissionDeniedStatus: { message: "Zugriff wurde nicht gew\xE4hrt" },
    domainAddedStatus: { message: "Domain hinzugef\xFCgt" },
    contextCleanSelection: { message: "Ausgew\xE4hlten Text bereinigen" },
    contextPasteCleaned: { message: "Bereinigten Text einf\xFCgen" }
  };

  // _locales/en/messages.json
  var messages_default2 = {
    appName: { message: "AI Typography Cleaner" },
    appDescription: { message: "Replace AI-generated typographic characters with plain keyboard equivalents when copying." },
    popupPasteLabel: { message: "Paste text" },
    popupInputPlaceholder: { message: "Paste text here..." },
    cleanButton: { message: "Clean" },
    copyButton: { message: "Copy" },
    resultLabel: { message: "Result" },
    settingsLink: { message: "Settings" },
    copiedStatus: { message: "Copied!" },
    optionsTitle: { message: "AI Typography Cleaner \u2014 Settings" },
    themeHeading: { message: "Appearance" },
    themeLabel: { message: "Theme" },
    themeSystem: { message: "System" },
    themeLight: { message: "Light" },
    themeDark: { message: "Dark" },
    languageLabel: { message: "Language" },
    languageAuto: { message: "Auto (detect from browser)" },
    rulesHeading: { message: "Rule groups" },
    quotesRule: { message: `Quotes (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2039 \u203A \u2192 " and ')` },
    dashesRule: { message: "Dashes (\u2014 / \u2013 \u2192 hyphen)" },
    dashModeSpaced: { message: '" - " (with spaces)' },
    dashModeTight: { message: '"-" (no spaces)' },
    dashModeComma: { message: '", " (comma)' },
    ellipsisRule: { message: "Ellipsis (\u2026 \u2192 ...)" },
    spacesRule: { message: "Special spaces \u2192 regular spaces" },
    invisiblesRule: { message: "Remove invisible characters" },
    miscRule: { message: "Other (minus, bullets, arrows, \xD7, primes)" },
    emojisRule: { message: "Remove emoji (\u{1F600}, flags, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Collapse repeated spaces" },
    whitelistTitle: { message: "Allowed websites" },
    whitelistDescription: { message: "Automatic cleanup when copying (Ctrl+C) works only on these websites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Add" },
    savedStatus: { message: "Saved" },
    invalidDomainStatus: { message: "Invalid domain" },
    duplicateDomainStatus: { message: "Domain is already in the list" },
    permissionDeniedStatus: { message: "Permission was not granted" },
    domainAddedStatus: { message: "Domain added" },
    contextCleanSelection: { message: "Clean selected text" },
    contextPasteCleaned: { message: "Paste cleaned text" },
    notificationsHeading: { message: "Notifications" },
    showToastLabel: { message: "Show notification" },
    showBreakdownLabel: { message: "Show breakdown by group" },
    toastTitle: { message: "Cleaned: {count} {unit}" },
    toastAndMore: { message: "and {count} more" },
    toastUnitCharacterOne: { message: "symbol" },
    toastUnitCharacterFew: { message: "symbols" },
    toastUnitCharacterMany: { message: "symbols" },
    toastUnitQuotesOne: { message: "quote" },
    toastUnitQuotesFew: { message: "quotes" },
    toastUnitQuotesMany: { message: "quotes" },
    toastUnitDashesOne: { message: "dash" },
    toastUnitDashesFew: { message: "dashes" },
    toastUnitDashesMany: { message: "dashes" },
    toastUnitEllipsisOne: { message: "ellipsis" },
    toastUnitEllipsisFew: { message: "ellipses" },
    toastUnitEllipsisMany: { message: "ellipses" },
    toastUnitSpacesOne: { message: "special space" },
    toastUnitSpacesFew: { message: "special spaces" },
    toastUnitSpacesMany: { message: "special spaces" },
    toastUnitInvisiblesOne: { message: "invisible character" },
    toastUnitInvisiblesFew: { message: "invisible characters" },
    toastUnitInvisiblesMany: { message: "invisible characters" },
    toastUnitMinusOne: { message: "minus sign" },
    toastUnitMinusFew: { message: "minus signs" },
    toastUnitMinusMany: { message: "minus signs" },
    toastUnitArrowsOne: { message: "arrow" },
    toastUnitArrowsFew: { message: "arrows" },
    toastUnitArrowsMany: { message: "arrows" },
    toastUnitBulletsOne: { message: "bullet" },
    toastUnitBulletsFew: { message: "bullets" },
    toastUnitBulletsMany: { message: "bullets" },
    toastUnitSymbolsOne: { message: "sign" },
    toastUnitSymbolsFew: { message: "signs" },
    toastUnitSymbolsMany: { message: "signs" }
  };

  // _locales/es/messages.json
  var messages_default3 = {
    appName: { message: "Limpiador tipogr\xE1fico de IA" },
    appDescription: { message: "Sustituye los caracteres tipogr\xE1ficos de texto generado por IA por equivalentes simples al copiar." },
    popupPasteLabel: { message: "Pega el texto" },
    popupInputPlaceholder: { message: "Pega el texto aqu\xED..." },
    cleanButton: { message: "Limpiar" },
    copyButton: { message: "Copiar" },
    resultLabel: { message: "Resultado" },
    settingsLink: { message: "Configuraci\xF3n" },
    copiedStatus: { message: "\xA1Copiado!" },
    optionsTitle: { message: "Limpiador tipogr\xE1fico de IA \u2014 Configuraci\xF3n" },
    themeHeading: { message: "Apariencia" },
    themeLabel: { message: "Tema" },
    themeSystem: { message: "Sistema" },
    themeLight: { message: "Claro" },
    themeDark: { message: "Oscuro" },
    languageLabel: { message: "Idioma" },
    languageAuto: { message: "Autom\xE1tico (idioma del navegador)" },
    rulesHeading: { message: "Grupos de reglas" },
    quotesRule: { message: `Comillas (\xAB \xBB \u201E \u201C \u2018 \u2019 \u2192 " y ')` },
    dashesRule: { message: "Rayas (\u2014 / \u2013 \u2192 guion)" },
    dashModeSpaced: { message: '" - " (con espacios)' },
    dashModeTight: { message: '"-" (sin espacios)' },
    dashModeComma: { message: '", " (coma)' },
    ellipsisRule: { message: "Puntos suspensivos (\u2026 \u2192 ...)" },
    spacesRule: { message: "Espacios especiales \u2192 espacios normales" },
    invisiblesRule: { message: "Eliminar caracteres invisibles" },
    miscRule: { message: "Otros (menos, vi\xF1etas, flechas, \xD7, primas)" },
    emojisRule: { message: "Eliminar emojis (\u{1F600}, banderas, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Reducir espacios repetidos" },
    whitelistTitle: { message: "Sitios permitidos" },
    whitelistDescription: { message: "La limpieza autom\xE1tica al copiar (Ctrl+C) solo funciona en estos sitios." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "A\xF1adir" },
    savedStatus: { message: "Guardado" },
    invalidDomainStatus: { message: "Dominio no v\xE1lido" },
    duplicateDomainStatus: { message: "El dominio ya est\xE1 en la lista" },
    permissionDeniedStatus: { message: "No se concedi\xF3 el permiso" },
    domainAddedStatus: { message: "Dominio a\xF1adido" },
    contextCleanSelection: { message: "Limpiar texto seleccionado" },
    contextPasteCleaned: { message: "Pegar texto limpio" }
  };

  // _locales/fr/messages.json
  var messages_default4 = {
    appName: { message: "Nettoyeur typographique IA" },
    appDescription: { message: "Remplace les caract\xE8res typographiques g\xE9n\xE9r\xE9s par l\u2019IA par des \xE9quivalents simples lors de la copie." },
    popupPasteLabel: { message: "Collez le texte" },
    popupInputPlaceholder: { message: "Collez le texte ici..." },
    cleanButton: { message: "Nettoyer" },
    copyButton: { message: "Copier" },
    resultLabel: { message: "R\xE9sultat" },
    settingsLink: { message: "Param\xE8tres" },
    copiedStatus: { message: "Copi\xE9 !" },
    optionsTitle: { message: "Nettoyeur typographique IA \u2014 Param\xE8tres" },
    themeHeading: { message: "Apparence" },
    themeLabel: { message: "Th\xE8me" },
    themeSystem: { message: "Syst\xE8me" },
    themeLight: { message: "Clair" },
    themeDark: { message: "Sombre" },
    languageLabel: { message: "Langue" },
    languageAuto: { message: "Automatique (langue du navigateur)" },
    rulesHeading: { message: "Groupes de r\xE8gles" },
    quotesRule: { message: `Guillemets (\xAB \xBB \u201E \u201C \u2018 \u2019 \u2192 " et ')` },
    dashesRule: { message: "Tirets (\u2014 / \u2013 \u2192 trait d\u2019union)" },
    dashModeSpaced: { message: '" - " (avec espaces)' },
    dashModeTight: { message: '"-" (sans espaces)' },
    dashModeComma: { message: '", " (virgule)' },
    ellipsisRule: { message: "Points de suspension (\u2026 \u2192 ...)" },
    spacesRule: { message: "Espaces sp\xE9ciaux \u2192 espaces simples" },
    invisiblesRule: { message: "Supprimer les caract\xE8res invisibles" },
    miscRule: { message: "Autres (moins, puces, fl\xE8ches, \xD7, primes)" },
    emojisRule: { message: "Supprimer les \xE9mojis (\u{1F600}, drapeaux, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "R\xE9duire les espaces r\xE9p\xE9t\xE9s" },
    whitelistTitle: { message: "Sites autoris\xE9s" },
    whitelistDescription: { message: "Le nettoyage automatique lors de la copie (Ctrl+C) fonctionne uniquement sur ces sites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Ajouter" },
    savedStatus: { message: "Enregistr\xE9" },
    invalidDomainStatus: { message: "Domaine invalide" },
    duplicateDomainStatus: { message: "Le domaine figure d\xE9j\xE0 dans la liste" },
    permissionDeniedStatus: { message: "Autorisation refus\xE9e" },
    domainAddedStatus: { message: "Domaine ajout\xE9" },
    contextCleanSelection: { message: "Nettoyer le texte s\xE9lectionn\xE9" },
    contextPasteCleaned: { message: "Coller le texte nettoy\xE9" }
  };

  // _locales/he/messages.json
  var messages_default5 = {
    appName: { message: "\u05DE\u05E0\u05E7\u05D4 \u05D4\u05D8\u05D9\u05E4\u05D5\u05D2\u05E8\u05E4\u05D9\u05D4 \u05E9\u05DC AI" },
    appDescription: { message: "\u05D4\u05D7\u05DC\u05E4\u05EA \u05EA\u05D5\u05D5\u05D9\u05DD \u05D8\u05D9\u05E4\u05D5\u05D2\u05E8\u05E4\u05D9\u05D9\u05DD \u05E9\u05DC \u05D8\u05E7\u05E1\u05D8 AI \u05D1\u05EA\u05D5\u05D5\u05D9\u05DD \u05E8\u05D2\u05D9\u05DC\u05D9\u05DD \u05D1\u05E2\u05EA \u05D4\u05E2\u05EA\u05E7\u05D4." },
    popupPasteLabel: { message: "\u05D4\u05D3\u05D1\u05E7\u05EA \u05D8\u05E7\u05E1\u05D8" },
    popupInputPlaceholder: { message: "\u05D4\u05D3\u05D1\u05D9\u05E7\u05D5 \u05DB\u05D0\u05DF \u05D8\u05E7\u05E1\u05D8..." },
    cleanButton: { message: "\u05E0\u05D9\u05E7\u05D5\u05D9" },
    copyButton: { message: "\u05D4\u05E2\u05EA\u05E7\u05D4" },
    resultLabel: { message: "\u05EA\u05D5\u05E6\u05D0\u05D4" },
    settingsLink: { message: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA" },
    copiedStatus: { message: "\u05D4\u05D5\u05E2\u05EA\u05E7!" },
    optionsTitle: { message: "\u05DE\u05E0\u05E7\u05D4 \u05D4\u05D8\u05D9\u05E4\u05D5\u05D2\u05E8\u05E4\u05D9\u05D4 \u05E9\u05DC AI \u2014 \u05D4\u05D2\u05D3\u05E8\u05D5\u05EA" },
    themeHeading: { message: "\u05DE\u05E8\u05D0\u05D4" },
    themeLabel: { message: "\u05E2\u05E8\u05DB\u05EA \u05E0\u05D5\u05E9\u05D0" },
    themeSystem: { message: "\u05DE\u05E2\u05E8\u05DB\u05EA" },
    themeLight: { message: "\u05D1\u05D4\u05D9\u05E8\u05D4" },
    themeDark: { message: "\u05DB\u05D4\u05D4" },
    languageLabel: { message: "\u05E9\u05E4\u05D4" },
    languageAuto: { message: "\u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 (\u05DC\u05E4\u05D9 \u05E9\u05E4\u05EA \u05D4\u05D3\u05E4\u05D3\u05E4\u05DF)" },
    rulesHeading: { message: "\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA \u05DB\u05DC\u05DC\u05D9\u05DD" },
    quotesRule: { message: `\u05DE\u05E8\u05DB\u05D0\u05D5\u05EA (\u201E \u201D \xAB \xBB \u2018 \u2019 \u2192 " \u05D5\u05BE')` },
    dashesRule: { message: "\u05DE\u05E7\u05E4\u05D9\u05DD (\u2014 / \u2013 \u2192 -)" },
    dashModeSpaced: { message: '" - " (\u05E2\u05DD \u05E8\u05D5\u05D5\u05D7\u05D9\u05DD)' },
    dashModeTight: { message: '"-" (\u05DC\u05DC\u05D0 \u05E8\u05D5\u05D5\u05D7\u05D9\u05DD)' },
    dashModeComma: { message: '", " (\u05E4\u05E1\u05D9\u05E7)' },
    ellipsisRule: { message: "\u05E9\u05DC\u05D5\u05E9 \u05E0\u05E7\u05D5\u05D3\u05D5\u05EA (\u2026 \u2192 ...)" },
    spacesRule: { message: "\u05E8\u05D5\u05D5\u05D7\u05D9\u05DD \u05DE\u05D9\u05D5\u05D7\u05D3\u05D9\u05DD \u2192 \u05E8\u05D5\u05D5\u05D7 \u05E8\u05D2\u05D9\u05DC" },
    invisiblesRule: { message: "\u05D4\u05E1\u05E8\u05EA \u05EA\u05D5\u05D5\u05D9\u05DD \u05D1\u05DC\u05EA\u05D9 \u05E0\u05E8\u05D0\u05D9\u05DD" },
    miscRule: { message: "\u05D0\u05D7\u05E8 (\u05DE\u05D9\u05E0\u05D5\u05E1, \u05EA\u05D1\u05DC\u05D9\u05D8\u05D9\u05DD, \u05D7\u05E6\u05D9\u05DD, \xD7, \u05E1\u05D9\u05DE\u05E0\u05D9 \u05D3\u05E7\u05D5\u05EA)" },
    emojisRule: { message: "\u05D4\u05E1\u05E8\u05EA \u05D0\u05D9\u05DE\u05D5\u05D2\u05F3\u05D9 (\u{1F600}, \u05D3\u05D2\u05DC\u05D9\u05DD, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "\u05E6\u05DE\u05E6\u05D5\u05DD \u05E8\u05D5\u05D5\u05D7\u05D9\u05DD \u05D7\u05D5\u05D6\u05E8\u05D9\u05DD" },
    whitelistTitle: { message: "\u05D0\u05EA\u05E8\u05D9\u05DD \u05DE\u05D5\u05E8\u05E9\u05D9\u05DD" },
    whitelistDescription: { message: "\u05E0\u05D9\u05E7\u05D5\u05D9 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9 \u05D1\u05E2\u05EA \u05D4\u05E2\u05EA\u05E7\u05D4 (Ctrl+C) \u05E4\u05D5\u05E2\u05DC \u05E8\u05E7 \u05D1\u05D0\u05EA\u05E8\u05D9\u05DD \u05D0\u05DC\u05D4." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u05D4\u05D5\u05E1\u05E4\u05D4" },
    savedStatus: { message: "\u05E0\u05E9\u05DE\u05E8" },
    invalidDomainStatus: { message: "\u05E9\u05DD \u05DE\u05EA\u05D7\u05DD \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF" },
    duplicateDomainStatus: { message: "\u05E9\u05DD \u05D4\u05DE\u05EA\u05D7\u05DD \u05DB\u05D1\u05E8 \u05E0\u05DE\u05E6\u05D0 \u05D1\u05E8\u05E9\u05D9\u05DE\u05D4" },
    permissionDeniedStatus: { message: "\u05D4\u05D4\u05E8\u05E9\u05D0\u05D4 \u05DC\u05D0 \u05D0\u05D5\u05E9\u05E8\u05D4" },
    domainAddedStatus: { message: "\u05E9\u05DD \u05D4\u05DE\u05EA\u05D7\u05DD \u05E0\u05D5\u05E1\u05E3" },
    contextCleanSelection: { message: "\u05E0\u05D9\u05E7\u05D5\u05D9 \u05D4\u05D8\u05E7\u05E1\u05D8 \u05E9\u05E0\u05D1\u05D7\u05E8" },
    contextPasteCleaned: { message: "\u05D4\u05D3\u05D1\u05E7\u05EA \u05D8\u05E7\u05E1\u05D8 \u05E0\u05E7\u05D9" }
  };

  // _locales/hi/messages.json
  var messages_default6 = {
    appName: { message: "AI \u091F\u093E\u0907\u092A\u094B\u0917\u094D\u0930\u093E\u092B\u0940 \u0915\u094D\u0932\u0940\u0928\u0930" },
    appDescription: { message: "\u0915\u0949\u092A\u0940 \u0915\u0930\u0924\u0947 \u0938\u092E\u092F AI \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947 \u091F\u093E\u0907\u092A\u094B\u0917\u094D\u0930\u093E\u092B\u093C\u093F\u0915 \u0935\u0930\u094D\u0923\u094B\u0902 \u0915\u094B \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0915\u0940\u092C\u094B\u0930\u094D\u0921 \u0935\u0930\u094D\u0923\u094B\u0902 \u0938\u0947 \u092C\u0926\u0932\u0947\u0902\u0964" },
    popupPasteLabel: { message: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902" },
    popupInputPlaceholder: { message: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092F\u0939\u093E\u0901 \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902..." },
    cleanButton: { message: "\u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902" },
    copyButton: { message: "\u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902" },
    resultLabel: { message: "\u0928\u0924\u0940\u091C\u093E" },
    settingsLink: { message: "\u0938\u0947\u091F\u093F\u0902\u0917" },
    copiedStatus: { message: "\u0915\u0949\u092A\u0940 \u0939\u094B \u0917\u092F\u093E!" },
    optionsTitle: { message: "AI \u091F\u093E\u0907\u092A\u094B\u0917\u094D\u0930\u093E\u092B\u0940 \u0915\u094D\u0932\u0940\u0928\u0930 \u2014 \u0938\u0947\u091F\u093F\u0902\u0917" },
    themeHeading: { message: "\u0926\u093F\u0916\u093E\u0935\u091F" },
    themeLabel: { message: "\u0925\u0940\u092E" },
    themeSystem: { message: "\u0938\u093F\u0938\u094D\u091F\u092E" },
    themeLight: { message: "\u0939\u0932\u094D\u0915\u0940" },
    themeDark: { message: "\u0917\u0939\u0930\u0940" },
    languageLabel: { message: "\u092D\u093E\u0937\u093E" },
    languageAuto: { message: "\u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 (\u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u0915\u0940 \u092D\u093E\u0937\u093E \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930)" },
    rulesHeading: { message: "\u0928\u093F\u092F\u092E \u0938\u092E\u0942\u0939" },
    quotesRule: { message: `\u0909\u0926\u094D\u0927\u0930\u0923 \u091A\u093F\u0939\u094D\u0928 (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " \u0914\u0930 ')` },
    dashesRule: { message: "\u0921\u0948\u0936 (\u2014 / \u2013 \u2192 \u0939\u093E\u0907\u092B\u093C\u0928)" },
    dashModeSpaced: { message: '" - " (\u0938\u094D\u092A\u0947\u0938 \u0915\u0947 \u0938\u093E\u0925)' },
    dashModeTight: { message: '"-" (\u092C\u093F\u0928\u093E \u0938\u094D\u092A\u0947\u0938)' },
    dashModeComma: { message: '", " (\u0905\u0932\u094D\u092A\u0935\u093F\u0930\u093E\u092E)' },
    ellipsisRule: { message: "\u090F\u0932\u093F\u092A\u094D\u0938\u093F\u0938 (\u2026 \u2192 ...)" },
    spacesRule: { message: "\u0935\u093F\u0936\u0947\u0937 \u0938\u094D\u092A\u0947\u0938 \u2192 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0938\u094D\u092A\u0947\u0938" },
    invisiblesRule: { message: "\u0905\u0926\u0943\u0936\u094D\u092F \u0905\u0915\u094D\u0937\u0930 \u0939\u091F\u093E\u090F\u0901" },
    miscRule: { message: "\u0905\u0928\u094D\u092F (\u092E\u093E\u0907\u0928\u0938, \u092C\u0941\u0932\u0947\u091F, \u0924\u0940\u0930, \xD7, \u092A\u094D\u0930\u093E\u0907\u092E)" },
    emojisRule: { message: "\u0907\u092E\u094B\u091C\u0940 \u0939\u091F\u093E\u090F\u0901 (\u{1F600}, \u091D\u0902\u0921\u0947, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "\u092C\u093E\u0930-\u092C\u093E\u0930 \u0906\u0928\u0947 \u0935\u093E\u0932\u0947 \u0938\u094D\u092A\u0947\u0938 \u0915\u092E \u0915\u0930\u0947\u0902" },
    whitelistTitle: { message: "\u0905\u0928\u0941\u092E\u0924 \u0935\u0947\u092C\u0938\u093E\u0907\u091F\u0947\u0902" },
    whitelistDescription: { message: "\u0915\u0949\u092A\u0940 \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 \u0938\u092B\u093C\u093E\u0908 (Ctrl+C) \u0915\u0947\u0935\u0932 \u0907\u0928 \u0935\u0947\u092C\u0938\u093E\u0907\u091F\u094B\u0902 \u092A\u0930 \u0915\u093E\u092E \u0915\u0930\u0924\u0940 \u0939\u0948\u0964" },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u091C\u094B\u0921\u093C\u0947\u0902" },
    savedStatus: { message: "\u0938\u0939\u0947\u091C\u093E \u0917\u092F\u093E" },
    invalidDomainStatus: { message: "\u0905\u092E\u093E\u0928\u094D\u092F \u0921\u094B\u092E\u0947\u0928" },
    duplicateDomainStatus: { message: "\u0921\u094B\u092E\u0947\u0928 \u092A\u0939\u0932\u0947 \u0938\u0947 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0939\u0948" },
    permissionDeniedStatus: { message: "\u0905\u0928\u0941\u092E\u0924\u093F \u0928\u0939\u0940\u0902 \u0926\u0940 \u0917\u0908" },
    domainAddedStatus: { message: "\u0921\u094B\u092E\u0947\u0928 \u091C\u094B\u0921\u093C\u093E \u0917\u092F\u093E" },
    contextCleanSelection: { message: "\u091A\u0941\u0928\u0947 \u0939\u0941\u090F \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902" },
    contextPasteCleaned: { message: "\u0938\u093E\u092B\u093C \u0915\u093F\u092F\u093E \u0939\u0941\u0906 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902" }
  };

  // _locales/it/messages.json
  var messages_default7 = {
    appName: { message: "Pulitore tipografico IA" },
    appDescription: { message: "Sostituisce i caratteri tipografici generati dall\u2019IA con equivalenti semplici durante la copia." },
    popupPasteLabel: { message: "Incolla il testo" },
    popupInputPlaceholder: { message: "Incolla qui il testo..." },
    cleanButton: { message: "Pulisci" },
    copyButton: { message: "Copia" },
    resultLabel: { message: "Risultato" },
    settingsLink: { message: "Impostazioni" },
    copiedStatus: { message: "Copiato!" },
    optionsTitle: { message: "Pulitore tipografico IA \u2014 Impostazioni" },
    themeHeading: { message: "Aspetto" },
    themeLabel: { message: "Tema" },
    themeSystem: { message: "Sistema" },
    themeLight: { message: "Chiaro" },
    themeDark: { message: "Scuro" },
    languageLabel: { message: "Lingua" },
    languageAuto: { message: "Automatico (lingua del browser)" },
    rulesHeading: { message: "Gruppi di regole" },
    quotesRule: { message: `Virgolette (\xAB \xBB \u201E \u201C \u2018 \u2019 \u2192 " e ')` },
    dashesRule: { message: "Trattini (\u2014 / \u2013 \u2192 trattino)" },
    dashModeSpaced: { message: '" - " (con spazi)' },
    dashModeTight: { message: '"-" (senza spazi)' },
    dashModeComma: { message: '", " (virgola)' },
    ellipsisRule: { message: "Puntini di sospensione (\u2026 \u2192 ...)" },
    spacesRule: { message: "Spazi speciali \u2192 spazi normali" },
    invisiblesRule: { message: "Rimuovi caratteri invisibili" },
    miscRule: { message: "Altro (meno, elenchi, frecce, \xD7, apici)" },
    emojisRule: { message: "Rimuovi emoji (\u{1F600}, bandiere, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Riduci gli spazi ripetuti" },
    whitelistTitle: { message: "Siti consentiti" },
    whitelistDescription: { message: "La pulizia automatica durante la copia (Ctrl+C) funziona solo su questi siti." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Aggiungi" },
    savedStatus: { message: "Salvato" },
    invalidDomainStatus: { message: "Dominio non valido" },
    duplicateDomainStatus: { message: "Il dominio \xE8 gi\xE0 nell\u2019elenco" },
    permissionDeniedStatus: { message: "Autorizzazione non concessa" },
    domainAddedStatus: { message: "Dominio aggiunto" },
    contextCleanSelection: { message: "Pulisci il testo selezionato" },
    contextPasteCleaned: { message: "Incolla il testo pulito" }
  };

  // _locales/ja/messages.json
  var messages_default8 = {
    appName: { message: "AI \u30BF\u30A4\u30DD\u30B0\u30E9\u30D5\u30A3\u30AF\u30EA\u30FC\u30CA\u30FC" },
    appDescription: { message: "\u30B3\u30D4\u30FC\u6642\u306B\u3001AI \u304C\u751F\u6210\u3057\u305F\u6587\u7AE0\u306E\u7D44\u7248\u6587\u5B57\u3092\u901A\u5E38\u306E\u30AD\u30FC\u30DC\u30FC\u30C9\u6587\u5B57\u306B\u7F6E\u304D\u63DB\u3048\u307E\u3059\u3002" },
    popupPasteLabel: { message: "\u30C6\u30AD\u30B9\u30C8\u3092\u8CBC\u308A\u4ED8\u3051" },
    popupInputPlaceholder: { message: "\u3053\u3053\u306B\u30C6\u30AD\u30B9\u30C8\u3092\u8CBC\u308A\u4ED8\u3051..." },
    cleanButton: { message: "\u30AF\u30EA\u30FC\u30CB\u30F3\u30B0" },
    copyButton: { message: "\u30B3\u30D4\u30FC" },
    resultLabel: { message: "\u7D50\u679C" },
    settingsLink: { message: "\u8A2D\u5B9A" },
    copiedStatus: { message: "\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF01" },
    optionsTitle: { message: "AI \u30BF\u30A4\u30DD\u30B0\u30E9\u30D5\u30A3\u30AF\u30EA\u30FC\u30CA\u30FC \u2014 \u8A2D\u5B9A" },
    themeHeading: { message: "\u5916\u89B3" },
    themeLabel: { message: "\u30C6\u30FC\u30DE" },
    themeSystem: { message: "\u30B7\u30B9\u30C6\u30E0\u8A2D\u5B9A" },
    themeLight: { message: "\u30E9\u30A4\u30C8" },
    themeDark: { message: "\u30C0\u30FC\u30AF" },
    languageLabel: { message: "\u8A00\u8A9E" },
    languageAuto: { message: "\u81EA\u52D5\uFF08\u30D6\u30E9\u30A6\u30B6\u306E\u8A00\u8A9E\u306B\u5F93\u3046\uFF09" },
    rulesHeading: { message: "\u30EB\u30FC\u30EB" },
    quotesRule: { message: `\u5F15\u7528\u7B26\uFF08\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " \u3068 '\uFF09` },
    dashesRule: { message: "\u30C0\u30C3\u30B7\u30E5\uFF08\u2014 / \u2013 \u2192 \u30CF\u30A4\u30D5\u30F3\uFF09" },
    dashModeSpaced: { message: '" - "\uFF08\u524D\u5F8C\u306B\u7A7A\u767D\uFF09' },
    dashModeTight: { message: '"-"\uFF08\u7A7A\u767D\u306A\u3057\uFF09' },
    dashModeComma: { message: '", "\uFF08\u30AB\u30F3\u30DE\uFF09' },
    ellipsisRule: { message: "\u4E09\u70B9\u30EA\u30FC\u30C0\u30FC\uFF08\u2026 \u2192 ...\uFF09" },
    spacesRule: { message: "\u7279\u6B8A\u306A\u7A7A\u767D \u2192 \u901A\u5E38\u306E\u7A7A\u767D" },
    invisiblesRule: { message: "\u4E0D\u53EF\u8996\u6587\u5B57\u3092\u524A\u9664" },
    miscRule: { message: "\u305D\u306E\u4ED6\uFF08\u30DE\u30A4\u30CA\u30B9\u3001\u7B87\u6761\u66F8\u304D\u3001\u77E2\u5370\u3001\xD7\u3001\u30D7\u30E9\u30A4\u30E0\uFF09" },
    emojisRule: { message: "\u7D75\u6587\u5B57\u3092\u524A\u9664\uFF08\u{1F600}\u3001\u65D7\u3001\xA9/\xAE/\u2122\uFF09" },
    collapseSpacesRule: { message: "\u9023\u7D9A\u3059\u308B\u7A7A\u767D\u3092\u307E\u3068\u3081\u308B" },
    whitelistTitle: { message: "\u8A31\u53EF\u3059\u308B\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8" },
    whitelistDescription: { message: "\u30B3\u30D4\u30FC\u6642\u306E\u81EA\u52D5\u30AF\u30EA\u30FC\u30CB\u30F3\u30B0\uFF08Ctrl+C\uFF09\u306F\u3001\u3053\u308C\u3089\u306E\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8\u3067\u306E\u307F\u6709\u52B9\u3067\u3059\u3002" },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u8FFD\u52A0" },
    savedStatus: { message: "\u4FDD\u5B58\u3057\u307E\u3057\u305F" },
    invalidDomainStatus: { message: "\u7121\u52B9\u306A\u30C9\u30E1\u30A4\u30F3\u3067\u3059" },
    duplicateDomainStatus: { message: "\u3053\u306E\u30C9\u30E1\u30A4\u30F3\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059" },
    permissionDeniedStatus: { message: "\u6A29\u9650\u304C\u8A31\u53EF\u3055\u308C\u307E\u305B\u3093\u3067\u3057\u305F" },
    domainAddedStatus: { message: "\u30C9\u30E1\u30A4\u30F3\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F" },
    contextCleanSelection: { message: "\u9078\u629E\u3057\u305F\u30C6\u30AD\u30B9\u30C8\u3092\u30AF\u30EA\u30FC\u30CB\u30F3\u30B0" },
    contextPasteCleaned: { message: "\u30AF\u30EA\u30FC\u30CB\u30F3\u30B0\u3057\u305F\u30C6\u30AD\u30B9\u30C8\u3092\u8CBC\u308A\u4ED8\u3051" }
  };

  // _locales/ko/messages.json
  var messages_default9 = {
    appName: { message: "AI \uD0C0\uC774\uD3EC\uADF8\uB798\uD53C \uC815\uB9AC \uB3C4\uAD6C" },
    appDescription: { message: "\uBCF5\uC0AC\uD560 \uB54C AI \uD14D\uC2A4\uD2B8\uC758 \uC778\uC1C4\uC6A9 \uBB38\uC790\uB97C \uC77C\uBC18 \uD0A4\uBCF4\uB4DC \uBB38\uC790\uB85C \uBC14\uAFC9\uB2C8\uB2E4." },
    popupPasteLabel: { message: "\uD14D\uC2A4\uD2B8 \uBD99\uC5EC\uB123\uAE30" },
    popupInputPlaceholder: { message: "\uC5EC\uAE30\uC5D0 \uD14D\uC2A4\uD2B8\uB97C \uBD99\uC5EC\uB123\uC73C\uC138\uC694..." },
    cleanButton: { message: "\uC815\uB9AC" },
    copyButton: { message: "\uBCF5\uC0AC" },
    resultLabel: { message: "\uACB0\uACFC" },
    settingsLink: { message: "\uC124\uC815" },
    copiedStatus: { message: "\uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4!" },
    optionsTitle: { message: "AI \uD0C0\uC774\uD3EC\uADF8\uB798\uD53C \uC815\uB9AC \uB3C4\uAD6C \u2014 \uC124\uC815" },
    themeHeading: { message: "\uBAA8\uC591" },
    themeLabel: { message: "\uD14C\uB9C8" },
    themeSystem: { message: "\uC2DC\uC2A4\uD15C" },
    themeLight: { message: "\uBC1D\uAC8C" },
    themeDark: { message: "\uC5B4\uB461\uAC8C" },
    languageLabel: { message: "\uC5B8\uC5B4" },
    languageAuto: { message: "\uC790\uB3D9 (\uBE0C\uB77C\uC6B0\uC800 \uC5B8\uC5B4 \uC0AC\uC6A9)" },
    rulesHeading: { message: "\uADDC\uCE59 \uADF8\uB8F9" },
    quotesRule: { message: `\uB530\uC634\uD45C (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " \uBC0F ')` },
    dashesRule: { message: "\uB300\uC2DC (\u2014 / \u2013 \u2192 \uD558\uC774\uD508)" },
    dashModeSpaced: { message: '" - " (\uACF5\uBC31 \uD3EC\uD568)' },
    dashModeTight: { message: '"-" (\uACF5\uBC31 \uC5C6\uC74C)' },
    dashModeComma: { message: '", " (\uC27C\uD45C)' },
    ellipsisRule: { message: "\uC904\uC784\uD45C (\u2026 \u2192 ...)" },
    spacesRule: { message: "\uD2B9\uC218 \uACF5\uBC31 \u2192 \uC77C\uBC18 \uACF5\uBC31" },
    invisiblesRule: { message: "\uBCF4\uC774\uC9C0 \uC54A\uB294 \uBB38\uC790 \uC81C\uAC70" },
    miscRule: { message: "\uAE30\uD0C0 (\uB9C8\uC774\uB108\uC2A4, \uAE00\uBA38\uB9AC \uAE30\uD638, \uD654\uC0B4\uD45C, \xD7, \uD504\uB77C\uC784)" },
    emojisRule: { message: "\uC774\uBAA8\uC9C0 \uC81C\uAC70 (\u{1F600}, \uAD6D\uAE30, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "\uC5F0\uC18D\uB41C \uACF5\uBC31 \uC904\uC774\uAE30" },
    whitelistTitle: { message: "\uD5C8\uC6A9\uB41C \uC6F9\uC0AC\uC774\uD2B8" },
    whitelistDescription: { message: "\uBCF5\uC0AC \uC2DC \uC790\uB3D9 \uC815\uB9AC(Ctrl+C)\uB294 \uC774 \uC6F9\uC0AC\uC774\uD2B8\uC5D0\uC11C\uB9CC \uC791\uB3D9\uD569\uB2C8\uB2E4." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\uCD94\uAC00" },
    savedStatus: { message: "\uC800\uC7A5\uB428" },
    invalidDomainStatus: { message: "\uC798\uBABB\uB41C \uB3C4\uBA54\uC778\uC785\uB2C8\uB2E4" },
    duplicateDomainStatus: { message: "\uC774\uBBF8 \uBAA9\uB85D\uC5D0 \uC788\uB294 \uB3C4\uBA54\uC778\uC785\uB2C8\uB2E4" },
    permissionDeniedStatus: { message: "\uAD8C\uD55C\uC774 \uBD80\uC5EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4" },
    domainAddedStatus: { message: "\uB3C4\uBA54\uC778\uC744 \uCD94\uAC00\uD588\uC2B5\uB2C8\uB2E4" },
    contextCleanSelection: { message: "\uC120\uD0DD\uD55C \uD14D\uC2A4\uD2B8 \uC815\uB9AC" },
    contextPasteCleaned: { message: "\uC815\uB9AC\uB41C \uD14D\uC2A4\uD2B8 \uBD99\uC5EC\uB123\uAE30" }
  };

  // _locales/nl/messages.json
  var messages_default10 = {
    appName: { message: "AI-typografie opschonen" },
    appDescription: { message: "Vervangt typografische AI-tekens bij het kopi\xEBren door gewone toetsenbordtekens." },
    popupPasteLabel: { message: "Tekst plakken" },
    popupInputPlaceholder: { message: "Plak de tekst hier..." },
    cleanButton: { message: "Opschonen" },
    copyButton: { message: "Kopi\xEBren" },
    resultLabel: { message: "Resultaat" },
    settingsLink: { message: "Instellingen" },
    copiedStatus: { message: "Gekopieerd!" },
    optionsTitle: { message: "AI-typografie opschonen \u2014 Instellingen" },
    themeHeading: { message: "Weergave" },
    themeLabel: { message: "Thema" },
    themeSystem: { message: "Systeem" },
    themeLight: { message: "Licht" },
    themeDark: { message: "Donker" },
    languageLabel: { message: "Taal" },
    languageAuto: { message: "Automatisch (taal van de browser)" },
    rulesHeading: { message: "Regelgroepen" },
    quotesRule: { message: `Aanhalingstekens (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " en ')` },
    dashesRule: { message: "Gedachtestreepjes (\u2014 / \u2013 \u2192 koppelteken)" },
    dashModeSpaced: { message: '" - " (met spaties)' },
    dashModeTight: { message: '"-" (zonder spaties)' },
    dashModeComma: { message: '", " (komma)' },
    ellipsisRule: { message: "Beletselteken (\u2026 \u2192 ...)" },
    spacesRule: { message: "Speciale spaties \u2192 gewone spaties" },
    invisiblesRule: { message: "Onzichtbare tekens verwijderen" },
    miscRule: { message: "Overig (min, opsommingstekens, pijlen, \xD7, primes)" },
    emojisRule: { message: "Emoji verwijderen (\u{1F600}, vlaggen, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Herhaalde spaties samenvoegen" },
    whitelistTitle: { message: "Toegestane websites" },
    whitelistDescription: { message: "Automatisch opschonen bij kopi\xEBren (Ctrl+C) werkt alleen op deze websites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Toevoegen" },
    savedStatus: { message: "Opgeslagen" },
    invalidDomainStatus: { message: "Ongeldig domein" },
    duplicateDomainStatus: { message: "Domein staat al in de lijst" },
    permissionDeniedStatus: { message: "Geen toestemming verleend" },
    domainAddedStatus: { message: "Domein toegevoegd" },
    contextCleanSelection: { message: "Geselecteerde tekst opschonen" },
    contextPasteCleaned: { message: "Opgeschoonde tekst plakken" }
  };

  // _locales/pl/messages.json
  var messages_default11 = {
    appName: { message: "Czyszczenie typografii AI" },
    appDescription: { message: "Podczas kopiowania zamienia typograficzne znaki AI na zwyk\u0142e znaki z klawiatury." },
    popupPasteLabel: { message: "Wklej tekst" },
    popupInputPlaceholder: { message: "Wklej tutaj tekst..." },
    cleanButton: { message: "Wyczy\u015B\u0107" },
    copyButton: { message: "Kopiuj" },
    resultLabel: { message: "Wynik" },
    settingsLink: { message: "Ustawienia" },
    copiedStatus: { message: "Skopiowano!" },
    optionsTitle: { message: "Czyszczenie typografii AI \u2014 Ustawienia" },
    themeHeading: { message: "Wygl\u0105d" },
    themeLabel: { message: "Motyw" },
    themeSystem: { message: "Systemowy" },
    themeLight: { message: "Jasny" },
    themeDark: { message: "Ciemny" },
    languageLabel: { message: "J\u0119zyk" },
    languageAuto: { message: "Automatycznie (j\u0119zyk przegl\u0105darki)" },
    rulesHeading: { message: "Grupy regu\u0142" },
    quotesRule: { message: `Cudzys\u0142owy (\u201E \u201D \xAB \xBB \u2018 \u2019 \u2192 " i ')` },
    dashesRule: { message: "My\u015Blniki (\u2014 / \u2013 \u2192 \u0142\u0105cznik)" },
    dashModeSpaced: { message: '" - " (ze spacjami)' },
    dashModeTight: { message: '"-" (bez spacji)' },
    dashModeComma: { message: '", " (przecinek)' },
    ellipsisRule: { message: "Wielokropek (\u2026 \u2192 ...)" },
    spacesRule: { message: "Spacje specjalne \u2192 zwyk\u0142e spacje" },
    invisiblesRule: { message: "Usu\u0144 niewidoczne znaki" },
    miscRule: { message: "Inne (minus, wypunktowania, strza\u0142ki, \xD7, primy)" },
    emojisRule: { message: "Usu\u0144 emoji (\u{1F600}, flagi, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Scal powtarzaj\u0105ce si\u0119 spacje" },
    whitelistTitle: { message: "Dozwolone witryny" },
    whitelistDescription: { message: "Automatyczne czyszczenie podczas kopiowania (Ctrl+C) dzia\u0142a tylko w tych witrynach." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Dodaj" },
    savedStatus: { message: "Zapisano" },
    invalidDomainStatus: { message: "Nieprawid\u0142owa domena" },
    duplicateDomainStatus: { message: "Domena jest ju\u017C na li\u015Bcie" },
    permissionDeniedStatus: { message: "Nie przyznano uprawnie\u0144" },
    domainAddedStatus: { message: "Dodano domen\u0119" },
    contextCleanSelection: { message: "Wyczy\u015B\u0107 zaznaczony tekst" },
    contextPasteCleaned: { message: "Wklej wyczyszczony tekst" }
  };

  // _locales/pt_BR/messages.json
  var messages_default12 = {
    appName: { message: "Limpador tipogr\xE1fico de IA" },
    appDescription: { message: "Substitui caracteres tipogr\xE1ficos de textos gerados por IA por equivalentes simples ao copiar." },
    popupPasteLabel: { message: "Cole o texto" },
    popupInputPlaceholder: { message: "Cole o texto aqui..." },
    cleanButton: { message: "Limpar" },
    copyButton: { message: "Copiar" },
    resultLabel: { message: "Resultado" },
    settingsLink: { message: "Configura\xE7\xF5es" },
    copiedStatus: { message: "Copiado!" },
    optionsTitle: { message: "Limpador tipogr\xE1fico de IA \u2014 Configura\xE7\xF5es" },
    themeHeading: { message: "Apar\xEAncia" },
    themeLabel: { message: "Tema" },
    themeSystem: { message: "Sistema" },
    themeLight: { message: "Claro" },
    themeDark: { message: "Escuro" },
    languageLabel: { message: "Idioma" },
    languageAuto: { message: "Autom\xE1tico (idioma do navegador)" },
    rulesHeading: { message: "Grupos de regras" },
    quotesRule: { message: `Aspas (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " e ')` },
    dashesRule: { message: "Travess\xF5es (\u2014 / \u2013 \u2192 h\xEDfen)" },
    dashModeSpaced: { message: '" - " (com espa\xE7os)' },
    dashModeTight: { message: '"-" (sem espa\xE7os)' },
    dashModeComma: { message: '", " (v\xEDrgula)' },
    ellipsisRule: { message: "Retic\xEAncias (\u2026 \u2192 ...)" },
    spacesRule: { message: "Espa\xE7os especiais \u2192 espa\xE7os normais" },
    invisiblesRule: { message: "Remover caracteres invis\xEDveis" },
    miscRule: { message: "Outros (menos, marcadores, setas, \xD7, primas)" },
    emojisRule: { message: "Remover emojis (\u{1F600}, bandeiras, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Reduzir espa\xE7os repetidos" },
    whitelistTitle: { message: "Sites permitidos" },
    whitelistDescription: { message: "A limpeza autom\xE1tica ao copiar (Ctrl+C) funciona somente nestes sites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Adicionar" },
    savedStatus: { message: "Salvo" },
    invalidDomainStatus: { message: "Dom\xEDnio inv\xE1lido" },
    duplicateDomainStatus: { message: "O dom\xEDnio j\xE1 est\xE1 na lista" },
    permissionDeniedStatus: { message: "Permiss\xE3o n\xE3o concedida" },
    domainAddedStatus: { message: "Dom\xEDnio adicionado" },
    contextCleanSelection: { message: "Limpar texto selecionado" },
    contextPasteCleaned: { message: "Colar texto limpo" }
  };

  // _locales/pt_PT/messages.json
  var messages_default13 = {
    appName: { message: "Limpeza tipogr\xE1fica de IA" },
    appDescription: { message: "Substitui os caracteres tipogr\xE1ficos de textos de IA por equivalentes simples ao copiar." },
    popupPasteLabel: { message: "Cole o texto" },
    popupInputPlaceholder: { message: "Cole o texto aqui..." },
    cleanButton: { message: "Limpar" },
    copyButton: { message: "Copiar" },
    resultLabel: { message: "Resultado" },
    settingsLink: { message: "Defini\xE7\xF5es" },
    copiedStatus: { message: "Copiado!" },
    optionsTitle: { message: "Limpeza tipogr\xE1fica de IA \u2014 Defini\xE7\xF5es" },
    themeHeading: { message: "Aspeto" },
    themeLabel: { message: "Tema" },
    themeSystem: { message: "Sistema" },
    themeLight: { message: "Claro" },
    themeDark: { message: "Escuro" },
    languageLabel: { message: "Idioma" },
    languageAuto: { message: "Autom\xE1tico (idioma do navegador)" },
    rulesHeading: { message: "Grupos de regras" },
    quotesRule: { message: `Aspas (\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " e ')` },
    dashesRule: { message: "Travess\xF5es (\u2014 / \u2013 \u2192 h\xEDfen)" },
    dashModeSpaced: { message: '" - " (com espa\xE7os)' },
    dashModeTight: { message: '"-" (sem espa\xE7os)' },
    dashModeComma: { message: '", " (v\xEDrgula)' },
    ellipsisRule: { message: "Retic\xEAncias (\u2026 \u2192 ...)" },
    spacesRule: { message: "Espa\xE7os especiais \u2192 espa\xE7os normais" },
    invisiblesRule: { message: "Remover caracteres invis\xEDveis" },
    miscRule: { message: "Outros (menos, marcadores, setas, \xD7, primas)" },
    emojisRule: { message: "Remover emojis (\u{1F600}, bandeiras, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "Reduzir espa\xE7os repetidos" },
    whitelistTitle: { message: "Sites permitidos" },
    whitelistDescription: { message: "A limpeza autom\xE1tica ao copiar (Ctrl+C) funciona apenas nestes sites." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "Adicionar" },
    savedStatus: { message: "Guardado" },
    invalidDomainStatus: { message: "Dom\xEDnio inv\xE1lido" },
    duplicateDomainStatus: { message: "O dom\xEDnio j\xE1 est\xE1 na lista" },
    permissionDeniedStatus: { message: "Permiss\xE3o n\xE3o concedida" },
    domainAddedStatus: { message: "Dom\xEDnio adicionado" },
    contextCleanSelection: { message: "Limpar texto selecionado" },
    contextPasteCleaned: { message: "Colar texto limpo" }
  };

  // _locales/ru/messages.json
  var messages_default14 = {
    appName: { message: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0438 \u0418\u0418" },
    appDescription: { message: "\u0417\u0430\u043C\u0435\u043D\u044F\u0435\u0442 \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0441\u043A\u0438\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B \u0442\u0435\u043A\u0441\u0442\u0430 \u0418\u0418 \u043D\u0430 \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438." },
    popupPasteLabel: { message: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442" },
    popupInputPlaceholder: { message: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u044E\u0434\u0430..." },
    cleanButton: { message: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C" },
    copyButton: { message: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C" },
    resultLabel: { message: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442" },
    settingsLink: { message: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438" },
    copiedStatus: { message: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E!" },
    optionsTitle: { message: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0438 \u0418\u0418 \u2014 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438" },
    themeHeading: { message: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435" },
    themeLabel: { message: "\u0422\u0435\u043C\u0430" },
    themeSystem: { message: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F" },
    themeLight: { message: "\u0421\u0432\u0435\u0442\u043B\u0430\u044F" },
    themeDark: { message: "\u0422\u0451\u043C\u043D\u0430\u044F" },
    languageLabel: { message: "\u042F\u0437\u044B\u043A" },
    languageAuto: { message: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (\u043F\u043E \u044F\u0437\u044B\u043A\u0443 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430)" },
    rulesHeading: { message: "\u0413\u0440\u0443\u043F\u043F\u044B \u043F\u0440\u0430\u0432\u0438\u043B" },
    quotesRule: { message: `\u041A\u0430\u0432\u044B\u0447\u043A\u0438 (\xAB \xBB \u201E \u201C \u2018 \u2019 \u2039 \u203A \u2192 " \u0438 ')` },
    dashesRule: { message: "\u0422\u0438\u0440\u0435 (\u2014 / \u2013 \u2192 \u0434\u0435\u0444\u0438\u0441)" },
    dashModeSpaced: { message: '" - " (\u0441 \u043F\u0440\u043E\u0431\u0435\u043B\u0430\u043C\u0438)' },
    dashModeTight: { message: '"-" (\u0431\u0435\u0437 \u043F\u0440\u043E\u0431\u0435\u043B\u043E\u0432)' },
    dashModeComma: { message: '", " (\u0437\u0430\u043F\u044F\u0442\u0430\u044F)' },
    ellipsisRule: { message: "\u041C\u043D\u043E\u0433\u043E\u0442\u043E\u0447\u0438\u0435 (\u2026 \u2192 ...)" },
    spacesRule: { message: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u043E\u0431\u0435\u043B\u044B \u2192 \u043E\u0431\u044B\u0447\u043D\u044B\u0435" },
    invisiblesRule: { message: "\u0423\u0434\u0430\u043B\u044F\u0442\u044C \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B" },
    miscRule: { message: "\u041F\u0440\u043E\u0447\u0435\u0435 (\u043C\u0438\u043D\u0443\u0441, \u043C\u0430\u0440\u043A\u0435\u0440\u044B, \u0441\u0442\u0440\u0435\u043B\u043A\u0438, \xD7, \u0448\u0442\u0440\u0438\u0445\u0438)" },
    emojisRule: { message: "\u0423\u0434\u0430\u043B\u044F\u0442\u044C \u044D\u043C\u043E\u0434\u0437\u0438 (\u{1F600}, \u0444\u043B\u0430\u0433\u0438, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "\u0421\u0445\u043B\u043E\u043F\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u044E\u0449\u0438\u0435\u0441\u044F \u043F\u0440\u043E\u0431\u0435\u043B\u044B" },
    whitelistTitle: { message: "\u0420\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" },
    whitelistDescription: { message: "\u0410\u0432\u0442\u043E\u043E\u0447\u0438\u0441\u0442\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 (Ctrl+C) \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u044D\u0442\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" },
    savedStatus: { message: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E" },
    invalidDomainStatus: { message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0434\u043E\u043C\u0435\u043D" },
    duplicateDomainStatus: { message: "\u0414\u043E\u043C\u0435\u043D \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0432 \u0441\u043F\u0438\u0441\u043A\u0435" },
    permissionDeniedStatus: { message: "\u0414\u043E\u0441\u0442\u0443\u043F \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D" },
    domainAddedStatus: { message: "\u0414\u043E\u043C\u0435\u043D \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D" },
    contextCleanSelection: { message: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442" },
    contextPasteCleaned: { message: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442" },
    notificationsHeading: { message: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F" },
    showToastLabel: { message: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435" },
    showBreakdownLabel: { message: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u0431\u0438\u0432\u043A\u0443 \u043F\u043E \u0433\u0440\u0443\u043F\u043F\u0430\u043C" },
    toastTitle: { message: "\u041E\u0447\u0438\u0449\u0435\u043D\u043E: {count} {unit}" },
    toastAndMore: { message: "\u0438 \u0435\u0449\u0451 {count}" },
    toastUnitCharacterOne: { message: "\u0441\u0438\u043C\u0432\u043E\u043B" },
    toastUnitCharacterFew: { message: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430" },
    toastUnitCharacterMany: { message: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" },
    toastUnitQuotesOne: { message: "\u043A\u0430\u0432\u044B\u0447\u043A\u0430" },
    toastUnitQuotesFew: { message: "\u043A\u0430\u0432\u044B\u0447\u043A\u0438" },
    toastUnitQuotesMany: { message: "\u043A\u0430\u0432\u044B\u0447\u0435\u043A" },
    toastUnitDashesOne: { message: "\u0442\u0438\u0440\u0435" },
    toastUnitDashesFew: { message: "\u0442\u0438\u0440\u0435" },
    toastUnitDashesMany: { message: "\u0442\u0438\u0440\u0435" },
    toastUnitEllipsisOne: { message: "\u043C\u043D\u043E\u0433\u043E\u0442\u043E\u0447\u0438\u0435" },
    toastUnitEllipsisFew: { message: "\u043C\u043D\u043E\u0433\u043E\u0442\u043E\u0447\u0438\u044F" },
    toastUnitEllipsisMany: { message: "\u043C\u043D\u043E\u0433\u043E\u0442\u043E\u0447\u0438\u0439" },
    toastUnitSpacesOne: { message: "\u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0431\u0435\u043B" },
    toastUnitSpacesFew: { message: "\u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0431\u0435\u043B\u0430" },
    toastUnitSpacesMany: { message: "\u0441\u043F\u0435\u0446\u043F\u0440\u043E\u0431\u0435\u043B\u043E\u0432" },
    toastUnitInvisiblesOne: { message: "\u043D\u0435\u0432\u0438\u0434\u0438\u043C\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B" },
    toastUnitInvisiblesFew: { message: "\u043D\u0435\u0432\u0438\u0434\u0438\u043C\u044B\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u0430" },
    toastUnitInvisiblesMany: { message: "\u043D\u0435\u0432\u0438\u0434\u0438\u043C\u044B\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" },
    toastUnitMinusOne: { message: "\u043C\u0438\u043D\u0443\u0441" },
    toastUnitMinusFew: { message: "\u043C\u0438\u043D\u0443\u0441\u0430" },
    toastUnitMinusMany: { message: "\u043C\u0438\u043D\u0443\u0441\u043E\u0432" },
    toastUnitArrowsOne: { message: "\u0441\u0442\u0440\u0435\u043B\u043A\u0430" },
    toastUnitArrowsFew: { message: "\u0441\u0442\u0440\u0435\u043B\u043A\u0438" },
    toastUnitArrowsMany: { message: "\u0441\u0442\u0440\u0435\u043B\u043E\u043A" },
    toastUnitBulletsOne: { message: "\u043C\u0430\u0440\u043A\u0435\u0440" },
    toastUnitBulletsFew: { message: "\u043C\u0430\u0440\u043A\u0435\u0440\u0430" },
    toastUnitBulletsMany: { message: "\u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432" },
    toastUnitSymbolsOne: { message: "\u0437\u043D\u0430\u043A" },
    toastUnitSymbolsFew: { message: "\u0437\u043D\u0430\u043A\u0430" },
    toastUnitSymbolsMany: { message: "\u0437\u043D\u0430\u043A\u043E\u0432" }
  };

  // _locales/uk/messages.json
  var messages_default15 = {
    appName: { message: "\u041E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0456\u043A\u0438 \u0428\u0406" },
    appDescription: { message: "\u0417\u0430\u043C\u0456\u043D\u044E\u0454 \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0441\u044C\u043A\u0456 \u0441\u0438\u043C\u0432\u043E\u043B\u0438 \u0442\u0435\u043A\u0441\u0442\u0443 \u0428\u0406 \u043D\u0430 \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0456 \u043F\u0456\u0434 \u0447\u0430\u0441 \u043A\u043E\u043F\u0456\u044E\u0432\u0430\u043D\u043D\u044F." },
    popupPasteLabel: { message: "\u0412\u0441\u0442\u0430\u0432\u0442\u0435 \u0442\u0435\u043A\u0441\u0442" },
    popupInputPlaceholder: { message: "\u0412\u0441\u0442\u0430\u0432\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u044E\u0434\u0438..." },
    cleanButton: { message: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438" },
    copyButton: { message: "\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438" },
    resultLabel: { message: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442" },
    settingsLink: { message: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F" },
    copiedStatus: { message: "\u0421\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E!" },
    optionsTitle: { message: "\u041E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0456\u043A\u0438 \u0428\u0406 \u2014 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F" },
    themeHeading: { message: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u043D\u044F" },
    themeLabel: { message: "\u0422\u0435\u043C\u0430" },
    themeSystem: { message: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430" },
    themeLight: { message: "\u0421\u0432\u0456\u0442\u043B\u0430" },
    themeDark: { message: "\u0422\u0435\u043C\u043D\u0430" },
    languageLabel: { message: "\u041C\u043E\u0432\u0430" },
    languageAuto: { message: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E (\u0437\u0430 \u043C\u043E\u0432\u043E\u044E \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430)" },
    rulesHeading: { message: "\u0413\u0440\u0443\u043F\u0438 \u043F\u0440\u0430\u0432\u0438\u043B" },
    quotesRule: { message: `\u041B\u0430\u043F\u043A\u0438 (\xAB \xBB \u201E \u201C \u2018 \u2019 \u2039 \u203A \u2192 " \u0456 ')` },
    dashesRule: { message: "\u0422\u0438\u0440\u0435 (\u2014 / \u2013 \u2192 \u0434\u0435\u0444\u0456\u0441)" },
    dashModeSpaced: { message: '" - " (\u0456\u0437 \u043F\u0440\u043E\u0431\u0456\u043B\u0430\u043C\u0438)' },
    dashModeTight: { message: '"-" (\u0431\u0435\u0437 \u043F\u0440\u043E\u0431\u0456\u043B\u0456\u0432)' },
    dashModeComma: { message: '", " (\u043A\u043E\u043C\u0430)' },
    ellipsisRule: { message: "\u0411\u0430\u0433\u0430\u0442\u043E\u043A\u0440\u0430\u043F\u043A\u0430 (\u2026 \u2192 ...)" },
    spacesRule: { message: "\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0456 \u043F\u0440\u043E\u0431\u0456\u043B\u0438 \u2192 \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0456" },
    invisiblesRule: { message: "\u0412\u0438\u0434\u0430\u043B\u044F\u0442\u0438 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u0456 \u0441\u0438\u043C\u0432\u043E\u043B\u0438" },
    miscRule: { message: "\u0406\u043D\u0448\u0435 (\u043C\u0456\u043D\u0443\u0441, \u043C\u0430\u0440\u043A\u0435\u0440\u0438, \u0441\u0442\u0440\u0456\u043B\u043A\u0438, \xD7, \u0448\u0442\u0440\u0438\u0445\u0438)" },
    emojisRule: { message: "\u0412\u0438\u0434\u0430\u043B\u044F\u0442\u0438 \u0435\u043C\u043E\u0434\u0437\u0456 (\u{1F600}, \u043F\u0440\u0430\u043F\u043E\u0440\u0438, \xA9/\xAE/\u2122)" },
    collapseSpacesRule: { message: "\u0417\u0433\u043E\u0440\u0442\u0430\u0442\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0456 \u043F\u0440\u043E\u0431\u0456\u043B\u0438" },
    whitelistTitle: { message: "\u0414\u043E\u0437\u0432\u043E\u043B\u0435\u043D\u0456 \u0441\u0430\u0439\u0442\u0438" },
    whitelistDescription: { message: "\u0410\u0432\u0442\u043E\u043E\u0447\u0438\u0449\u0435\u043D\u043D\u044F \u043F\u0456\u0434 \u0447\u0430\u0441 \u043A\u043E\u043F\u0456\u044E\u0432\u0430\u043D\u043D\u044F (Ctrl+C) \u043F\u0440\u0430\u0446\u044E\u0454 \u043B\u0438\u0448\u0435 \u043D\u0430 \u0446\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445." },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u0414\u043E\u0434\u0430\u0442\u0438" },
    savedStatus: { message: "\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E" },
    invalidDomainStatus: { message: "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u0434\u043E\u043C\u0435\u043D" },
    duplicateDomainStatus: { message: "\u0414\u043E\u043C\u0435\u043D \u0443\u0436\u0435 \u0454 \u0443 \u0441\u043F\u0438\u0441\u043A\u0443" },
    permissionDeniedStatus: { message: "\u0414\u043E\u0441\u0442\u0443\u043F \u043D\u0435 \u043D\u0430\u0434\u0430\u043D\u043E" },
    domainAddedStatus: { message: "\u0414\u043E\u043C\u0435\u043D \u0434\u043E\u0434\u0430\u043D\u043E" },
    contextCleanSelection: { message: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442" },
    contextPasteCleaned: { message: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043E\u0447\u0438\u0449\u0435\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442" }
  };

  // _locales/zh_CN/messages.json
  var messages_default16 = {
    appName: { message: "AI \u6392\u7248\u6E05\u7406\u5668" },
    appDescription: { message: "\u590D\u5236\u65F6\u5C06 AI \u6587\u672C\u4E2D\u7684\u6392\u7248\u5B57\u7B26\u66FF\u6362\u4E3A\u666E\u901A\u952E\u76D8\u5B57\u7B26\u3002" },
    popupPasteLabel: { message: "\u7C98\u8D34\u6587\u672C" },
    popupInputPlaceholder: { message: "\u5728\u6B64\u7C98\u8D34\u6587\u672C..." },
    cleanButton: { message: "\u6E05\u7406" },
    copyButton: { message: "\u590D\u5236" },
    resultLabel: { message: "\u7ED3\u679C" },
    settingsLink: { message: "\u8BBE\u7F6E" },
    copiedStatus: { message: "\u5DF2\u590D\u5236\uFF01" },
    optionsTitle: { message: "AI \u6392\u7248\u6E05\u7406\u5668 \u2014 \u8BBE\u7F6E" },
    themeHeading: { message: "\u5916\u89C2" },
    themeLabel: { message: "\u4E3B\u9898" },
    themeSystem: { message: "\u8DDF\u968F\u7CFB\u7EDF" },
    themeLight: { message: "\u6D45\u8272" },
    themeDark: { message: "\u6DF1\u8272" },
    languageLabel: { message: "\u8BED\u8A00" },
    languageAuto: { message: "\u81EA\u52A8\uFF08\u6839\u636E\u6D4F\u89C8\u5668\u8BED\u8A00\uFF09" },
    rulesHeading: { message: "\u89C4\u5219\u7EC4" },
    quotesRule: { message: `\u5F15\u53F7\uFF08\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " \u548C '\uFF09` },
    dashesRule: { message: "\u7834\u6298\u53F7\uFF08\u2014 / \u2013 \u2192 \u8FDE\u5B57\u7B26\uFF09" },
    dashModeSpaced: { message: '" - "\uFF08\u5E26\u7A7A\u683C\uFF09' },
    dashModeTight: { message: '"-"\uFF08\u4E0D\u5E26\u7A7A\u683C\uFF09' },
    dashModeComma: { message: '", "\uFF08\u9017\u53F7\uFF09' },
    ellipsisRule: { message: "\u7701\u7565\u53F7\uFF08\u2026 \u2192 ...\uFF09" },
    spacesRule: { message: "\u7279\u6B8A\u7A7A\u683C \u2192 \u666E\u901A\u7A7A\u683C" },
    invisiblesRule: { message: "\u5220\u9664\u4E0D\u53EF\u89C1\u5B57\u7B26" },
    miscRule: { message: "\u5176\u4ED6\uFF08\u51CF\u53F7\u3001\u9879\u76EE\u7B26\u53F7\u3001\u7BAD\u5934\u3001\xD7\u3001\u6487\u53F7\uFF09" },
    emojisRule: { message: "\u5220\u9664\u8868\u60C5\u7B26\u53F7\uFF08\u{1F600}\u3001\u65D7\u5E1C\u3001\xA9/\xAE/\u2122\uFF09" },
    collapseSpacesRule: { message: "\u5408\u5E76\u91CD\u590D\u7A7A\u683C" },
    whitelistTitle: { message: "\u5141\u8BB8\u7684\u7F51\u7AD9" },
    whitelistDescription: { message: "\u4EC5\u5728\u8FD9\u4E9B\u7F51\u7AD9\u4E0A\u542F\u7528\u590D\u5236\u65F6\u81EA\u52A8\u6E05\u7406\uFF08Ctrl+C\uFF09\u3002" },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u6DFB\u52A0" },
    savedStatus: { message: "\u5DF2\u4FDD\u5B58" },
    invalidDomainStatus: { message: "\u57DF\u540D\u65E0\u6548" },
    duplicateDomainStatus: { message: "\u57DF\u540D\u5DF2\u5728\u5217\u8868\u4E2D" },
    permissionDeniedStatus: { message: "\u672A\u6388\u4E88\u6743\u9650" },
    domainAddedStatus: { message: "\u5DF2\u6DFB\u52A0\u57DF\u540D" },
    contextCleanSelection: { message: "\u6E05\u7406\u6240\u9009\u6587\u672C" },
    contextPasteCleaned: { message: "\u7C98\u8D34\u6E05\u7406\u540E\u7684\u6587\u672C" }
  };

  // _locales/zh_TW/messages.json
  var messages_default17 = {
    appName: { message: "AI \u6392\u7248\u6E05\u7406\u5DE5\u5177" },
    appDescription: { message: "\u8907\u88FD\u6642\u5C07 AI \u6587\u5B57\u4E2D\u7684\u6392\u7248\u5B57\u5143\u66FF\u63DB\u70BA\u4E00\u822C\u9375\u76E4\u5B57\u5143\u3002" },
    popupPasteLabel: { message: "\u8CBC\u4E0A\u6587\u5B57" },
    popupInputPlaceholder: { message: "\u5728\u6B64\u8CBC\u4E0A\u6587\u5B57..." },
    cleanButton: { message: "\u6E05\u7406" },
    copyButton: { message: "\u8907\u88FD" },
    resultLabel: { message: "\u7D50\u679C" },
    settingsLink: { message: "\u8A2D\u5B9A" },
    copiedStatus: { message: "\u5DF2\u8907\u88FD\uFF01" },
    optionsTitle: { message: "AI \u6392\u7248\u6E05\u7406\u5DE5\u5177 \u2014 \u8A2D\u5B9A" },
    themeHeading: { message: "\u5916\u89C0" },
    themeLabel: { message: "\u4F48\u666F\u4E3B\u984C" },
    themeSystem: { message: "\u7CFB\u7D71" },
    themeLight: { message: "\u6DFA\u8272" },
    themeDark: { message: "\u6DF1\u8272" },
    languageLabel: { message: "\u8A9E\u8A00" },
    languageAuto: { message: "\u81EA\u52D5\uFF08\u4F9D\u700F\u89BD\u5668\u8A9E\u8A00\uFF09" },
    rulesHeading: { message: "\u898F\u5247\u7FA4\u7D44" },
    quotesRule: { message: `\u5F15\u865F\uFF08\u201C \u201D \u201E \xAB \xBB \u2018 \u2019 \u2192 " \u548C '\uFF09` },
    dashesRule: { message: "\u7834\u6298\u865F\uFF08\u2014 / \u2013 \u2192 \u9023\u5B57\u865F\uFF09" },
    dashModeSpaced: { message: '" - "\uFF08\u542B\u7A7A\u683C\uFF09' },
    dashModeTight: { message: '"-"\uFF08\u4E0D\u542B\u7A7A\u683C\uFF09' },
    dashModeComma: { message: '", "\uFF08\u9017\u865F\uFF09' },
    ellipsisRule: { message: "\u522A\u7BC0\u865F\uFF08\u2026 \u2192 ...\uFF09" },
    spacesRule: { message: "\u7279\u6B8A\u7A7A\u683C \u2192 \u4E00\u822C\u7A7A\u683C" },
    invisiblesRule: { message: "\u79FB\u9664\u4E0D\u53EF\u898B\u5B57\u5143" },
    miscRule: { message: "\u5176\u4ED6\uFF08\u6E1B\u865F\u3001\u9805\u76EE\u7B26\u865F\u3001\u7BAD\u982D\u3001\xD7\u3001\u6487\u865F\uFF09" },
    emojisRule: { message: "\u79FB\u9664\u8868\u60C5\u7B26\u865F\uFF08\u{1F600}\u3001\u65D7\u5E5F\u3001\xA9/\xAE/\u2122\uFF09" },
    collapseSpacesRule: { message: "\u5408\u4F75\u91CD\u8907\u7A7A\u683C" },
    whitelistTitle: { message: "\u5141\u8A31\u7684\u7DB2\u7AD9" },
    whitelistDescription: { message: "\u50C5\u5728\u9019\u4E9B\u7DB2\u7AD9\u4E0A\u555F\u7528\u8907\u88FD\u6642\u81EA\u52D5\u6E05\u7406\uFF08Ctrl+C\uFF09\u3002" },
    domainPlaceholder: { message: "example.com" },
    addDomainButton: { message: "\u65B0\u589E" },
    savedStatus: { message: "\u5DF2\u5132\u5B58" },
    invalidDomainStatus: { message: "\u7DB2\u57DF\u7121\u6548" },
    duplicateDomainStatus: { message: "\u7DB2\u57DF\u5DF2\u5728\u6E05\u55AE\u4E2D" },
    permissionDeniedStatus: { message: "\u672A\u6388\u4E88\u6B0A\u9650" },
    domainAddedStatus: { message: "\u5DF2\u65B0\u589E\u7DB2\u57DF" },
    contextCleanSelection: { message: "\u6E05\u7406\u9078\u53D6\u7684\u6587\u5B57" },
    contextPasteCleaned: { message: "\u8CBC\u4E0A\u6E05\u7406\u5F8C\u7684\u6587\u5B57" }
  };

  // src/shared/i18n.ts
  var SUPPORTED_LANGUAGES = [
    "en",
    "ru",
    "uk",
    "he",
    "de",
    "fr",
    "es",
    "it",
    "pt_BR",
    "pt_PT",
    "nl",
    "pl",
    "zh_CN",
    "zh_TW",
    "ja",
    "ko",
    "hi"
  ];
  var DEFAULT_LANGUAGE = "auto";
  var CATALOGS = {
    en: messages_default2,
    ru: messages_default14,
    uk: messages_default15,
    he: messages_default5,
    de: messages_default,
    fr: messages_default4,
    es: messages_default3,
    it: messages_default7,
    pt_BR: messages_default12,
    pt_PT: messages_default13,
    nl: messages_default10,
    pl: messages_default11,
    zh_CN: messages_default16,
    zh_TW: messages_default17,
    ja: messages_default8,
    ko: messages_default9,
    hi: messages_default6
  };
  function isSupportedLanguage(value) {
    return SUPPORTED_LANGUAGES.includes(value);
  }
  function normalizeBrowserLanguage(uiLanguage) {
    const normalized = uiLanguage.toLowerCase().replace(/-/g, "_");
    if (isSupportedLanguage(normalized)) return normalized;
    if (normalized === "iw") return "he";
    if (normalized.startsWith("zh")) {
      return normalized.includes("tw") || normalized.includes("hant") || normalized.includes("hk") ? "zh_TW" : "zh_CN";
    }
    if (normalized.startsWith("pt")) {
      return normalized.includes("br") ? "pt_BR" : "pt_PT";
    }
    const base = normalized.split("_")[0] ?? "";
    return isSupportedLanguage(base) ? base : "en";
  }
  function resolveLanguage(setting) {
    if (setting === "auto") return normalizeBrowserLanguage(import_webextension_polyfill.default.i18n.getUILanguage());
    return setting;
  }
  function getMessage(language, key, substitutions) {
    const raw = CATALOGS[language]?.[key]?.message ?? CATALOGS.en[key]?.message ?? key;
    if (!substitutions) return raw;
    return raw.replace(/\{(\w+)\}/g, (match, token) => substitutions[token] ?? match);
  }
  function plural(n, forms) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return forms[2];
    if (mod10 === 1) return forms[0];
    if (mod10 >= 2 && mod10 <= 4) return forms[1];
    return forms[2];
  }
  function localizeDocument(language) {
    document.documentElement.lang = language.replace("_", "-");
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = getMessage(language, element.dataset.i18n ?? "");
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = getMessage(language, element.dataset.i18nPlaceholder ?? "");
    });
  }

  // src/shared/settings.ts
  var import_webextension_polyfill2 = __toESM(require_browser_polyfill(), 1);

  // src/shared/theme.ts
  var DEFAULT_THEME = "system";
  function applyTheme(theme) {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  // src/shared/settings.ts
  var DEFAULT_WHITELIST = ["chatgpt.com", "claude.ai", "gemini.google.com"];
  var DEFAULT_SHOW_TOAST = true;
  var DEFAULT_SHOW_BREAKDOWN = true;
  var defaultSettings = {
    options: defaultOptions,
    whitelist: DEFAULT_WHITELIST,
    theme: DEFAULT_THEME,
    language: DEFAULT_LANGUAGE,
    showToast: DEFAULT_SHOW_TOAST,
    showBreakdown: DEFAULT_SHOW_BREAKDOWN
  };
  async function getSettings() {
    const stored = await import_webextension_polyfill2.default.storage.sync.get(
      defaultSettings
    );
    return {
      options: { ...defaultOptions, ...stored.options },
      whitelist: stored.whitelist ?? DEFAULT_WHITELIST,
      theme: stored.theme ?? DEFAULT_THEME,
      language: stored.language ?? DEFAULT_LANGUAGE,
      showToast: stored.showToast ?? DEFAULT_SHOW_TOAST,
      showBreakdown: stored.showBreakdown ?? DEFAULT_SHOW_BREAKDOWN
    };
  }

  // src/shared/toastMessages.ts
  function unit(language, base, n) {
    const forms = [
      getMessage(language, `${base}One`),
      getMessage(language, `${base}Few`),
      getMessage(language, `${base}Many`)
    ];
    if (language === "ru") return plural(n, forms);
    return n === 1 ? forms[0] : forms[2];
  }
  function formatToastTitle(language, total) {
    return getMessage(language, "toastTitle", {
      count: String(total),
      unit: unit(language, "toastUnitCharacter", total)
    });
  }
  var GROUP_ORDER = [
    { key: "quotes", base: "toastUnitQuotes" },
    { key: "dashes", base: "toastUnitDashes" },
    { key: "ellipsis", base: "toastUnitEllipsis" },
    { key: "spaces", base: "toastUnitSpaces" },
    { key: "invisibles", base: "toastUnitInvisibles" },
    { key: "minus", base: "toastUnitMinus" },
    { key: "arrows", base: "toastUnitArrows" },
    { key: "bullets", base: "toastUnitBullets" },
    { key: "symbols", base: "toastUnitSymbols" }
  ];
  var MAX_VISIBLE_GROUPS = 3;
  function formatToastBreakdown(language, stats) {
    const nonZero = GROUP_ORDER.filter(({ key }) => stats.byGroup[key] > 0).sort(
      (a, b) => stats.byGroup[b.key] - stats.byGroup[a.key]
    );
    const visible = nonZero.slice(0, MAX_VISIBLE_GROUPS);
    const rest = nonZero.slice(MAX_VISIBLE_GROUPS);
    const parts = visible.map(
      ({ key, base }) => `${stats.byGroup[key]} ${unit(language, base, stats.byGroup[key])}`
    );
    if (rest.length > 0) {
      const restTotal = rest.reduce((sum, { key }) => sum + stats.byGroup[key], 0);
      parts.push(getMessage(language, "toastAndMore", { count: String(restTotal) }));
    }
    return parts.join(", ");
  }

  // src/popup/popup.ts
  var activeLanguage = resolveLanguage("auto");
  localizeDocument(activeLanguage);
  var input = document.getElementById("input");
  var output = document.getElementById("output");
  var cleanButton = document.getElementById("clean");
  var copyButton = document.getElementById("copy");
  var status = document.getElementById("status");
  var openOptions = document.getElementById("open-options");
  var counter = document.getElementById("counter");
  var counterTitle = document.getElementById("counter-title");
  var counterBreakdown = document.getElementById("counter-breakdown");
  void getSettings().then((settings) => {
    applyTheme(settings.theme);
    activeLanguage = resolveLanguage(settings.language);
    localizeDocument(activeLanguage);
  });
  openOptions.addEventListener("click", (event) => {
    event.preventDefault();
    void import_webextension_polyfill3.default.runtime.openOptionsPage();
  });
  cleanButton.addEventListener("click", async () => {
    const settings = await getSettings();
    const result = normalize(input.value, settings.options);
    output.value = result.text;
    copyButton.disabled = output.value.length === 0;
    status.textContent = "";
    updateCounter(result.stats, settings.showBreakdown);
  });
  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.value);
    status.textContent = getMessage(activeLanguage, "copiedStatus");
    setTimeout(() => {
      status.textContent = "";
    }, 1500);
  });
  function updateCounter(stats, showBreakdown) {
    try {
      if (stats.total <= 0) {
        counter.hidden = true;
        counterTitle.textContent = "";
        counterBreakdown.textContent = "";
        return;
      }
      counterTitle.textContent = formatToastTitle(activeLanguage, stats.total);
      counterBreakdown.textContent = showBreakdown ? formatToastBreakdown(activeLanguage, stats) : "";
      counter.hidden = false;
    } catch {
      counter.hidden = true;
    }
  }
})();
//# sourceMappingURL=popup.js.map
