const vPatchify = require('../tools/vPatchify');
const plugin = require('../tools/plugin');

const dimension = /^\s*(?:width|height):/;
const separator = /[×x]/;

module.exports = plugin((params) => {
  const model = params.model;
  const view = params.view;
  const elements = params.elements;

  model.attributeChanges.when('viewport', (vNode) => {
    const currentStyle = elements.viewport.getAttribute('style');
    const viewport = vNode.properties.viewport;

    // Clean up if the attribute has been removed.
    if (viewport === null || viewport === undefined) {
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
    } else {
      // Update the viewport’s style and dimensions.

      view.attributeUpdates.emit('update', vPatchify({
        style: (currentStyle ?
          currentStyle
            .split(';')
            .filter((property) => !dimension.test(property))
          :
          []
        ).concat([
          `width: ${ width }px`,
          `height: ${ height }px`,
        ]).join(';'),
        width,
        height,
      }));

      // Update the viewBox.
      view.initialViewBoxCoords.emit('update', [
        -(width / 2),
        -(height / 2),
        width,
        height,
      ]);
    }
  });
});
