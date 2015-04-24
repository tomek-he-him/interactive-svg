var asObject = require('as/object');
var assign = require('101/assign');

module.exports = {

  entry: assign(
    { core: './source/core.js' },
    asObject([
      'scale',
      'target',
      'viewport',
      'autoregister'
    ].map(function(name) { return {
      key: name,
      value: './source/plugins/' + name + '.js'
    }; }))
  ),

  output: {
    path: 'dist',
    filename: 'drawingBoard.[name].js',
    libraryTarget: 'umd',
    library: ['drawingBoard', '[name]']
  },

  devtool: 'source-map',

  module: { loaders: [
    {
      loader: 'babel-loader',
      test: /\.js$/,
      include: [
        __dirname + '/source/',
        __dirname + '/node_modules/stereo/source/'
      ]
    }
  ] }

};
