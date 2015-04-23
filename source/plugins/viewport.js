import vPatchify from '../tools/vPatchify';

export default function viewport(model, view) {
  model.attributeChanges.when('viewport', (vNode) => {
    const [width, height] = vNode.properties.viewport
      .split('×')
      .map(Number)
    ;

    // Update the viewport’s style.
    view.attributeUpdates.emit('update', vPatchify({
      style: (
        'width:' + width + 'px;' +
        'height:' + height + 'px'
      ),
      width,
      height
    }));

    // Update the viewport’s viewBox.
    view.viewBoxTransformations.emit('update', {
      priority: 0,
      transformFunction: () => [
        -(width / 2),
        -(height / 2),
        width,
        height
      ]
    });
  });
}
