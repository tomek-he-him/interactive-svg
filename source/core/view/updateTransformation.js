export default function updateTransformation (transformationChain) {
  return function (transformation) {
    const { priority, transformFunction } = transformation;
    const index = parseInt(priority);

    // Delete the transformation if the `transformFunction` is null.
    if (transformFunction === null) {
      delete transformationChain[index];

    // Validate the transformFunction.
    } else if (typeof transformFunction !== 'function') {
      throw new TypeError(
        '<drawing-board> view: Expected a `{Function|Null} ' +
        'transformation.transformFunction`.'
      );

    // Save the transformation.
    } else {
      transformationChain[index] = transformFunction;
    }

  };
}
