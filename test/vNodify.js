import test from 'tape-catch';
import isVNode from 'virtual-dom/vnode/is-vnode';
import element from './tools/element';

import vNodify from '../source/scripts/tools/vNodify';

test('tools/vNodify:  ' +
  'Converts an element to a VirtualNode.', (is) => {
    let node1 = vNodify({
      attributes: [
        { name: 'class', value: 'class one two three' },
        { name: 'id', value: 'element-id' } ] });
    is.ok(isVNode(node1),
      'a duck-typed element');
    is.deepEqual(node1.properties,
      {
        class: 'class one two three',
        id: 'element-id' },
      'getting `properties` right');

    let node2 = vNodify(element(
        '<div ' +
          'class="anything" ' +
          'align="left" ' +
          '>' +
        '</div>'));
    is.ok(isVNode(node2),
      'a jsdom element');
    is.deepEqual(node2.properties,
      {
        class: 'anything',
        align: 'left' },
      'getting `properties` right');

    is.end(); });
