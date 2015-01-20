// Use a CSS selector to tell Chrome what pages to run this extension on
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a <video> tag...
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'demos.telerik.com', schemes: ['https', 'http'] }//testing
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

//When the extension is clicked take the screenshot and set up the drawing area on the webpage
chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.tabs.captureVisibleTab({
    format: "png"
  }, function (screenshotUrl) {

    chrome.tabs.executeScript({
      file: "preScreenshot.js"
    }, function () {
      chrome.tabs.executeScript({
        code: 'document.getElementById("xposureExtensionImage").src = "' + screenshotUrl + '"'
      }, function () {
        chrome.tabs.executeScript({
          file: "postScreenshot.js"
        });
      });
    });
  });
});