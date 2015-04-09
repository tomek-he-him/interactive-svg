module.exports =
  { entry: "./source/scripts.js"
  , output:
    { path: "./dist"
    , filename: "scripts.js"
    }
  , module: {loaders:
    [ {loader: "babel-loader", test: /\.js$/, exclude: /node_modules/}
    ]}
  };
