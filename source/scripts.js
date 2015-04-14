import 'babel/polyfill';

import _model from './scripts/model';
import vNodify from './scripts/tools/vNodify';
import hashifyAttributes from './scripts/tools/hashifyAttributes';

const _tools = { vNodify, hashifyAttributes };

const DrawingBoard =
  document.registerElement('drawing-board', {
    prototype: _model._elementProto });

export default { DrawingBoard, _model, _tools };
