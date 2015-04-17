import stereo from 'stereo';
import vNodify from './tools/vNodify';

function model () {
  const updates = stereo();
  return { updates };
}

model.attributeChangedCallback = function attributeChangedCallback(attribute) {
  this.model.updates.emit(attribute, {vNode: vNodify(this)});
};

export default model;
