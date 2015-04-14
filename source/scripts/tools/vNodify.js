import hashifyAttributes from './hashifyAttributes';

let vNode = {
  tagName: 'div',
  children: [],
  type: 'VirtualNode',
  version: '2' };

export default function vNodify(element) {
  return Object.assign(Object.create(vNode), {
    properties: hashifyAttributes(element) }); }
