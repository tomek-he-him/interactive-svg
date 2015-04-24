'use strict';

var del = require('del');
var webpack = require('webpack');

var gulp = require('gulp-help')(require('gulp'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpackConfig = require('./webpack.config.js');

// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task('build',
  'Compile everything.',
  ['clean', 'scripts', 'minify']
);

// `gulp minify`
// -------------------------------------------------------------------------------------------------
gulp.task('minify',
  'Minify compiled scripts.',
  ['scripts:clean', 'scripts'],
  function() {
    return gulp.src(webpackConfig.output.path + '/*.js')
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(webpackConfig.output.path))
    ;
  }
);

// `gulp scripts`
// -------------------------------------------------------------------------------------------------
gulp.task('scripts',
  'Compile scripts with webpack.',
  ['scripts:clean'],
  function(done) {
    webpack(webpackConfig, done);
  }
);

gulp.task('scripts:clean', false, function(done) {
  del(webpackConfig.output.path + '/**/*.{js,js.map}', done);
});

// `gulp clean`
// -------------------------------------------------------------------------------------------------
gulp.task('clean',
  'Remove all built files.',
  ['scripts:clean']
);
