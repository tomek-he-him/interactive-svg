'use strict';

var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var webpack = require('webpack');

var common = {
  target: 'dist'
};

// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task('build',
  'Compile everything.',
  ['clean', 'scripts']
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

// `gulp clean`
// -------------------------------------------------------------------------------------------------
gulp.task('clean',
  'Remove all built files.',
  ['scripts:clean']
);
