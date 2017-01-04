'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
// var babelify = require('babelify');
// var browserify = require('browserify');
// var vinylSourceStream = require('vinyl-source-stream');
// var vinylBuffer = require('vinyl-buffer');

// var plugins = require('gulp-load-plugins');

// var src = {
//   html: './app/index.html',
//   scripts: {
//     all: './app/**/*.js',
//     app: './app/app.js'
//   }
// };

// var out = {
//   file: 'app.min.js',
//   folder: './app/'
// }

// gulp.task('scripts', function() {
//   var sources = browserify({
//     entries: src.scripts.app,
//     debug: true
//   })
//   .transform(babelify.configure({presets: ['es2015']}));

//   return sources.bundle()
//   .pipe(vinylSourceStream(out.file))
//   .pipe(vinylBuffer())
//   // .pipe(plugins.sourcemaps.init({
//   //   loadmaps: true
//   // }))
//   // .pipe(plugins.ngAnnotate())
//   // .pipe(plugins.uglify())
//   // .pipe(plugins.sourcemaps.write('/', {
//   //   includeContent: true
//   // }))
//   .pipe(gulp.dest(out.folder));
//   // .pipe(plugins.connect.reload);
// });

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js' });
});

gulp.task('sass', function () {
  return gulp.src('./app/assets/*.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest('./app/assets'));
});

gulp.task('sassWatch', function () {
  gulp.watch('./app/assets/*.scss', ['sass']);
});

gulp.task('default', ['nodemon', 'sass', 'sassWatch']);
