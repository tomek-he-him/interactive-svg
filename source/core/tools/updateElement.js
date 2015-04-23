export default function updateElement(element, diff) {
  const { patch } = diff['0'];
  for (let attribute in patch) if (patch.hasOwnProperty(attribute)) {
    if (typeof patch[attribute] === 'undefined') {
      element.removeAttribute(attribute);
    }
    else element.setAttribute(attribute, patch[attribute]);
  }
}
