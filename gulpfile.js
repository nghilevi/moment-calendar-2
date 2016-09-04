/**
 * Created by lvn on 29/08/16.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
require('gulp-release-easy')(gulp, {releaseBranch: 'master'});
var sass = require('gulp-sass');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('clean', function () {
    return del(['dist/*.*']);
});

gulp.task('minify', function () {
    return gulp.src('dist/moment-calendar-2.js')
        .pipe($.uglify())
        .pipe($.rename('moment-calendar-2.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function () {
    return browserify('./src/api.js',{
            standalone: 'Moment-calendar-factory'
        })
        .bundle()
        .pipe(source('moment-calendar-2.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (cb) {
    return gulpSequence('clean', 'browserify', 'minify', cb);
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
    gulp.watch('src/**/*.js', ['browserify']);
});