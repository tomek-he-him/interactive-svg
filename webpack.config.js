var asObject = require('as/object');
var assign = require('101/assign');

module.exports = {

  entry: assign(
    { core: './module/core.js' },
    asObject([
      'scale',
      'target',
      'viewport',
      'autoregister'
    ].map(function(name) { return {
      key: name,
      value: './module/plugins/' + name + '.js'
    }; }))
  ),

  output: {
    path: 'dist',
    filename: 'interactive-svg.[name].js',
    libraryTarget: 'umd',
    library: ['interactiveSvg', '[name]']
  },

  devtool: 'source-map',

  module: { loaders: [
    {
      loader: 'babel-loader',
      test: /\.js$/,
      include: [
        __dirname + '/module/',
        __dirname + '/node_modules/stereo/module/'
      ]
    }
  ] }

};
