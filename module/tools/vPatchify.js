const assign = require('object-assign');

export default (properties) => ({
  '0': {
    patch: assign({}, properties),
  },
});
