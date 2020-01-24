// eslint-disable-next-line no-undef
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['dist/bbj-masks.js', 'test/providers/**/*.js', 'test/**/*.test.js'],
    preprocessors: {
      'test/**/*.js': ['sourcemap' /** , 'babel' */],
      'dist/**/*.js': ['sourcemap']
    },
    // babelPreprocessor: {
    //   options: {
    //     presets: ['@babel/preset-env'],
    //     sourceMap: 'inline',
    //   },
    //   filename: function(file) {
    //     return file.originalPath.replace(/\.js$/, '.es5.js')
    //   },
    //   sourceFileName: function(file) {
    //     return file.originalPath
    //   },
    // },
    reporters: ['mocha'],
    port: 9877, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'FirefoxHeadless', 'Edge'],
    autoWatch: false,
    concurrency: Infinity,
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    }
  })
}
