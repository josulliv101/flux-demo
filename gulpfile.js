var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  connect = require('gulp-connect-multi')(),

  $ = require('gulp-load-plugins')();

// Scripts
gulp.task('scripts', function () {
    return  browserify({
      entries: ['./js/app.js']
    })

    .on('error', function(log) {
      console.log(log);
    })
    .bundle({debug:true})
    .on('error', function(log) {
      console.log(log);
    })
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('js'))

    .pipe(connect.reload())

    .on('error', $.util.beep);
});
//styles
gulp.task('styles', function() {
  //for now just reload the server
  connect.reload();
});

gulp.task('test', function() {
  return gulp.src('*.js', {read: false})
  .pipe($.shell([
    'jest'
  ]));
});
// Connect
gulp.task('connect', connect.server({
    root: [__dirname],
    port: 9002,
    livereload: true,
    open:{
    browser:  'Google Chrome' //'chrome'
  }
}));

gulp.task('watch', ['scripts', 'connect'], function () {
    gulp.watch(['js/**/*.js','js/**/*.jsx','!js/bundle.js'], ['scripts','test']);
    gulp.watch(['css/**.css'], ['styles']);
});

gulp.task('default', ['watch']);