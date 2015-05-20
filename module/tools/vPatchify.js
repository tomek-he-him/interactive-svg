import assign from 'object-assign';

export default (properties) => ({
  '0': {
    patch: assign({}, properties),
  },
});
