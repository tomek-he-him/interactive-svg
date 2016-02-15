const test = require('prova');
const diff = require('virtual-dom/diff');
const h = require('virtual-dom/h');
const objectContains = require('../test-tools/objectContains');

const vPatchify = require('../../module/tools/vPatchify');

test('tools/vPatchify:  ' +
  'Produces a VirtualPatch-compatible object.', (is) => {
  is.ok(
    objectContains(
      diff(
        h('svg', {
          a: '1',
          b: '2',
          'c-c': '3',
        }),
        h('svg', {
          a: '1',
          'c-c': '4',
          d: '4',
        })
      ),
      vPatchify({
        b: undefined,
        'c-c': '4',
        d: '4',
      })
    ),
    'a subset of the original VirtualPatch'
  );

  is.end();
});
