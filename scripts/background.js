"use strict";

/// Debug
const logToConsole = true;

/// Global variables
let searchEngines = {};
let searchEnginesArray = [];
let selection = "";
let targetUrl = "";
let lastAddressBarKeyword = "";

/// Constants
const DEFAULT_JSON = "defaultSearchEngines.json";
const besticonAPIUrl = "https://get-besticons.herokuapp.com/icon?url=";
const besticonAPIUrlSuffix = "&size=16..32..128";
const base64ContextSearchIcon =
  "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";

// Constants for translations
const notifyEnableStorageSync = chrome.i18n.getMessage(
  "notifyEnableStorageSync"
);
const notifySearchEnginesLoaded = chrome.i18n.getMessage(
  "notifySearchEnginesLoaded"
);
const titleMultipleSearchEngines = chrome.i18n.getMessage(
  "titleMultipleSearchEngines"
);
const titleGoogleSearch = chrome.i18n.getMessage("titleGoogleSearch");
const titleOptions = chrome.i18n.getMessage("titleOptions");
const windowTitle = chrome.i18n.getMessage("windowTitle");
const omniboxDescription = chrome.i18n.getMessage("omniboxDescription");
const notifyUsage = chrome.i18n.getMessage("notifyUsage");
const notifySearchEngineWithKeyword = chrome.i18n.getMessage(
  "notifySearchEngineWithKeyword"
);
const notifyUnknown = chrome.i18n.getMessage("notifyUnknown");
const notifySearchEngineUrlRequired = chrome.i18n.getMessage(
  "notifySearchEngineUrlRequired"
);

/// Preferences - Default settings
let contextsearch_tabMode = "openNewTab";
let contextsearch_optionsMenuLocation = "bottom";
let contextsearch_openSearchResultsInNewTab = true;
let contextsearch_makeNewTabOrWindowActive = false;
let contextsearch_openSearchResultsInNewWindow = false;
let contextsearch_displayFavicons = true;
let contextsearch_cacheFavicons = true;
let contextsearch_forceFaviconsReload = false;
let contextsearch_resetPreferences = false;
let contextsearch_forceSearchEnginesReload = false;
const defaultOptions = {
  options: {
    tabMode: contextsearch_tabMode,
    tabActive: contextsearch_makeNewTabOrWindowActive,
    optionsMenuLocation: contextsearch_optionsMenuLocation,
    cacheFavicons: contextsearch_cacheFavicons,
    displayFavicons: contextsearch_displayFavicons,
    forceSearchEnginesReload: contextsearch_forceSearchEnginesReload,
    resetPreferences: contextsearch_resetPreferences,
    forceFaviconsReload: contextsearch_forceFaviconsReload
  }
}

