import 'babel/polyfill';

import _model from './scripts/model';
import vNodify from './scripts/tools/vNodify';
import hashifyAttributes from './scripts/tools/hashifyAttributes';
import { rendererPlugins, intentPlugins } from './scripts/pluginRegistry';

const DrawingBoard =
  document.registerElement('drawing-board', {
    prototype: _model._elementProto
  })
;

const _tools = { vNodify, hashifyAttributes };

export {
  rendererPlugins,
  intentPlugins,
  DrawingBoard,
  _model,
  _tools
};
