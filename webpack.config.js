const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require("path");

module.exports = {
  entry: {
    "bbj-masks": "./src/index.js",
    "bbj-masks.min": "./src/index.js",

    "bbj-masks.bundle": "./src/bundle.js",
    "bbj-masks.bundle.min": "./src/bundle.js"
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: ["BBj", "Masks"],
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
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