/// Handle Incoming Messages
// Listen for messages from the content or options script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let id = "";
  let domain = "";
  switch (message.action) {
    case "doSearch":
      id = message.data.id;
      if (logToConsole) console.log("Search engine id: " + id);
      if (id === "multisearch") {
        processMultiTabSearch();
        break;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          if (logToConsole) {
            console.log(chrome.runtime.lastError);
            console.log("Failed to retrieve active tab from current window.");
          }
          return;
        }
        if (logToConsole) console.log(tabs);
        let tabIndex = 0;
        for (let tab of tabs) {
          if (tab.active) {
            if (logToConsole) console.log("Active tab url: " + tab.url);
            tabIndex = tab.index;
            if (logToConsole) console.log("tabIndex: " + tabIndex);
            break;
          }
        }
        searchUsing(id, tabIndex);
      });
      break;
    case "notify":
      notify(message.data);
      break;
    case "setSelection":
      if (logToConsole) console.log(`Selected text: ${message.data}`);
      selection = message.data;
      break;
    case "reset":
      init().then(() => {
        sendResponse("resetCompleted");
      }, onError);
      return true;
    case "sendCurrentTabUrl":
      if (message.data) targetUrl = message.data;
      break;
    case "testSearchEngine":
      testSearchEngine(message.data);
      break;
    case "saveSearchEngines":
      searchEngines = message.data;
      if (logToConsole) console.log(searchEngines);
      saveSearchEnginesToStorageSync(false, true);
      rebuildContextMenu();
      break;
    case "addNewSearchEngine":
      id = message.data.id;
      domain = getDomain(message.data.searchEngine.url);
      if (logToConsole) console.log(id, domain);
      searchEngines[id] = message.data.searchEngine;
      searchEngines = sortByIndex(searchEngines);
      addNewFavicon(id, domain).then(function(value) {
        searchEngines[id]["base64"] = value.base64;
        saveSearchEnginesToStorageSync(false, true);
        rebuildContextMenu();
      }, onError);
      break;
    case "updateCacheFavicons":
      getOptions().then(settings => {
        let options = settings.options;
        if (logToConsole)
          console.log(
            `Preferences retrieved from storage sync: ${JSON.stringify(
              options
            )}`
          );
        options.cacheFavicons = message.data.cacheFavicons;
        setCacheFavicons(options);
        saveOptions(options, false);
      });
      break;
    case "updateDisplayFavicons":
      getOptions().then(settings => {
        let options = settings.options;
        if (logToConsole)
          console.log(
            `Preferences retrieved from storage sync: ${JSON.stringify(
              options
            )}`
          );
        options.displayFavicons = message.data.displayFavicons;
        setDisplayFavicons(options);
        saveOptions(options, true);
      });
      break;
    case "updateTabMode":
      getOptions().then(settings => {
        let options = settings.options;
        if (logToConsole)
          console.log(
            `Preferences retrieved from storage sync: ${JSON.stringify(
              options
            )}`
          );
        options.tabMode = message.data.tabMode;
        options.tabActive = message.data.tabActive;
        setTabMode(options);
        saveOptions(options, false);
      });
      break;
    case "updateOptionsMenuLocation":
      getOptions().then(settings => {
        let options = settings.options;
        if (logToConsole)
          console.log(
            `Preferences retrieved from storage sync: ${JSON.stringify(
              options
            )}`
          );
        options.optionsMenuLocation = message.data.optionsMenuLocation;
        setOptionsMenuLocation(options);
        saveOptions(options, true);
      });
      break;
    case "updateResetOptions":
      getOptions().then(settings => {
        let options = settings.options;
        if (logToConsole) {
          console.log("Preferences retrieved from storage sync:");
          console.log(options);
        }
        options.forceSearchEnginesReload =
          message.data.resetOptions.forceSearchEnginesReload;
        options.resetPreferences = message.data.resetOptions.resetPreferences;
        options.forceFaviconsReload =
          message.data.resetOptions.forceFaviconsReload;
        setResetOptions(options);
        saveOptions(options, true);
      });
      break;
    case "saveSearchEnginesToDisk":
      chrome.downloads.download({
        url: message.data,
        saveAs: true,
        filename: "searchEngines.json"
      });
      break;
    default:
      break;
  }
});

/// Initialisation
/// By Default: Resets the list of search engines to the default list
/// By Default: Does not reset the options or force favicons to reload
function init() {
  return new Promise((resolve, reject) => {
    if (logToConsole)
      console.log(
        "Loading the extension's preferences and search engines from storage sync.."
      );
    chrome.storage.sync.get(null, data => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to retrieve data from storage sync.");
        }
        reject();
      }
      let options = {};
      if (isEmpty(data.options)) {
        options = defaultOptions.options;
      } else {
        options = data.options;
        delete data.options;
      }
      if (logToConsole) {
        console.log("Options:\n");
        console.log(options);
      }
      let forceReload = options.forceSearchEnginesReload;
      let promise1 = initialiseOptions(options);
      let promise2 = initialiseSearchEngines(data, forceReload);
      Promise.all([promise1, promise2]).then(resolve, reject);
    });
  });
}

function initialiseOptions(data) {
  return new Promise((resolve, reject) => {
    let options = data;
    if (logToConsole) {
      console.log("Options:\n");
      console.log(options);
    }
    let reset = options.resetPreferences;
    // Reset preferences if requested or no preferences have been saved to storage sync
    if (reset) {
      options = defaultOptions.options;
      if (logToConsole) {
        console.log("Options:\n");
        console.log(options);
      }
      chrome.storage.sync.remove("options", () => {
        if (chrome.runtime.lastError) {
          if (logToConsole) {
            console.log(chrome.runtime.lastError);
            console.log("Failed to remove options from storage sync.");
          }
          reject();
        }
        setOptions(options).then(resolve, reject);
      });
    } else {
      setOptions(options).then(resolve, reject);
    }
  });
}

