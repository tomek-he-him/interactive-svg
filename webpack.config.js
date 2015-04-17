module.exports = {

  entry: './source/drawingBoard.js',

  output: {
    path: 'dist',
    filename: 'drawingBoard.js',
    libraryTarget: 'umd',
    library: 'DrawingBoard'
  },

  devtool: 'source-map',

  module: { loaders: [
    {
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }
  ] }

};
