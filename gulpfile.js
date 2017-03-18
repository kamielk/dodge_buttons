'use strict';
var gulp               = require('gulp');
var gutil              = require('gulp-util');
var del                = require('del');
var path               = require('path');
var concat             = require('gulp-concat');
var jshint             = require('gulp-jshint');
var autoPrefixer       = require('gulp-autoprefixer');

var config = require('./build.config');

gutil.log(config);

gulp.task('default', ['clean', 'copy','build','generate']);

gulp.task('clean', function() {
    del.sync(path.join(config.buildDir, '*'));
});

gulp.task('copy', ['copy:index','copy:views','copy:css']);

gulp.task('copy:index', function() {
    return gulp.src(path.join(config.srcDir, 'index.html'))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('copy:views',function(){
  return gulp.src(path.join(config.srcDir,'views', '*'))
      .pipe(gulp.dest(config.buildDir + '/views/'));
});

gulp.task('copy:css',function(){
  return gulp.src(path.join(config.srcDir,'css', '*.css'))
      .pipe(gulp.dest(config.buildDir + '/css/'));
});

gulp.task('build', ['build:sass']);

gulp.task('build:sass',function(){
  return gulp.src(path.join(config.srcDir,'css', 'app.scss'))
      .pipe(sass())
      .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%' ] }))
      .pipe(gulp.dest(config.buildDir + '/css/'));
});

gulp.task('generate', ['generate:view-templates']);

gulp.task('generate:view-templates',  function() {
    return gulp.src(path.join(config.srcDir, 'views', '**', '*.template.html'))
        .pipe(concat('views.template.html'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(config.buildDir));
});
