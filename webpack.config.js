var asObject = require('as/object');
var assign = require('101/assign');

module.exports = {

  entry: assign(
    {
      drawingBoard: './source/core.js'
    },
    asObject([
      'scale',
      'viewport'
    ].map(function(name) { return {
      key: 'drawingBoard.' + name,
      value: './source/plugins/' + name + '.js'
    }; }))
  ),

  output: {
    path: 'dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: ['drawingBoard', '[name]']
  },

  devtool: 'source-map',

  module: { loaders: [
    {
      loader: 'babel-loader',
      test: /\.js$/,
      include: __dirname + '/source/'
    }
  ] }

};
