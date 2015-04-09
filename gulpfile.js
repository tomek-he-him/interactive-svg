'use strict';

var fs = require('fs');

var del = require('del');
var webpack = require('webpack');

var gulp = require('gulp-help')(require('gulp'));
var mustache = require('gulp-mustache');
var rename = require('gulp-rename');

var common = {
  target: 'dist'
};

// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task('build',
  'Compile everything.',
  ['clean', 'scripts', 'bundle']
);

// `gulp scripts`
// -------------------------------------------------------------------------------------------------
gulp.task('scripts',
  'Compile scripts with webpack.',
  ['scripts:clean'],
  function(done) {
    webpack(require('./webpack.config.js'), done);
  }
);

gulp.task('scripts:clean', false, function(done) {
  del(common.target, done);
});

// `gulp bundle`
// -------------------------------------------------------------------------------------------------
gulp.task('bundle',
  'Compile a HTML bundle.',
  ['bundle:clean'],
  function() {
    return gulp.src('build/drawing-board.html.mustache')
      .pipe(mustache({
        templates: fs.readFileSync('source/templates.html', {encoding: 'utf-8'})
      }))
      .pipe(rename({extname: ''}))
      .pipe(gulp.dest(common.target));
  }
);

gulp.task('bundle:clean', false, function(done) {
  del(common.target, done);
});

// `gulp clean`
// -------------------------------------------------------------------------------------------------
gulp.task('clean',
  'Remove all built files.',
  ['scripts:clean']
);
