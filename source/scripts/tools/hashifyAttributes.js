import asObject from 'as/object';

export default function hashifyAttributes(element) {
  return asObject(
    Array.from(element.attributes).map((attribute) => ({
      key: attribute.name,
      value: attribute.value }))); }
