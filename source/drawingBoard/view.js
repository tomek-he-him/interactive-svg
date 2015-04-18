import stereo from 'stereo';

import updateTransformation from './view/updateTransformation';
import applyTransformations from './applyTransformations';
import vPatchify from '../tools/vPatchify';
import updateElement from '../tools/updateElement';

export default function view (viewportElement) {

  // Initialize the channel `viewBoxTransformations`.
  const viewBoxTransformations = stereo();
  const transformationsChain = [];
  viewBoxTransformations.on('update',
    updateTransformation(transformationsChain)
  );
  viewBoxTransformations.on(['update', 'touch'], () => {
    const { error, viewBoxUpdate } = applyTransformations(transformationsChain);
    if (error) console.warn(error);
    if (viewBoxUpdate) updateElement(
      viewportElement,
      vPatchify({ viewBox: viewBoxUpdate })
    );
  });
}
