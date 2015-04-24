import stereo from 'stereo';

import updateTransformation from './view/updateTransformation';
import applyTransformations from './view/applyTransformations';
import vPatchify from '../tools/vPatchify';
import updateElement from '../tools/updateElement';

export default function view (viewportElement) {

  // Initialize the channel `viewBoxTransformations`.
  const viewBoxTransformations = stereo();
  const transformations = [];
  viewBoxTransformations.on('update',
    updateTransformation(transformations)
  );
  viewBoxTransformations.on(['update', 'touch'], () => {
    let viewBox = viewportElement.getAttribute('viewBox');
    if (!viewBox) return;

    const { error, viewBoxUpdate } = applyTransformations(
      transformations,
      viewBox.split(' ').map(Number)
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

  // Export data.
  return { viewBoxTransformations, attributeUpdates };
}
