


chrome.tabs.captureVisibleTab(null, { format: "png" }, function (screenshotUrl) {
  
  document.body.style.backgroundColor="red";
  
  var imageElement = document.createElement("img");
  imageElement.src = screenshotUrl;

  var canvas = document.createElement('canvas');
  canvas.style.height = imageElement.height;
  canvas.style.width = imageElement.width;
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(imageElement, 0, 0);

  ctx.beginPath();
  ctx.arc(100, 200, 40, 0, 2 * Math.PI);
  ctx.stroke();

  document.body.appendChild(canvas);
});