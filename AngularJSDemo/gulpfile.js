/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    filter = require('gulp-filter'),
    del = require('del'),
    config = require('./gulpconfig.json');

var errorHandler = function (error) {
    console.log(error);
    this.emit('end');
}

var resolveMinifiedPath = function (path) {
    var params = path.split("/");
    var file = params.splice(params.length - 1, 1)[0];
    var newPath = params.join("/") + "/";

    return {
        file: file,
        path: newPath
    };
}

// #region minifcation

// Clean the distributable css directory
gulp.task('minify:clean:css', function (done) {
    del(config.files.css.dest, done);
});

// Compile out sass files and minify it
gulp.task('minify:css', ['minify:clean:css'], function () {

    var min = resolveMinifiedPath(config.files.css.min);

    return gulp.src(config.files.css.src)
        .pipe(plumber(errorHandler))
        .pipe(sass())
        .pipe(gulp.dest(config.files.css.dest))
        .pipe(cssmin())
        .pipe(concat(min.file))
        .pipe(gulp.dest(min.path));
});
gulp.task('minify:watch', function () {
    gulp.watch(config.files.css[config.files.css.watch], ['minify:css']);
});
gulp.task('default', ['minify:css', 'minify:watch'], function () { });