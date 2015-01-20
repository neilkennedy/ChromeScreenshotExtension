var
  wrapper,
  elementsTemplate =
    '<canvas id="xposureExtensionCanvas"></canvas>' +
    '<img id="xposureExtensionImage" />';

wrapper = document.createElement('div');
wrapper.setAttribute("id", "xposureExtensionWrapper");
wrapper.innerHTML = elementsTemplate;
document.body.appendChild(wrapper);