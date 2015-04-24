import vPatchify from '../tools/vPatchify';

const dimension = /^\s*(?:width|height):/;

export default function viewport(model, view, elements) {
  model.attributeChanges.when('viewport', (vNode) => {
    const [width, height] = vNode.properties.viewport
      .split('×')
      .map(Number)
    ;
    const currentStyle = elements.viewport.getAttribute('style');

    // Update the viewport’s style.
    view.attributeUpdates.emit('update', vPatchify({
      style: (currentStyle ?
        currentStyle
          .split(';')
          .filter((property) => !dimension.test(property))
        :
        []
      ).concat([
        'width:' + width + 'px',
        'height:' + height + 'px'
      ]).join(';'),
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
