var asObject = require('as/object');
var assign = require('101/assign');

module.exports = {

  entry: assign(
    {
      register: './module/register.js',
    },
    asObject([
      'scale',
      'target',
      'viewport',
    ].map(function(name) {return {
      key: name,
      value: './module/plugins/' + name + '.js',
    };}))
  ),

  output: {
    path: 'dist',
    filename: 'interactive-svg.[name].js',
    libraryTarget: 'umd',
    library: ['interactiveSvg', '[name]'],
  },

  devtool: 'source-map',

  module: { loaders: [
    {
      loader: 'babel',
      test: /\.js$/,
      include: /\/module(\/|\.js$)/,
      query: { presets: ['es2015'] },
    }
  ] }
};
