const path = require(`path`);
let _dirname;
module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(_dirname, `public`)
  },
  devtool: `source-map`,
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  devServer: {
    contentBase: path.join(_dirname, `public`),
    publicPath: `http:/localhost:8080/`,
    hot: true,
    compress: true
  }
};
