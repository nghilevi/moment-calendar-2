//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
      'node_modules/moment/moment.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'src/**/*.js': [ 'browserify' ]
    },

    browsers: ['Chrome'],

    plugins: [
      //'karma-requirejs',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
