var asObject = require('as/object');

module.exports = {

  entry: asObject([
    'core',
  ].map(function(name) { return {
    key: name,
    value: ('./source/' +
      (name === 'core' ? '' : 'plugins/') +
      name + '.js'
    )
  }; })),

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
      include: __dirname + '/source/'
    }
  ] }

};
