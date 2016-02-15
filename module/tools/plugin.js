module.exports = (initialize) => (
  Object.assign({}, initialize, {
    type: 'plugin',
    version: '1',
  })
);
