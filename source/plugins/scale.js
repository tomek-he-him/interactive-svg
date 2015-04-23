export default function scale(model, view) {
  model.attributeChanges.when('scale', (vNode) => {
    const scale = Number(vNode.properties.scale);
    view.viewBoxTransformations.emit('update', {
      priority: 100,
      transformFunction: (coords) => coords.map((coord) => coord / scale)
    });
  });
}
