var istanbul = require('browserify-istanbul');
// Karma configuration
// Generated on Fri Nov 21 2014 13:33:54 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // note the browserify framework is required
    frameworks: ['browserify','jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'tests/**/**.js'
      // the instrumented code from istanbul
      // './instrument.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**': ['sourcemap','browserify'],
      'src/**/**.js': ['sourcemap','browserify','coverage']

    },

    browserify: {
      transform: ["hbsfy","browserify-istanbul"],
      debug: true,

      // don't forget to register the extensions
      extensions: ['.js','.handlebars', '.jsx', '.coffee']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // here the coverage reporter would be running to output the final coverage report
    reporters: ['dots','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browserNoActivityTimeout: 20000,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],
    coverageReporter: {
      reporters:[
        {type: 'html', dir:'coverage/'},
        {type: 'text'},
        {type: 'lcov'},
        {type: 'text-summary'}
      ]
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};