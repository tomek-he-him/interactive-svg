const plugin = require('../tools/plugin');

const assign = require('object-assign');

const proto = {
  priority: 10,
  transformFunction: null,
};

module.exports = plugin((params) => {
  const model = params.model;
  const view = params.view;

  model.attributeChanges.when('target', (vNode) => {
    const emptyUpdate = Object.create(proto);
    const emit = view.viewBoxTransformations.emit;
    const target = vNode.properties.target;

    // Clean up if the attribute has been removed.
    if (target === null || target === undefined) {
      emit('add', emptyUpdate);
      return;
    }

    // Validate the attribute.
    const [x, y] = target.split(',').map(Number);
    if (![x, y].every(Number.isFinite)) {
      emit('error', new Error(
        'drawingBoard.target: The <drawing-board> attribute `target` should ' +
        'match the form "`{Number} x`, `{Number} y`".'
      ));
      emit('add', assign(emptyUpdate));
    }

    // Update viewBox transformations.
    else emit('add', assign(emptyUpdate, {
      transformFunction: (coords) => [
        coords[0] + x,
        coords[1] + y,
        coords[2],
        coords[3],
      ],
    }));
  });
});
