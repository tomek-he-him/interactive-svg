import vNodify from '../tools/vNodify';

const stereo = require('stereo');
const arrayFrom = require('array-from');

function model (root) {
  const attributeChanges = stereo();

  const vNode = vNodify(root);
  arrayFrom(root.attributes).forEach((attribute) => {
    attributeChanges.emit(attribute.name, vNode);
  });

  return { attributeChanges };
}

model.attributeChangedCallback = function attributeChangedCallback(attribute) {
  this.model.attributeChanges.emit(attribute, vNodify(this));
};

export default model;
