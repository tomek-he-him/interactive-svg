const defaultPlugins = new Set([
  function scale(model) {
    model.attributeChanges.when('scale', (...args) => {
      console.log('Scale plugin gets:', ...args);
    });
  }
]);

export { defaultPlugins as default };
