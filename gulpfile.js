var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  connect = require('gulp-connect-multi')(),
  sass = require('gulp-sass'),

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
    //.pipe(streamify(uglify()))
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('js'))

    .pipe(connect.reload())

    .on('error', $.util.beep);
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
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
/*
    middleware: function(connect, o) {
        return [ (function() {
            var url = require('url');
            var proxy = require('proxy-middleware');
            var options = url.parse('http://10.11.13.49:8181/site');
            options.route = '/site';
            return proxy(options);
        })() ];
    },
    */
    open:{
    browser:  'Google Chrome' //'chrome'
  }
}));

gulp.task('watch', ['scripts', 'connect'], function () {
    gulp.watch(['js/**/*.js','js/**/*.jsx','!js/bundle.js'], ['scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['css/**.css'], ['styles']);
});

gulp.task('default', ['watch']);