function initialiseSearchEngines(data, forceReload) {
  return new Promise((resolve, reject) => {
    if (logToConsole) {
      console.log("Search engines: \n");
      console.log(searchEngines);
    }
    // Load default search engines if force reload is set or no search engines are stored in storage sync
    if (isEmpty(data) || forceReload) {
      if (!isEmpty(data)) {
        let keys = Object.keys(data);
        chrome.storage.sync.remove(keys, () => {
          if (chrome.runtime.lastError) {
            if (logToConsole) {
              console.log(chrome.runtime.lastError);
              console.log("Failed to remove search engines from storage sync.");
            }
            reject();
          }
          loadDefaultSearchEngines(DEFAULT_JSON).then(resolve, reject);
        });
      } else {
        if (logToConsole)
          console.log(
            "No search engines are stored in storage sync -> loading default list of search engines."
          );
        loadDefaultSearchEngines(DEFAULT_JSON).then(resolve, reject);
      }
    } else {
      searchEngines = sortByIndex(data);
      if (logToConsole) {
        console.log("Search engines: \n");
        console.log(searchEngines);
      }
      rebuildContextMenu();
      resolve();
    }
  });
}

function getOptions() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("options", data => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to retrieve options from storage sync.");
        }
        reject();
      }
      if (logToConsole) console.log(data);
      resolve(data);
      });
  });
}

// Sets the default options if they haven't already been set in storage sync and saves them
// The context menu is also rebuilt when required
function setOptions(options) {
  return new Promise((resolve, reject) => {
    let blnRebuildContextMenu = true;
    setTabMode(options);
    setOptionsMenuLocation(options); // context menu will have to be rebuilt
    setCacheFavicons(options);
    setDisplayFavicons(options); // context menu will have to be rebuilt
    setResetOptions(options);
    saveOptions(options, blnRebuildContextMenu).then(resolve, reject);
  });
}

function saveOptions(data, blnRebuildContextMenu) {
  return new Promise((resolve, reject) => {
    let options = { options: data };
    let strOptions = JSON.stringify(data);
    if (logToConsole) console.log("Options settings:\n" + strOptions);
    chrome.storage.sync.set(options, () => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to save options to storage sync.");
        }
        reject();
      }
      if (blnRebuildContextMenu) rebuildContextMenu();
      if (logToConsole)
        console.log("Successfully saved the options to storage sync.");
      resolve();
    });
  });
}

// Store the default values for tab mode in storage local
function setTabMode(options) {
  if (logToConsole) console.log("Setting tab mode..");
  contextsearch_makeNewTabOrWindowActive = options.tabActive;
  switch (options.tabMode) {
    case "openNewTab":
      contextsearch_openSearchResultsInNewTab = true;
      contextsearch_openSearchResultsInNewWindow = false;
      break;
    case "sameTab":
      contextsearch_openSearchResultsInNewTab = false;
      contextsearch_openSearchResultsInNewWindow = false;
      break;
    case "openNewWindow":
      contextsearch_openSearchResultsInNewWindow = true;
      contextsearch_openSearchResultsInNewTab = false;
      break;
    default:
      break;
  }
}

function setOptionsMenuLocation(options) {
  if (logToConsole)
    console.log(
      `Setting the position of options in the context menu to ${options.optionsMenuLocation}`
    );
  contextsearch_optionsMenuLocation = options.optionsMenuLocation;
}

function setCacheFavicons(options) {
  if (logToConsole)
    console.log(
      `Setting the preference to cache (i.e. store in storage sync) favicons to ${options.cacheFavicons}`
    );
  contextsearch_cacheFavicons = options.cacheFavicons;
  saveSearchEnginesToStorageSync(false, false);
}

function setDisplayFavicons(options) {
  if (logToConsole) console.log("Setting favicons preference..");
  contextsearch_displayFavicons = options.displayFavicons;
}

function setResetOptions(options) {
  contextsearch_forceSearchEnginesReload = options.forceSearchEnginesReload;
  contextsearch_resetPreferences = options.resetPreferences;
  contextsearch_forceFaviconsReload = options.forceFaviconsReload;
  if (logToConsole) {
    console.log(`Setting reset options..`);
    console.log("Options:\n");
    console.log(options);
  }
}

