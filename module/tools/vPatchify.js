const assign = require('object-assign');

module.exports = (properties) => ({
  '0': {
    patch: assign({}, properties),
  },
});
