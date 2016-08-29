//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './src',

    files: [
      //'../node_modules/requirejs/require.js',
      '../node_modules/moment/moment.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'services/**/*.js',
      'node/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'node/**/*.js': [ 'browserify' ]
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
