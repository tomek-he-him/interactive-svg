const proto = {
  priority: 100,
  transformFunction: null
};

export default function scale(model, view) {
  model.attributeChanges.when('scale', (vNode) => {
    const emptyUpdate = Object.create(proto);
    const {emit} = view.viewBoxTransformations;

    // Validate the attribute.
    const scale = Number(vNode.properties.scale);
    if (!Number.isFinite(scale)) {
      emit('error', new Error(
        'drawingBoard.scale: The <drawing-board> attribute `scale` should ' +
        'be a `{Number}`.'
      ));
      emit('update', emptyUpdate);
    }

    // Inject the viewBox transformation.
    else emit ('update', Object.assign(emptyUpdate, {
      transformFunction: (coords) => coords.map((coord) => coord / scale)
    }));
  });
}
