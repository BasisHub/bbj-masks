const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require("path");

module.exports = {
  entry: {
    "bbj-masks": "./src/Masks.js",
    "bbj-masks.min": "./src/Masks.js"
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "BBj",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
};
