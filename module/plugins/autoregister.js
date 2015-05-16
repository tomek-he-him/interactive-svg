/* global drawingBoard */
if (
  typeof drawingBoard === 'object' &&
  typeof drawingBoard.core === 'object' &&
  drawingBoard.core.defaultPlugins
  ) {
  for (let plugin of Object.keys(drawingBoard)) if (plugin !== 'core') {
    drawingBoard.core.defaultPlugins.add(drawingBoard[plugin]);
  }
} else console.warn(
  'drawingBoard.autoregister: drawingBoard.core isn’t loaded.'
);