/// Load default list of search engines
function loadDefaultSearchEngines(jsonFile) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", jsonFile, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.overrideMimeType("application/json");
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        searchEngines = sortByIndex(JSON.parse(this.responseText));
        if (logToConsole) {
          console.log("Search engines:\n");
          console.log(searchEngines);
        }
        getFaviconsAsBase64Strings()
          .then(() => {
            saveSearchEnginesToStorageSync(true, true).then(() => {
              rebuildContextMenu();
              if (logToConsole)
                console.log(
                  "Successfully loaded favicons and saved search engines to storage sync."
                );
              resolve();
            });
          })
          .catch(err => {
            if (logToConsole) {
              console.error(err);
              console.log("Failed to fetch favicons.");
            }
            reject();
          });
      }
    };
    xhr.send();
    xhr.onerror = err => {
      if (logToConsole) {
        console.error(err);
        console.log("Failed to load default list of search engines.");
      }
      reject();
    };
  });
}

function saveSearchEnginesToStorageSync(blnNotify, blnUpdateContentScripts) {
  return new Promise((resolve, reject) => {
    let searchEnginesLocal = JSON.parse(JSON.stringify(searchEngines));
    if (logToConsole) {
      console.log("Search engines:\n");
      console.log(searchEngines);
    }
    if (!contextsearch_cacheFavicons) {
      if (logToConsole)
        console.log(
          "cacheFavicons is disabled, clearing favicons before saving to sync storage..\n"
        );
      for (let id in searchEnginesLocal) {
        searchEnginesLocal[id].base64 = null;
      }
    }
    chrome.storage.sync.set(searchEnginesLocal, () => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to save the search engines to storage sync.");
        }
        reject();
      }
      if (blnNotify) notify(notifySearchEnginesLoaded);
      if (logToConsole) {
        for (let id in searchEnginesLocal) {
          console.log(
            `Search engine: ${id} has been saved to storage sync as follows:\n`
          );
          console.log(searchEnginesLocal[id]);
        }
      }
      if (blnUpdateContentScripts) {
        chrome.tabs.query({ currentWindow: true, url: "<all_urls>" }, tabs => {
          if (chrome.runtime.lastError) {
            if (logToConsole) {
              console.log(chrome.runtime.lastError);
              console.log("Failed to find any browser tabs to send the 'updateSearchEnginesList' message to.");
            }
            reject();
          }
          if (tabs.length > 0) {
            if (logToConsole) console.log(tabs);
            sendMessageToOptionsScript("updateSearchEnginesList", searchEnginesLocal);
            updateSearchEnginesList(tabs);
          }
        });
      }
      if (logToConsole)
        console.log(
          "Search engines have been successfully saved to storage sync."
        );
      resolve();
      })
  });
}

function updateSearchEnginesList(tabs) {
  if (!isEmpty(tabs)) {
    sendMessageToTabs(tabs, {
      action: "updateSearchEnginesList",
      data: searchEngines
    })
      .then(() => {
        if (logToConsole)
          console.log(
            "Message to update search engines has been sent to all tabs!\n"
          );
      })
      .catch(err => {
        if (logToConsole) {
          console.log(err);
          console.log(
            "Failed to send the 'updateSearchEnginesList' message to the browser tabs."
          );
        }
      });
  }
}

/// Get and store favicon urls and base64 images
function getFaviconsAsBase64Strings() {
  return new Promise((resolve, reject) => {
    if (logToConsole) console.log("Fetching favicons..");
    let arrayOfPromises = new Array();

    for (let id in searchEngines) {
      // Fetch a new favicon only if there is no existing favicon or if an icon reload is being forced
      if (
        searchEngines[id].base64 === null ||
        searchEngines[id].base64 === undefined ||
        contextsearch_forceFaviconsReload
      ) {
        let seUrl = searchEngines[id].url;
        if (logToConsole) console.log("id: " + id);
        if (logToConsole) console.log("url: " + seUrl);
        let domain = getDomain(seUrl);
        if (logToConsole) console.log("Getting favicon for " + domain);
        arrayOfPromises.push(addNewFavicon(id, domain));
      }
    }

    if (arrayOfPromises.length > 0) {
      Promise.all(arrayOfPromises)
        .then(values => {
          // values is an array of {id:, base64:}
          if (logToConsole) console.log("ALL promises have completed.");
          if (values === undefined) return;
          for (let value of values) {
            if (logToConsole)
              console.log("================================================");
            if (logToConsole) console.log("id is " + value.id);
            if (logToConsole)
              console.log("------------------------------------------------");
            if (logToConsole) console.log("base64 string is " + value.base64);
            if (logToConsole)
              console.log("================================================");
            searchEngines[value.id]["base64"] = value.base64;
          }
          if (logToConsole) console.log("The favicons have ALL been fetched.");
          if (logToConsole) console.log(searchEngines);
          resolve();
        })
        .catch(err => {
          if (logToConsole) {
            console.error(err);
            console.log("Not ALL the favcions could be fetched.");
          }
          reject();
        });
    } else {
      resolve();
    }
  });
}

