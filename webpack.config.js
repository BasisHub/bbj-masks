const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    "string-mask": {
      import: './src/StringMask/index.js',
      filename: "string-mask.js",
      library: {
        name: ["BBj", "Masks", "String"],
        type: 'umd',
        umdNamedDefine: true
      },
    },

    "string-mask.min": {
      import: './src/StringMask/index.js',
      filename: "string-mask.min.js",
      library: {
        name: ["BBj", "Masks", "String"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "date-mask": {
      import: './src/DateMask/index.js',
      filename: "date-mask.js",
      library: {
        name: ["BBj", "Masks", "Date"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "date-mask.min": {
      import: './src/DateMask/index.js',
      filename: "date-mask.min.js",
      library: {
        name: ["BBj", "Masks", "Date"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "number-mask": {
      import: './src/NumberMask/index.js',
      filename: "number-mask.js",
      library: {
        name: ["BBj", "Masks", "Number"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "number-mask.min": {
      import: './src/NumberMask/index.js',
      filename: "number-mask.min.js",
      library: {
        name: ["BBj", "Masks", "Number"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "bbj-masks": {
      import: './src/index.js',
      filename: "bbj-masks.js",
      library: {
        name: ["BBj", "Masks"],
        type: 'umd',
        umdNamedDefine: true
      }
    },

    "bbj-masks.min": {
      import: './src/index.js',
      filename: "bbj-masks.min.js",
      library: {
        name: ["BBj", "Masks"],
        type: 'umd',
        umdNamedDefine: true
      }
    }
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    globalObject: `(typeof self !== 'undefined' ? self : this)`
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
