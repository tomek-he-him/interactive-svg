module.exports = (transformations) =>
  function updateTransformation(transformation) {
    const priority = transformation.priority;
    const transformFunction = transformation.transformFunction;
    const index = parseInt(priority, 10);

    if (transformFunction === null) {
      // Delete the transformation if the `transformFunction` is null.

      delete transformations[index];  // eslint-disable-line no-param-reassign
      // TODO: Get rid of the need for mutating things!
    } else if (typeof transformFunction !== 'function') {
      // Validate the transformFunction.

      throw new TypeError(
        '<drawing-board> view: Expected a `{Function|Null} ' +
        'transformation.transformFunction`.'
      );
    } else {
      // Save the transformation.

      transformations[index] = transformFunction;  // eslint-disable-line no-param-reassign
        // TODO: Get rid of the need for mutating things!
    }
  }
;
