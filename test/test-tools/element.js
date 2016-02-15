const jsdom = require('jsdom').jsdom;

const div = jsdom().defaultView.document.createElement('div');

module.exports = function element(htmlString) {
  // Grab the first node.
  div.innerHTML = htmlString;
  const firstNode = div.childNodes[0] || null;

  // Clear the div.
  while (div.lastChild) div.removeChild(div.lastChild);

  // Return the first node.
  return firstNode;
};
