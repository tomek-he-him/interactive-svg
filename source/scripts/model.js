import { emitter } from 'contra';
import vNodify from './tools/vNodify';
import hashifyAttributes from './tools/hashifyAttributes';
import { rendererPlugins } from './pluginRegistry';

const _modelAttributeMessageProto = {
  oldValue: null,
  newValue: null,
  _fromModel: true
};

function _modelAttributeMessage(domNode) {
  return Object.assign(
    Object.create(_modelAttributeMessageProto),
    { vNode: vNodify(domNode) }
  );
}

 /**
  * Initialize the element.
  */
function createdCallback() {

  // Create an attribute channel.
  let attributeChannel = this.attributeChannel = emitter();

  this.renderers = rendererPlugins.map((plugin) => {
    // TODO: Check if the plugin is a function.
    return plugin({ attributeChannel });
  });

  // Emit a message on the channel for every existing attribute.
  const attributeMessage = _modelAttributeMessage(this);
  const attributes = hashifyAttributes(this);
  Object.keys(attributes).forEach((attributeName) => {
    attributeChannel.emit(attributeName,
      Object.assign(
        Object.create(attributeMessage),
        { newValue: attributes[attributeName] }
      )
    );
  });
}

 /**
  * Notify about a change in attributes.
  */
function attributeChangedCallback(name, oldValue, newValue) {

  // Emit a message on the attribute channel.
  this.attributeChannel.emit(name,
    Object.assign(
      _modelAttributeMessage(this),
      { oldValue, newValue }
    )
  );
}

export default {
  _elementProto: Object.assign(
    Object.create(HTMLElement.prototype),
    { createdCallback, attributeChangedCallback }),
  _modelAttributeMessageProto,
  _modelAttributeMessage
};