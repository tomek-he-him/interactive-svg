import vPatchify from '../tools/vPatchify';

const dimension = /^\s*(?:width|height):/;
const separator = /[×x]/;

export default function viewport(model, view, elements) {
  model.attributeChanges.when('viewport', (vNode) => {
    const currentStyle = elements.viewport.getAttribute('style');
    const {viewport} = vNode.properties;

    // Clean up if the attribute has been removed.
    if (viewport == null) {
      view.initialViewBoxCoords.emit('update', null);
      return;
    }

    // Validate the attribute.
    const [width, height] = viewport
      .split(separator)
      .map(Number)
    ;
    if (![width, height].every(Number.isFinite)) {
      view.initialViewBoxCoords.emit('error', new Error(
        'drawingBoard.viewport: The <drawing-board> attribute `viewport` ' +
        'should match the form "`{Number} width` × `{Number} height`".'
      ));
      view.initialViewBoxCoords.emit('update', null);
    }

    // Update the viewport’s style and dimensions.
    else {
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

      // Update the viewBox.
      view.initialViewBoxCoords.emit('update', [
        -(width / 2),
        -(height / 2),
        width,
        height
      ]);
    }
  });
}
