import asObject from 'as/object';
import arrayFrom from 'array-from';

export default function hashifyAttributes(attributes) {
  return asObject(
    arrayFrom(attributes).map((attribute) => ({
      key: attribute.name,
      value: attribute.value,
    }))
  );
}
