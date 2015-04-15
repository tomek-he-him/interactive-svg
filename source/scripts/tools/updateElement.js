import hashifyAttributes from './hashifyAttributes';
import diffProperties from './diffProperties';

export default function updateElement(element, vNode) {
  let diff = diffProperties(
    hashifyAttributes(element.attributes),
    vNode.properties
  );

  for (let attribute in diff) if (diff.hasOwnProperty(attribute)) {
    if (diff[attribute] === null) element.removeAttribute(attribute);
    else element.setAttribute(attribute, diff[attribute])
  }
}
