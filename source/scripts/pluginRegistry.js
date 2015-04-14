export const rendererPlugins = [];
export const intentPlugins = [];

rendererPlugins.push((component) => {
  component.attributeChannel.on('scale', console.log.bind(console));
  });
