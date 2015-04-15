import hashifyAttributes from './hashifyAttributes';

let vNode = {
  tagName: 'DIV',
  children: [],
  type: 'VirtualNode',
  version: '2'
};

export default function vNodify(element) {
  return Object.assign(Object.create(vNode), {
    properties: hashifyAttributes(element)
  });
}
