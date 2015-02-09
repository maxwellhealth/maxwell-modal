'use strict';
var gulp = require('gulp'),
   browserify  = require('browserify'),
   watchify = require('watchify'),
   buffer = require('vinyl-buffer'),
   sourcemaps = require('gulp-sourcemaps'),
   jshint = require('gulp-jshint'),
   jasmine = require('gulp-jasmine'),
   source  = require('vinyl-source-stream');
  // , $  = require('gulp-load-plugins')();
  
function watchifier(entryPath,entryFile, destPath) {
  var b = browserify([entryPath],{ cache: {}, packageCache: {}, fullPaths: true,debug: true});
  var clientStream = watchify(b)
  .on('error',function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('error',args);
    // Keep gulp from hanging on this task
    this.emit('end');
  });
  function rebundle () {
    return clientStream.bundle(function(err){
      if (err) {
        console.log(err);
      } 
    })
    .pipe(source(entryFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write()) // writes .map file
    .pipe(gulp.dest(destPath));
    // .pipe($.notify(completeMessage));
  }
  clientStream.on('update', rebundle);
  
  return rebundle();
}

// gulp.task('test', function() {
//   return gulp.src('app/tests/**/*.js', {read: false})
//     .pipe(mocha({
//        reporter: 'spec',
//        timeout: 10000
//     }));
// });


gulp.task('lint', function() {
  gulp.src(['src/**/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('watch',['lint','watchify'], function(){
  gulp.watch(['src/**/**'], [  'lint' ]);
  // gulp.watch('public/src/sass/**', [ 'sass' ]);
});

gulp.task('watchify',function() {
  watchifier('./src/app.js','app.js','js','Scripts Complete');
});
