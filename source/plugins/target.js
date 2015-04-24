export default function target(model, view) {
  model.attributeChanges.when('target', (vNode) => {
    const [x, y] = vNode.properties.target
      .split(',')
      .map(Number)
    ;
    view.viewBoxTransformations.emit('update', {
      priority: 10,
      transformFunction: (coords) => [
        coords[0] + x,
        coords[1] + y,
        coords[2],
        coords[3]
      ]
    });
  });
}
