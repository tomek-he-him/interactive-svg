const updateTransformation = require('./view/updateTransformation');
const applyTransformations = require('./view/applyTransformations');
const vPatchify = require('../tools/vPatchify');
const updateElement = require('../tools/updateElement');

const stereo = require('stereo');

module.exports = function view (viewportElement) {

  // Initialize the channel `initialViewBoxCoords`.
  const viewBoxCoords = null;
  const initialViewBoxCoords = stereo();
  initialViewBoxCoords.on('update', (coords) => {
    viewBoxCoords = coords;
    viewBoxTransformations.emit('touch');
  });

  // Initialize the channel `viewBoxTransformations`.
  const viewBoxTransformations = stereo();
  const transformations = [];
  viewBoxTransformations.on('add',
    updateTransformation(transformations)
  );
  viewBoxTransformations.on(['add', 'touch'], () => {
    if (!viewBoxCoords) {
      updateElement(viewportElement, vPatchify({viewBox: null}));
      return;
    }

    const { error, viewBoxUpdate } = applyTransformations(
      transformations,
      viewBoxCoords
    );
    if (error) console.error(error);
    if (viewBoxUpdate) updateElement(
      viewportElement,
      vPatchify({ viewBox: viewBoxUpdate })
    );
  });

  // Initialize the channel `attributeUpdates`.
  const attributeUpdates = stereo();
  attributeUpdates.on('update', (patch) => {
    updateElement(viewportElement, patch);
  });

  // Catch and display errors.
  [
    initialViewBoxCoords, viewBoxTransformations, attributeUpdates
  ].forEach((channel) => channel.catch(console.error.bind(console)));

  // Export data.
  return { viewBoxTransformations, attributeUpdates, initialViewBoxCoords };
}
