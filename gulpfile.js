'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

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
