/**
 * Created by lvn on 29/08/16.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
require('gulp-release-easy')(gulp, {releaseBranch: 'master'});
var sass = require('gulp-sass');
var gulpSequence = require('gulp-sequence');
var del = require('del');

gulp.task('clean', function () {
    return del(['dist/*.*']);
});

// JS
gulp.task('js', function () {
    return gulp.src(['src/_app.js', 'src/services/**/*.js', '!src/**/*.spec.js'])
        .pipe($.angularFilesort())
        .pipe($.concat('moment-calendar-2.js'))
        .pipe($.ngAnnotate())
        .pipe($.wrap('(function(){\n    \'use strict\';\n    <%= contents %>\n})();\n\n'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-min', function () {
    return gulp.src('dist/moment-calendar-2.js')
        .pipe($.uglify())
        .pipe($.rename('moment-calendar-2.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-js', function (cb) {
    return gulpSequence('js', 'js-min', cb);
});

// BUILD
gulp.task('build', ['clean','build-js']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['build-js']);
});

gulp.task('server', ['build'], function () {
    return gulp.src(['demo', 'node_modules', 'dist'])
        .pipe($.webserver({
            port: 8080,
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['server'], function () {
    gulp.watch('src/**/*.js', ['build']);
});