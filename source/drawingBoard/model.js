import stereo from 'stereo';
import vNodify from './tools/vNodify';

function model (root) {
  const updates = stereo();

  const eventData = {
    vNode: vNodify(root)
  };
  Array.from(root.attributes).forEach((attribute) => {
    updates.emit(attribute.name, eventData);
  });

  return { updates };
}

model.attributeChangedCallback = function attributeChangedCallback(attribute) {
  this.model.updates.emit(attribute, {
    vNode: vNodify(this)
  });
};

export default model;
