import test from 'tape-catch';
import element from './tools/element';
import h from 'virtual-dom/h';
import vNodify from '../source/scripts/tools/vNodify';

import updateElement from '../source/scripts/tools/updateElement';

function dewhitespace(string) {
  return string.replace(/\s/g, '');
}

test('tools/updateElement:  ' +
  'Works.', (is) => {
    let element1 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element1,
      { properties: {
        class: 'class one two three',
        align: 'left',
        'data-something': 'even better',
        checked: ''
      } }
    );

    is.equal(dewhitespace(element1.outerHTML),
      dewhitespace(
        '<div ' +
          'class="class one two three" ' +
          'align="left" ' +
          'data-something="even better" ' +
          'checked="" ' +
          '>' +
        '</div>'
      ),
      'with duck-typed properties'
    );

    let element2 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element2,
      h('div', {
        class: 'class one two three',
        align: 'left',
        'data-something': 'even better',
        checked: ''
      })
    );

    is.equal(dewhitespace(element2.outerHTML),
      dewhitespace(
        '<div ' +
          'class="class one two three" ' +
          'align="left" ' +
          'data-something="even better" ' +
          'checked="" ' +
          '>' +
        '</div>'
      ),
      'with a real VirtualNode'
    );

    let element3 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element3,
      vNodify(element(
        '<div ' +
          'class="class one two three" ' +
          'align="left" ' +
          'data-something="even better" ' +
          'checked="" ' +
          '>' +
        '</div>'
      ))
    );

    is.equal(dewhitespace(element3.outerHTML),
      dewhitespace(
        '<div ' +
          'class="class one two three" ' +
          'align="left" ' +
          'data-something="even better" ' +
          'checked="" ' +
          '>' +
        '</div>'
      ),
      'with a vNodified DOM element'
    );

    is.end();
  }
);