/// Add favicon to newly added search engine
function addNewFavicon(id, domain) {
  return new Promise(resolve => {
    let linksWithIcons = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", domain, true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let webPage = this.responseText;
        let parser = new DOMParser();
        let doc = parser.parseFromString(webPage, "text/html");
        let links = doc.getElementsByTagName("link");
        let rel = null;
        let size = null;
        let bestIconUrl = null;
        let base64str = "";
        let optimalSize = "32x32";
        let tests = [optimalSize, "[.]png", "[.]ico"];

        // 1st Pass: store all links with a possible favicon of size 32x32 in an array
        for (let link of links) {
          rel = link.getAttribute("rel");
          size = link.getAttribute("size");
          if (/icon/.test(rel)) {
            let absUrl = convertUrl2AbsUrl(link.href, domain);
            if (size === optimalSize) {
              if (!linksWithIcons.includes(absUrl)) linksWithIcons.push(absUrl);
            }
          }
        }

        // 2nd Pass: store all remaining links with a possible favicon of any size different to 32x32 in the same array
        for (let link of links) {
          rel = link.getAttribute("rel");
          size = link.getAttribute("size");
          if (/icon/.test(rel)) {
            let absUrl = convertUrl2AbsUrl(link.href, domain);
            if (size !== optimalSize) {
              if (!linksWithIcons.includes(absUrl)) linksWithIcons.push(absUrl);
            }
          }
        }

        if (logToConsole) console.log(`Domain: ${domain}`);
        if (logToConsole) console.log(`Links with favicons: ${linksWithIcons}`);

        // Check if the links containing icons contain 32x32 in their name, then
        // check if they are of type png, then
        // finally check if they are of type ico
        for (let test of tests) {
          if (logToConsole) console.log(`Checking if url contains: ${test}`);
          bestIconUrl = getBestIconUrl(linksWithIcons, test);
          if (bestIconUrl !== null) {
            if (logToConsole) console.log(`Best icon url: ${bestIconUrl}`);
            base64str = getBase64Image(bestIconUrl);
            base64str.then(b64 => {
              return resolve({ id: id, base64: b64 });
            });
          }
        }
        // Failed to retrieve a favicon, proceeding with besticon API
        if (bestIconUrl === null) {
          if (logToConsole) console.log("Fetching favicon using Besticon API");
          bestIconUrl = besticonAPIUrl + domain + besticonAPIUrlSuffix;
          base64str = getBase64Image(bestIconUrl);
          base64str.then(b64 => {
            resolve({ id: id, base64: b64 });
          });
        }
      }
    };
    xhr.send();
    xhr.onerror = err => {
      if (logToConsole)
        console.error(`Failed to fetch favicon for ${id}. Error: ${err}`);
      resolve({ id: id, base64: base64ContextSearchIcon });
    };
  });
}

function getDomain(url) {
  let protocol = "";
  if (url.indexOf("://") !== -1) {
    protocol = url.split("://")[0] + "://";
  } else {
    // By default, set the protocol to 'https://' if it hasn't been set
    protocol = "https://";
  }

  let urlParts = url
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/);
  let domain = protocol + urlParts[0];
  return domain;
}

