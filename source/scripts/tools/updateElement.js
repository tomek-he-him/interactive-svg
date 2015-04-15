import hashifyAttributes from './hashifyAttributes';
import diffAttributes from './diffAttributes';

export default function updateElement(element, vNode) {
  let diff = diffAttributes(
    hashifyAttributes(element.attributes),
    vNode.properties
  );

  for (let attribute in diff) if (diff.hasOwnProperty(attribute)) {
    if (diff[attribute] === null) element.removeAttribute(attribute);
    else element.setAttribute(attribute, diff[attribute])
  }
}
