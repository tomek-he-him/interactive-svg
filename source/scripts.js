import 'babel/polyfill';

import model from 'scripts/model';
import vNodify from 'tools/vNodify';
import hashifyAttributes from 'tools/hashifyAttributes';

const tools = { vNodify, hashifyAttributes };

const DrawingBoard =
  document.registerElement('drawing-board', {
    prototype: model.prototype });

export default { DrawingBoard, model, tools };
