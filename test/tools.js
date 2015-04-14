import test from 'tape-catch';

import hashifyAttributes from '../source/scripts/tools/hashifyAttributes';

test('hashifyAttributes hashifies element attributes', (is) => {
  is.deepEqual(
    hashifyAttributes({
      attributes: [
        { name: 'class', value: 'class one two three' },
        { name: 'id', value: 'element-id' } ] }),
    {
      class: 'class one two three',
      id: 'element-id' },
    'on a duck-typed element');

  is.end(); });
