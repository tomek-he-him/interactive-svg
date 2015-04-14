'use strict';

var fs = require('fs');

var del = require('del');
var webpack = require('webpack');

var gulp = require('gulp-help')(require('gulp'));
var mustache = require('gulp-mustache');
var rename = require('gulp-rename');
var webpackConfig = require('./webpack.config.js');

function fileToString(path) {
  return fs.readFileSync(path, { encoding: 'utf-8' }); }

// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task('build',
  'Compile everything.',
  [ 'clean', 'scripts', 'bundle' ]);

// `gulp scripts`
// -------------------------------------------------------------------------------------------------
gulp.task('scripts',
  'Compile scripts with webpack.',
  [ 'scripts:clean' ],
  function(done) {
    webpack(webpackConfig, done); });

gulp.task('scripts:clean', false, function(done) {
  del(webpackConfig.output.path + '/**/*.{js,js.map}', done); });

// `gulp bundle`
// -------------------------------------------------------------------------------------------------
gulp.task('bundle',
  'Compile a HTML bundle.',
  [ 'bundle:clean' ],
  function() {
    return gulp.src('build/drawing-board.html.mustache')
      .pipe(mustache({
        templates: fileToString('source/templates.html') }))
      .pipe(rename({ extname: '' }))
      .pipe(gulp.dest(webpackConfig.output.path)); });

gulp.task('bundle:clean', false, function(done) {
  del(webpackConfig.output.path + '/**/*.html', done); });

// `gulp clean`
// -------------------------------------------------------------------------------------------------
gulp.task('clean',
  'Remove all built files.',
  [ 'scripts:clean' ]);
