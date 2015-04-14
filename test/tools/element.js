import { jsdom } from 'jsdom';

let div = jsdom().defaultView.document.createElement('div');

export default function element(htmlString) {
  // Grab the first node.
  div.innerHTML = htmlString;
  let firstNode = div.childNodes[0] || null;

  // Clear the div.
  let lastNode;
  console.log(div);
  while (lastNode = div.lastChild) div.removeChild(lastNode);

  // Return the first node.
  return firstNode; }