function convertUrl2AbsUrl(href, domain) {
  let url = href;
  let absUrl = domain;
  let urlParts = [];

  // If the url is absolute, i.e. begins withh either'http' or 'https', there's nothing to do!
  if (/^(https?\:\/\/)/.test(url)) return url;

  if (url.includes("moz-extension://")) {
    let i = url.lastIndexOf("moz-extension://") + 16;
    url = url.substr(i);
    urlParts = url.split(/\//);
    urlParts.shift();
    for (let urlPart of urlParts) {
      absUrl += "/" + urlPart;
    }
    return absUrl;
  }

  // If url begins with '//'
  if (/^(\/\/)/.test(url)) {
    return "https:" + url;
  }

  // If url is relative...
  // If url begings with either './' or '/' (excluding './/' or '//')
  if (/^([.]\/|\/)[^\/]/.test(url)) {
    urlParts = url.split(/\//);
    urlParts.shift();
  } else if (/^[^\/]/.test(url)) {
    // url does not begin with '/'
    urlParts = url.split(/\//);
  }
  for (let urlPart of urlParts) {
    absUrl += "/" + urlPart;
  }
  return absUrl;
}

function getBestIconUrl(urls, regex) {
  let regexp = new RegExp(regex);
  for (let url of urls) {
    if (regexp.test(url)) {
      return url;
    }
  }
  return null;
}

/// Generate base64 image string for the favicon with the given url
function getBase64Image(faviconUrl) {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", faviconUrl, true);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let ab = this.response;
        let b64 = convertArrayBuffer2Base64(ab, faviconUrl);
        return resolve(b64);
      }
    };
    xhr.send();
    xhr.onerror = err => {
      if (logToConsole) console.log("Array buffer fetch error:", err);
      resolve(base64ContextSearchIcon);
    };
  });
}

function convertArrayBuffer2Base64(ab, faviconUrl) {
  let byteArray = new Uint8Array(ab);
  let str = String.fromCharCode.apply(null, byteArray);
  let base64String = btoa(str);
  if (logToConsole)
    console.log(`Base64 string for ${faviconUrl} is:\n ${base64String}`);
  return base64String;
}

/// Rebuild the context menu using the search engines from storage sync
function rebuildContextMenu() {
  if (logToConsole) console.log("Rebuilding context menu..");

  chrome.contextMenus.removeAll();
  chrome.contextMenus.onClicked.removeListener(processSearch);

  if (contextsearch_optionsMenuLocation === "top") {
    rebuildContextOptionsMenu();
  }

  searchEnginesArray = [];
  var index = 0;
  for (let id in searchEngines) {
    let base64String = searchEngines[id].base64;
    let strIndex = "cs-" + index.toString();
    let strTitle = searchEngines[id].name;

    searchEnginesArray.push(id);
    buildContextMenuItem(
      searchEngines[id],
      strIndex,
      strTitle,
      base64String
    );
    index += 1;
  }

  if (contextsearch_optionsMenuLocation === "bottom") {
    rebuildContextOptionsMenu();
  }

  chrome.contextMenus.onClicked.addListener(processSearch);
}

function rebuildContextOptionsMenu() {
  if (contextsearch_optionsMenuLocation === "bottom") {
    chrome.contextMenus.create({
      id: "cs-separator",
      type: "separator",
      contexts: ["selection"]
    });
  }
  chrome.contextMenus.create({
    id: "cs-multitab",
    title: titleMultipleSearchEngines,
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "cs-google-site",
    title: titleGoogleSearch,
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "cs-options",
    title: titleOptions + "...",
    contexts: ["selection"]
  });
  if (contextsearch_optionsMenuLocation === "top") {
    chrome.contextMenus.create({
      id: "cs-separator",
      type: "separator",
      contexts: ["selection"]
    });
  }
}

/// Build a single context menu item
function buildContextMenuItem(
  searchEngine,
  index,
  title,
  base64String
) {
  const contexts = ["selection"];
  let faviconUrl = "data:image/png;base64," + base64String;
  if (!searchEngine.show) return;
  if (contextsearch_displayFavicons === true) {
    chrome.contextMenus.create({
      id: index,
      title: title,
      contexts: contexts,
      icons: { "20": faviconUrl }
    });
  } else {
    chrome.contextMenus.create({
      id: index,
      title: title,
      contexts: contexts
    });
  }
}

// Perform search based on selected search engine, i.e. selected context menu item
function processSearch(info, tab) {
  let id = info.menuItemId.replace("cs-", "");

  // Prefer info.selectionText over selection received by content script for these lengths (more reliable)
  if (info.selectionText.length < 150 || info.selectionText.length > 150) {
    selection = info.selectionText.trim();
  }

  if (id === "google-site" && targetUrl !== "") {
    displaySearchResults(targetUrl, tab.index);
    return;
  } else if (id === "options") {
    chrome.runtime.openOptionsPage();
    return;
  } else if (id === "multitab") {
    processMultiTabSearch();
    return;
  }

  id = parseInt(id);

  // At this point, it should be a number
  if (!isNaN(id)) {
    searchUsing(searchEnginesArray[id], tab.index);
  }
}

