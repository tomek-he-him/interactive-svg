export default function diffAttributes(a, b) {
  let result = {};

  let aProperties = [];
  for (let property in a) if (a.hasOwnProperty(property)) {
    if (!b.hasOwnProperty(property)) result[property] = null;
    else if (b[property] !== a[property]) result[property] = b[property];
    aProperties.push(property);
  }

  for (let property in b) if (b.hasOwnProperty(property)) {
    if (!aProperties.includes(property)) result[property] = b[property];
  }

  return result;
}
