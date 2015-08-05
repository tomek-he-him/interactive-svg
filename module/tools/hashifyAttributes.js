const asObject = require('as/object');
const arrayFrom = require('array-from');

export default function hashifyAttributes(attributes) {
  return asObject(
    arrayFrom(attributes).map((attribute) => ({
      key: attribute.name,
      value: attribute.value,
    }))
  );
}
