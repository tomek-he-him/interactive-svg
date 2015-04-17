const defaultPlugins = new Set([
  function scale(model) {
    model.updates.on('scale', (...args) => {
      console.log('Scale plugin gets:', ...args);
    });
  }
]);

export { defaultPlugins as default };
