const proto = {
  priority: 100,
  transformFunction: null
};

export default function scale({model, view}) {
  model.attributeChanges.when('scale', (vNode) => {
    const emptyUpdate = Object.create(proto);
    const {emit} = view.viewBoxTransformations;
    const {scale} = vNode.properties;

    // Clean up if the attribute has been removed.
    if (scale == null) {
      emit('add', emptyUpdate);
      return;
    }

    // Validate the attribute.
    const cleanScale = Number(scale);
    if (!Number.isFinite(cleanScale)) {
      emit('error', new Error(
        'drawingBoard.scale: The <drawing-board> attribute `scale` should ' +
        'be a `{Number}`.'
      ));
      emit('add', emptyUpdate);
    }

    // Inject the viewBox transformation.
    else emit('add', Object.assign(emptyUpdate, {
      transformFunction: (coords) => {
        const [x, y, width, height] = coords;
        const targetX = x + width / 2;
        const targetY = y + height / 2;
        return [
          targetX - width / 2 / cleanScale,
          targetY - height / 2 / cleanScale,
          width / cleanScale,
          height / cleanScale
        ];
      }
    }));
  });
}
