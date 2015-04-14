module.exports = {

  entry: './source/scripts.js',

  output: {
    path: 'dist',
    filename: 'drawing-board.js',
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
