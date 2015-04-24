import vPatchify from '../tools/vPatchify';

const dimension = /^\s*(?:width|height):/;

export default function viewport(model, view, elements) {
  model.attributeChanges.when('viewport', (vNode) => {
    const currentStyle = elements.viewport.getAttribute('style');

    // Validate the attribute.
    const [width, height] = vNode.properties.viewport
      .split(/[×x]/)
      .map(Number)
    ;
    if (![width, height].every(Number.isFinite)) {
      view.viewBoxTransformations.emit('error', new Error(
        'drawingBoard.viewport: The <drawing-board> attribute `viewport` ' +
        'should match the form "`{Number} width` × `{Number} height`".'
      ));
    }

    // Update the viewport’s style, dimensions and viewBox.
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
      height,
      viewBox: `${-(width / 2)} ${-(height / 2)} ${width} ${height}`
    }));

    // Recalculate the viewBox.
    view.viewBoxTransformations.emit('touch');
  });
}
