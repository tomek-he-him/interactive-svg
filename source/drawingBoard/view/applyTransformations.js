function applyTransformation(previous, current) {
  return current(previous);
}

export default function applyTransformations(transformations) {
  // Apply transformations and validate the result.
  const viewBoxCoordinates = transformations.reduce(applyTransformation, []);
  if (!Array.isArray(viewBoxCoordinates) ||
    viewBoxCoordinates.length !== 4
    ) return {
    error: new TypeError(
      '<drawing-board> view: Every transformation functions should return a ' +
      '`{Number[4]} viewBoxCoordinates`.'
    )
  };

  return {
    viewBoxUpdate: viewBoxCoordinates.map(Number).join(' ')
  };
}