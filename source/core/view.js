import stereo from 'stereo';

import updateTransformation from './view/updateTransformation';
import applyTransformations from './view/applyTransformations';
import vPatchify from '../tools/vPatchify';
import updateElement from '../tools/updateElement';

export default function view (viewportElement) {

  // Initialize the channel `initialViewBoxCoords`.
  let viewBoxCoords = null;
  const initialViewBoxCoords = stereo();
  initialViewBoxCoords.on('update', (coords) => {
    viewBoxCoords = coords;
    viewBoxTransformations.emit('touch');
  });

  // Initialize the channel `viewBoxTransformations`.
  const viewBoxTransformations = stereo();
  const transformations = [];
  viewBoxTransformations.on('update',
    updateTransformation(transformations)
  );
  viewBoxTransformations.on(['update', 'touch'], () => {
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
  attributeUpdates.on(['update', 'touch'], (patch) => {
    updateElement(viewportElement, patch);
  });

  // Catch and display errors.
  [
    initialViewBoxCoords, viewBoxTransformations, attributeUpdates
  ].forEach((channel) => channel.catch(console.error.bind(console)));

  // Export data.
  return { viewBoxTransformations, attributeUpdates, initialViewBoxCoords };
}
