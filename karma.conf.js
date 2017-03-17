//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: '.',
    autoWatch: true,
    frameworks: ['jasmine', 'browserify'],
    files: [
      'node_modules/moment/moment.js',
      'src/*.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['browserify-istanbul']
    },
    coverageReporter: {
      reporters : [
        {"type": "text"},
        {"type": "html", dir: 'coverages'}
      ]
    },
    singleRun: true,
    plugins: [
      'karma-coverage',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};
