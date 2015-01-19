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
          css: ["body"]
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function (message) {
  var imageToCopy = document.createElement('img');
  document.body.appendChild(imageToCopy);
  imageToCopy.src = message.data;

  var ctrlRange = document.body.createControlRange();
  ctrlRange.add(imageToCopy);
  ctrlRange.execCommand("Copy");
});