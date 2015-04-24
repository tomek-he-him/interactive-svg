const proto = {
  priority: 10
};

export default function target(model, view) {
  model.attributeChanges.when('target', (vNode) => {
    const [x, y] = vNode.properties.target
      .split(',')
      .map(Number)
    ;
    const update = Object.create(proto);
    const {emit} = view.viewBoxTransformations;

    if (![x, y].every(Number.isFinite)) {
      emit('error', new Error(
        'drawingBoard.target: The <drawing-board> attribute `target` should ' +
        'match the form "`{Number} x`, `{Number} y`".'
      ));
      emit('update', Object.assign(update, {transformFunction: null}));
    }

    else emit('update', Object.assign(update, {
      transformFunction: (coords) => [
        coords[0] + x,
        coords[1] + y,
        coords[2],
        coords[3]
      ]
    }));
  });
}
