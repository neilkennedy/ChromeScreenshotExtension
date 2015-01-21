
var
  wrapper,
  image = $("#xposureExtensionImage"),
  canvas = $("#xposureExtensionCanvas"),
  context = canvas[0].getContext("2d"),
  pageX,
  pageY,
  oldX,
  oldY,
  drawing = false,
  oldState,
  linethickness = 5,
  color = "#ff0000";

//Copy the image (screenshot) data onto the canvas
canvas[0].height = image[0].height;
canvas[0].width = image[0].width;

context.drawImage(image[0], 0, 0);
oldState = context.getImageData(0, 0, canvas.width(), canvas.height());

//register the event handlers to draw on the canvas
canvas.on('mousedown', function (event) {
  event.preventDefault();
  // Calculate the current mouse X, Y coordinates with canvas offset
  var x, y;
  x = event.pageX - $(canvas).offset().left;
  y = event.pageY - $(canvas).offset().top;
  drawing = true;
  context.lineWidth = linethickness;

  // Store the current x, y positions
  oldX = x;
  oldY = y;
});

canvas.on('mousemove', function (event) {
  // Calculate the current mouse X, Y coordinates with canvas offset
  var x, y;
  x = event.pageX - $(canvas).offset().left;
  y = event.pageY - $(canvas).offset().top;

  // If the mouse is down (drawning) then start drawing lines
  if (drawing) {
    context.putImageData(oldState, 0, 0);
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(oldX, oldY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    oldState = context.getImageData(0, 0, canvas.width(), canvas.height());
  } else {

    context.putImageData(oldState, 0, 0);

    context.beginPath();
    context.arc(x, y, linethickness, 0, 2 * Math.PI, false);

    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
  }

  // Store the current X, Y position
  oldX = x;
  oldY = y;
});

canvas.on('mouseup', function (event) {
  drawing = false;
});
