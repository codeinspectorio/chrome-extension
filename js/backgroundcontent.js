/**
 * @fileoverview
 * Deals with installation, setting up storage as well as dictate which sites the extension popup appears on
 * Whereas some of the content scripts are injected declaratively in manifest.json,
 * Github Uses HTML's pushState and content scripts are not fired when pushState happens
 * We track history to see if state was pushed, then we execute content scripts by injecting them programmatically
 * However chrome's onHistoryStateUpdated listener fires multiple times we track url to make sure we only execute the content script once
 */
//constants
const api = "https://api.code-inspector.com/graphql"; // constants are all kept in background.js vs. a constants.js as importing them in is not possible in chrome extension.

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      AccessKey: "",
      SecretKey: "",
      API: api
    }, // constants are added to storage on installation of extension so they can be accessed by all other scripts in extension
    function() {}
  );
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // these rules determine on what sites the popup becomes activated
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "github.com" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: "code-inspector.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

var previousDetailsUrlFetched = ""; // If current URL equals previousDetailsURLFetched, we don't execute the script again
// Handles page refresh. As page Url has been executed once on refresh the url remains the same, so we must clear previousDetailsUrlFetched
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  previousDetailsUrlFetched = "";
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.key === "keys") {
    // for the options page to see if keys are valid and if keys can be inserted
    // keys fetch is excluded from executed only once per url. This
    validKeysFetch(request, api, sendResponse);
  }
  const currentUrl = request.url;
  if (currentUrl === previousDetailsUrlFetched) {
    // already treated the url
    return true;
  }
  previousDetailsUrlFetched = currentUrl;
  // fetch handler, all content scripts pass message here when a fetch is needed
  if (request.key === "repoURL") {
    treeFetch(request, api, sendResponse);
    // handles the display of tree
  } else if (request.key === "reposTab") {
    // repositories tab
    repoTabFetch(api, sendResponse);
  } else if (request.key === "fileURL") {
    // file view
    fileFetch(request, api, sendResponse);
  }
  return true; // async use of chrome's sendMessage requires return true. This is as the fetch (async) is being executed we need to keep the message channel open
});

var previousDetailsUrl = "";
//Deals with HTML's pushState where we programmatically inject the script. We monitor URL here as well to make sure we don't inject the script multiple times for the same url
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if (
    details.url !== previousDetailsUrl &&
    details.url.includes("github.com")
  ) {
    if (details.url.includes("?tab=repositories")) {
      chrome.tabs.executeScript(details.tabId, {
        file: "js/repositories.js"
      });
      chrome.tabs.executeScript(details.tabId, { file: "jquery-3.4.1.min.js" });
    } else if (details.url.includes("blob")) {
      chrome.tabs.executeScript(details.tabId, { file: "js/file.js" });
      chrome.tabs.insertCSS(details.tabId, { file: "css/file.css" });
      chrome.tabs.executeScript(details.tabId, { file: "jquery-3.4.1.min.js" });
    } else if (
      !details.url.includes("blob") &&
      details.url.split("/").length - 1 >= 4 // to prevent it from firing on profile home page. unsure the url has at least 4 slashs
    ) {
      chrome.tabs.executeScript(details.tabId, { file: "js/tree.js" });
      chrome.tabs.executeScript(details.tabId, { file: "jquery-3.4.1.min.js" });
    }
  } else {
  }
  previousDetailsUrl = details.url;
});
