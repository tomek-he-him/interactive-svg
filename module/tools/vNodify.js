const hashifyAttributes = require('./hashifyAttributes');

const vNodeProto = {
  tagName: 'DIV',
  children: [],
  type: 'VirtualNode',
  version: '2',
};

module.exports = function vNodify(element) {
  const vNode = Object.create(vNodeProto);
  vNode.properties = hashifyAttributes(element.attributes);
  if (element.tagName) vNode.tagName = element.tagName;
  return vNode;
}
