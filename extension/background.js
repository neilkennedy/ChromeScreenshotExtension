// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Update the declarative rules on install or upgrade.
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a <video> tag...
        new chrome.declarativeContent.PageStateMatcher({
          css: ["body"]//just temporary... will be set to something else when I figure this all out
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "drawing.js"});
});