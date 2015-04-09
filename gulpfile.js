/*jshint esnext: false, globalstrict: true */
"use strict";

var gulp = require("gulp-help")(require("gulp"));
var babel = require("gulp-babel");
var del = require("del");




// `gulp build`
// -------------------------------------------------------------------------------------------------

gulp.task("build"
  , "Compile everything."
  , ["clean", "scripts"]
  );




// `gulp scripts`
// -------------------------------------------------------------------------------------------------

var scripts =
  { source: "source/**/*.js"
  };

gulp.task("scripts"
  , "Compile ES6 and ES5 scripts."
  , ["scripts:es6", "scripts:es5"]
  );

gulp.task("scripts:es6", false
  , ["scripts:clean"]
  , function () {
    return gulp.src(scripts.source)
      .pipe(gulp.dest("dist.es6"))
      ;
    }
  );

gulp.task("scripts:es5", false
  , ["scripts:clean"]
  , function () {
    return gulp.src(scripts.source)
      .pipe(babel())
      .pipe(gulp.dest("dist.es5"))
      ;
    }
  );

gulp.task("scripts:clean", false, function (done) {
  del(scripts.source, done);
  });


// `gulp clean`
// -------------------------------------------------------------------------------------------------

gulp.task("clean"
  , "Remove all built files."
  , ["scripts:clean"]
  );