function processMultiTabSearch() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, data => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to retrieve data from storage sync.");
        }
        reject();
      }
      searchEngines = sortByIndex(data);
      let multiTabSearchEngineUrls = [];
      for (let id in searchEngines) {
        if (searchEngines[id].multitab) {
          multiTabSearchEngineUrls.push(
            getSearchEngineUrl(searchEngines[id].url, selection)
          );
        }
      }
      if (isEmpty(multiTabSearchEngineUrls)) {
        notify("Search engines have not been selected for a multi-search.");
        return;
      }
      if (logToConsole) console.log(multiTabSearchEngineUrls);
      chrome.windows
        .create({
          titlePreface: windowTitle + '"' + selection + '"',
          url: multiTabSearchEngineUrls
        });
      resolve();
    });
  });
}

// Handle search terms if there are any
function getSearchEngineUrl(searchEngineUrl, sel) {
  if (searchEngineUrl.includes("{searchTerms}")) {
    return searchEngineUrl.replace(/{searchTerms}/g, encodeUrl(sel));
  } else if (searchEngineUrl.includes("%s")) {
    return searchEngineUrl.replace(/%s/g, encodeUrl(sel));
  } else {
    return searchEngineUrl + encodeUrl(sel);
  }
}

function searchUsing(id, tabIndex) {
  let searchEngineUrl = searchEngines[id].url;
  targetUrl = getSearchEngineUrl(searchEngineUrl, selection);
  if (logToConsole) console.log(`Target url: ${targetUrl}`);
  displaySearchResults(targetUrl, tabIndex);
}

// Display the search results
function displaySearchResults(targetUrl, tabPosition) {
  if (logToConsole) console.log("Tab position: " + tabPosition);
  chrome.windows.getCurrent({ populate: false }, (windowInfo) => {
    if (chrome.runtime.lastError) {
      if (logToConsole) {
        console.log(chrome.runtime.lastError);
        console.log("Failed to fetch current window.");
      }
      return;
    }
    let currentWindowID = windowInfo.id;
    if (contextsearch_openSearchResultsInNewWindow) {
      chrome.windows.create({url: targetUrl}, () => {
        if (chrome.runtime.lastError) {
          if (logToConsole) {
            console.log(chrome.runtime.lastError);
            console.log("Failed to retrieve data from storage sync.");
          }
          return;
        }
        if (!contextsearch_makeNewTabOrWindowActive) {
          chrome.windows.update(currentWindowID, {focused: true});
        }
      });
    } else if (contextsearch_openSearchResultsInNewTab) {
      chrome.tabs.create({
        active: contextsearch_makeNewTabOrWindowActive,
        index: tabPosition + 1,
        url: targetUrl
      });
    } else {
      // Open search results in the same tab
      if (logToConsole)
        console.log("Opening search results in same tab, url is " + targetUrl);
      chrome.tabs.update({ url: targetUrl });
    }
  });
}

/// OMNIBOX
// Provide help text to the user
chrome.omnibox.setDefaultSuggestion({
  description: omniboxDescription
});

// Update the suggestions whenever the input is changed
chrome.omnibox.onInputChanged.addListener((input, suggest) => {
  if (input.indexOf(" ") > 0) {
    let suggestion = buildSuggestion(input);
    if (logToConsole) console.log(JSON.stringify(suggestion));
    if (suggestion.length === 1) {
      suggest(suggestion);
    }
  }
});

// Open the page based on how the user clicks on a suggestion
chrome.omnibox.onInputEntered.addListener(input => {
  if (logToConsole) console.log(input);
  let tabPosition = 0;
  chrome.tabs.query({
      currentWindow: true,
      active: true
    }, (tabs) => {
      if (chrome.runtime.lastError) {
        if (logToConsole) {
          console.log(chrome.runtime.lastError);
          console.log("Failed to retrieve active tab in current window.");
        }
        return;
      }
      for (let tab of tabs) {
        tabPosition = tab.index;
      }

      if (logToConsole) console.log(tabPosition);
      if (logToConsole) console.log(input.indexOf("://"));

      // Only display search results when there is a valid link inside of the url variable
      if (input.indexOf("://") > -1) {
        if (logToConsole) console.log("Processing search...");
        displaySearchResults(input, tabPosition);
      } else {
        try {
          let suggestion = buildSuggestion(input);
          if (suggestion.length === 1) {
            displaySearchResults(suggestion[0].content, tabPosition);
          } else if (input.indexOf(" ") === -1) {
            notify(notifyUsage);
          }
        } catch (ex) {
          if (logToConsole) console.log("Failed to process " + input);
        }
      }
    });
});

