import emitter from 'contra/emitter';

const attributeStream = emitter();

function createdCallback() {
  console.log('created!'); }

function attributeChangedCallback(name, oldValue, newValue) {
  console.log(
    `attribute ${name} changed from ${oldValue} to ${newValue}!`); }

export default {
  elementPrototype: Object.assign(
    Object.create(HTMLElement.prototype),
    { createdCallback, attributeChangedCallback }) };
