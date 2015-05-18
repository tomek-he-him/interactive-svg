import stereo from 'stereo/module';
import vNodify from '../tools/vNodify';

function model (root) {
  const attributeChanges = stereo();

  const vNode = vNodify(root);
  Array.from(root.attributes).forEach((attribute) => {
    attributeChanges.emit(attribute.name, vNode);
  });

  return { attributeChanges };
}

model.attributeChangedCallback = function attributeChangedCallback(attribute) {
  this.model.attributeChanges.emit(attribute, vNodify(this));
};

export default model;
