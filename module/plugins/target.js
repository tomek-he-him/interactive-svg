const proto = {
  priority: 10,
  transformFunction: null
};

export default function target({model, view}) {
  model.attributeChanges.when('target', (vNode) => {
    const emptyUpdate = Object.create(proto);
    const {emit} = view.viewBoxTransformations;
    const {target} = vNode.properties;

    // Clean up if the attribute has been removed.
    if (target == null) {
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
      emit('add', Object.assign(emptyUpdate));
    }

    // Update viewBox transformations.
    else emit('add', Object.assign(emptyUpdate, {
      transformFunction: (coords) => [
        coords[0] + x,
        coords[1] + y,
        coords[2],
        coords[3]
      ]
    }));
  });
}
