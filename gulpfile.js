var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var istanbulTransform = require('browserify-istanbul');
var karmaServer = require('karma').server;
var glob = require('glob');

gulp.task('coverage',['build-instrument'] , function(done) {
    karmaServer.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done);
  });
  //instruments the code to be
  gulp.task('build-instrument', function() {
    var files = glob.sync('./src/**.js');

    return browserify({
      debug: false
    })
    .add(files)
    .transform(istanbulTransform({
      ignore: ['**/node_modules/**', '**/test/**', '**/tests/**','**/**.handlebars']
    }))
    .bundle()
    .pipe(source('instrument.js'))
    .pipe(gulp.dest('.'));
  });