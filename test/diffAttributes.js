import test from 'tape-catch';

import diffAttributes from '../source/scripts/tools/diffAttributes';

test('tools/diffAttributes:  ' +
  'Diffs two attributes objects.', (is) => {
    is.deepEqual(
      diffAttributes(
        {  },
        {  }
      ),
      {    },
      'returning an empty object for empty attributes'
    );

    is.deepEqual(
      diffAttributes(
        {  a: 1     },
        {           }
      ),
      {    a: null  },
      'returning null for removed attributes'
    );

    is.deepEqual(
      diffAttributes(
        {        },
        {  a: 1  }
      ),
      {    a: 1  },
      'noticing added attributes'
    );

    is.deepEqual(
      diffAttributes(
        {  a: 1  },
        {  a: 2  }
      ),
      {    a: 2  },
      'noticing modified attributes'
    );

    is.deepEqual(
      diffAttributes(
        {  a: 1  },
        {  a: 1  }
      ),
      {          },
      'leaving out unchanged attributes'
    );

    is.deepEqual(
      diffAttributes(
        {  a: 1   },
        {  a: ''  }
      ),
      {    a: ''  },
      'handling falsey values alright'
    );

    is.deepEqual(
      diffAttributes(
        {  a: 1,   b: 2,     c: 3,  d: 4         },
        {  a: '',            c: 4,  d: 4,  e: 5  }
      ),
      {    a: '',  b: null,  c: 4,  e: 5         },
      'doing all these things at once'
    );

    is.end();
  }
);
