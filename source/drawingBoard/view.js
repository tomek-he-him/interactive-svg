import stereo from 'stereo';

import updateTransformation from './view/updateTransformation';
import applyTransformations from './view/applyTransformations';
import vPatchify from './tools/vPatchify';
import updateElement from './tools/updateElement';

export default function view (viewportElement) {

  // Initialize the channel `viewBoxTransformations`.
  const viewBoxTransformations = stereo();
  const transformations = [];
  viewBoxTransformations.on('update',
    updateTransformation(transformations)
  );
  viewBoxTransformations.on(['update', 'touch'], () => {
    const { error, viewBoxUpdate } = applyTransformations(transformations);
    if (error) console.warn(error.message);
    if (viewBoxUpdate) updateElement(
      viewportElement,
      vPatchify({ viewBox: viewBoxUpdate })
    );
  });

  // Export data.
  return { viewBoxTransformations };
}
