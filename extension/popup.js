// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.captureVisibleTab({
    format: "png"
  }, function (screenshotUrl) {
    var imageElement = document.createElement("img");
    imageElement.src = screenshotUrl;

    var canvas = document.getElementById('target');
    canvas.height = imageElement.height;
    canvas.width = imageElement.width;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imageElement, 0, 0);

    ctx.beginPath();
    ctx.arc(100, 200, 40, 0, 2 * Math.PI);
    ctx.stroke();

    // content script
    chrome.runtime.sendMessage({
      data: canvas.toDataURL("image/png")
    });

    //copyToClipboard(canvas.toDataURL("image/png"));
  });
});

function copyToClipboard(data) {
  document.oncopy = function (event) {
    event.clipboardData.setData("image/png", data);
    event.preventDefault();
  };
  document.execCommand("Copy", false, null);
}