'use strict'
var gulp = require('gulp'),
    fs = require('fs'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    ejs = require('gulp-ejs'),
    gutil = require('gulp-util'),
    convert = require('gulp-convert'),
    jsonD = './dev/json/test.json',
    tmpD = './dev/tmp/index.ejs',
    json = JSON.parse(fs.readFileSync(jsonD)),
    pages = json.pages;

// csv => json
gulp.task('csv2json', function() {
  gulp.src(['./dev/csv/*.csv'])
    .pipe(convert({
        from: 'csv',
        to: 'json'
    }))
    .pipe(gulp.dest('./dev/json'))
});

// ejs
gulp.task('ejs', function() {

  for (var i = 0; i < pages.length; i++) {

    var id = pages[i].id;

    gulp.src('./dev/tmp/index.ejs')
      .pipe(plumber())
      .pipe(ejs({
          jsonD: pages[i]
      }).on('error', gutil.log))
      .pipe(rename(id + '.html'))
      .pipe(gulp.dest('./public'))
  };
});

gulp.task('default', function() {
  console.log('hello');
});
