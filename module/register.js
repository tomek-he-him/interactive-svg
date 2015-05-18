/* global drawingBoard */
let core;

if (
  typeof drawingBoard === 'object' &&
  typeof (core = drawingBoard.core) === 'function'
) {
  core({
    plugins: Object.keys(drawingBoard)
      .filter((key) => key !== 'core')
      .map((key) => drawingBoard[key])
    ,
  });
}

else console.warn(
  'drawingBoard.register: drawingBoard.core isn’t loaded.'
);
