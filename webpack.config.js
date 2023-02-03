const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

const dist = file => path.resolve(__dirname, 'dist') + file;
module.exports = {
  mode: 'development',
  entry: {
    "string-mask": { import: './src/StringMask/index.js', filename: "string-mask.js" },
    "string-mask.min": { import: './src/StringMask/index.js', filename: "string-mask.min.js" },
    "date-mask": { import: './src/DateMask/index.js', filename: "date-mask.js" },
    "date-mask.min": { import: './src/DateMask/index.js', filename: "date-mask.min.js" },
    "number-mask": { import: './src/NumberMask/index.js', filename: "number-mask.js" },
    "number-mask.min": { import: './src/NumberMask/index.js', filename: "number-mask.min.js" },
    "masks": { import: './src/index.js', filename: "bbj-masks.js" },
    "masks.min": { import: './src/index.js', filename: "bbj-masks.min.js" }
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: ['BBj', 'Masks'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { modules: false }]]
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
}