function buildSuggestion(text) {
  let result = [];

  // Only make suggestions available and check for existence of a search engine when there is a space.
  if (text.indexOf(" ") === -1) {
    lastAddressBarKeyword = "";
    return result;
  }

  let keyword = text.split(" ")[0];
  let searchTerms = text.replace(keyword, "").trim();
  if (logToConsole) console.log(searchTerms);

  // Don't notify for the same keyword
  let showNotification = true;
  if (lastAddressBarKeyword == keyword) showNotification = false;
  lastAddressBarKeyword = keyword;

  for (let id in searchEngines) {
    if (searchEngines[id].keyword === keyword) {
      let suggestion = {};
      let searchEngineUrl = searchEngines[id].url;
      if (searchEngineUrl.includes("{searchTerms}")) {
        targetUrl = searchEngineUrl.replace(
          /{searchTerms}/g,
          encodeUrl(searchTerms)
        );
      } else if (searchEngineUrl.includes("%s")) {
        targetUrl = searchEngineUrl.replace(/%s/g, encodeUrl(searchTerms));
      } else {
        targetUrl = searchEngineUrl + encodeUrl(searchTerms);
      }
      suggestion["content"] = targetUrl;
      suggestion["description"] =
        "Search " + searchEngines[id].name + " for " + searchTerms;
      if (logToConsole) console.log(JSON.stringify(suggestion));
      result.push(suggestion);
      return result;
    }
  }

  // If no known keyword was found
  if (showNotification) {
    notify(notifySearchEngineWithKeyword + " " + keyword + " " + notifyUnknown);
  }

  return result;
}

/// Helper functions

// Test if a search engine performing a search for the keyword 'test' returns valid results
function testSearchEngine(engineData) {
  if (engineData.url != "") {
    let tempTargetUrl = getSearchEngineUrl(engineData.url, "test");
    chrome.tabs.create({ url: tempTargetUrl });
  } else {
    notify(notifySearchEngineUrlRequired);
  }
}

/// Generic Error Handler
function onError(error) {
  if (
    error
      .toString()
      .indexOf(
        "Please set webextensions.storage.sync.enabled to true in about:config"
      ) > -1
  ) {
    notify(notifyEnableStorageSync);
  } else {
    console.error(`${error}`);
  }
}

/// Encode a url
function encodeUrl(url) {
  if (isEncoded(url)) {
    return url;
  }
  return encodeURIComponent(url);
}

/// Verify if uri is encoded
function isEncoded(uri) {
  uri = uri || "";
  return uri !== decodeURIComponent(uri);
}

/// Send messages to content scripts (selection.js)
function sendMessageToTabs(tabs, message) {
  return new Promise((resolve, reject) => {
    let arrayOfPromises = [];
    if (logToConsole) {
      console.log(`Sending message to tabs..\n`);
    }
    for (let tab of tabs) {
      arrayOfPromises.push(sendMessageToTab(tab, message));
    }
    Promise.all(arrayOfPromises)
      .then(() => {
        if (logToConsole)
          console.log("Message has successfully been sent to ALL tabs.");
        resolve();
      })
      .catch(err => {
        if (logToConsole) {
          console.log(err);
          console.log("Failed to send message to ALL tabs.");
        }
        reject();
      });
  });
}

function sendMessageToTab(tab, message) {
  return new Promise((resolve, reject) => {
    let tabId = tab.id;
    chrome.tabs.sendMessage(tabId, message)
      .then(() => {
        if (logToConsole) {
          console.log(`Successfully sent message to:\n`);
          console.log(`Tab ${tab.id}: ${tab.title}\n`);
        }
        resolve();
      })
      .catch(err => {
        if (logToConsole) {
          console.error(err);
          console.log(
            `Failed to send message ${JSON.stringify(message)} to:\n`
          );
          console.log(`Tab ${tab.id}: ${tab.title}\n`);
        }
        reject();
      });
  });
}

function sendMessageToOptionsScript(action, data){
  let message = {
    action: action,
    data: data
  }
  chrome.runtime.sendMessage(message);
}

/// Notifications
function notify(message) {
  chrome.notifications.create(message.substring(0, 20), {
    type: "basic",
    iconUrl: chrome.extension.getURL("icons/icon_64.png"),
    title: chrome.i18n.getMessage("extensionName"),
    message: message
  });
}

init();
