const scale = require('./plugins/scale');
const target = require('./plugins/target');
const viewport = require('./plugins/viewport');

module.exports = {
  scale,
  target,
  viewport,
  all: [scale, target, viewport],
};
