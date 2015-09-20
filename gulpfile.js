'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

var paths = {
  sassFiles: 'static/styles/sass/**/*.scss',
  sassFolder: 'static/styles/sass',
  htmlFiles: [
    '**/*.html'
  ],
  scriptFiles: [
    'static/scripts/**/*.js'
  ]
};

/* Sass Task */
gulp.task('sass', function() {
  sass(paths.sassFiles, {
    sourcemap: true,
    noCache: true,
    style: 'compressed'
  })
  .on('error', sass.logError)
  .pipe(plumber())
  .pipe(gulp.dest('build/styles'))
  .pipe(livereload());
});

/* Autoreload html */
gulp.task('html', function() {
  gulp.src(paths.htmlFiles)
    .pipe(plumber())
    .pipe(livereload());
});

/* Autoreload scripts */
gulp.task('script', function() {
  gulp.src(paths.scriptFiles)
    .pipe(plumber())
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(paths.sassFiles, ['sass']);

  gulp.watch('static/scripts', ['script']);

  gulp.watch('**/*.html', ['html']);

});

gulp.task('default', ['sass', 'watch']);