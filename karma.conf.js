//jshint strict: false
module.exports = function(config) {
  config.set({
    basePath: '.',
    autoWatch: true,
    frameworks: ['jasmine', 'browserify'],
    files: [
      'node_modules/moment/moment.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: { 'src/**/*.js': ['browserify','coverage'] },
    singleRun: true,

    plugins: [
      'requirejs',
      'karma-requirejs',
      'karma-coverage',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      //'karma-junit-reporter'
    ]

  });
};
