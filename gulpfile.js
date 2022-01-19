const gulp = require('gulp');
const bro = require('gulp-bro');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const path = require('path');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);

function cleanDist () {
  return gulp
    .src(path.join(__dirname, 'dist'), { read: false })
    .pipe(clean());
}

function watchJs () {
  return gulp.watch(['app/**/*.js'], js);
}

function watchCss () {
  return gulp.watch(['app/**/*.*css'], css);
}

function watchHtml () {
  return gulp.watch(['app/**/*.html'], html);
}

function js () {
  return gulp
    .src(path.join(__dirname, 'app', 'homeApp.js'))
    .pipe(bro())
    .pipe(rename('main.js'))
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
}

function staticCss () {
  const popeyeCss = path.join(__dirname, 'node_modules', 'angular-popeye', 'release', 'popeye.css');
  const customBootstrap = path.join(__dirname, 'scss', 'gd-bootstrap.scss');
  const cssFiles = [popeyeCss, customBootstrap];
  return gulp
    .src(cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(__dirname, 'dist', 'stylesheets')));
}

function css () {
  return gulp
    .src(path.join(__dirname, 'app', 'stylesheets', 'style.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(__dirname, 'dist', 'stylesheets')));
}

function html () {
  return gulp
    .src('app/**/*.html')
    .pipe(gulp.dest(path.join(__dirname, 'dist')));
}

module.exports = {
  dev: gulp.series(cleanDist, js, staticCss, css, html, gulp.parallel(watchJs, watchCss, watchHtml)),
  build: gulp.series(cleanDist, js, staticCss, css, html)
};
