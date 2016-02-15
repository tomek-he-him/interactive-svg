const test = require('prova');
const element = require('../test-tools/element');
const h = require('virtual-dom/h');
const diff = require('virtual-dom/diff');
const vNodify = require('../../module/tools/vNodify');

const updateElement = require('../../module/tools/updateElement');

function dewhitespace(string) {
  return string.replace(/\s/g, '');
}

test('tools/updateElement:  ' +
  'Works.', (is) => {
    const element1 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element1,
      { '0':
        { type: 4,
          patch: {
            class: 'class one two three',
            'data-something': 'even better',
            checked: '',
            id: undefined
          }
        }
      }
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
      'with a lightweight duck-typed diff'
    );

    const element2 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element2,
      diff(
        h('div', {
          class: 'anything',
          align: 'left',
          id: 'element-id',
          'data-something': 'good',
        }),
        h('div', {
          class: 'class one two three',
          align: 'left',
          'data-something': 'even better',
          checked: ''
        })
      )
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

    const element3 = element(
      '<div ' +
        'class="anything" ' +
        'align="left" ' +
        'id="element-id" ' +
        'data-something="good" ' +
        '>' +
      '</div>'
    );

    updateElement(element3,
      diff(vNodify(element3),
        vNodify(element(
          '<div ' +
            'class="class one two three" ' +
            'align="left" ' +
            'data-something="even better" ' +
            'checked="" ' +
            '>' +
          '</div>'
        ))
      )
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
      'with vNodified DOM elements'
    );

    is.end();
  }
);
