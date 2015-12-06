/*Project Vars*/
var html_dir = ['./*.html', './*.php', './**/*.html', './**/*.php'],
    less_dir = ['./less/style.less'],
    js_dir = ['./bower_components/jquery/dist/jquery.min.js', 
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './js/scripts.js'],
    js_output_dir = './public/js',
    css_dir = './public/css';

/*Gulp Requires*/
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    path = require('path'),
    bootlint  = require('gulp-bootlint'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    cat = require('gulp-concat'),
    sass = require('gulp-sass');

/*Watch Task*/

gulp.task('watch', function() {
    gulp.watch(html_dir, ['bootlint']);
    gulp.watch('./scss/style.scss', ['sass']);
    gulp.watch(js_dir, ['js-build-dev']);
});

gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

/*Compile JS*/
gulp.task('js-build', function() {
  return gulp.src(js_dir)
    .pipe(uglify())
    .pipe(cat('scripts.min.js'))
    .pipe(gulp.dest(js_output_dir));
});

/*Compile JS UNMINIFIED!!*/
gulp.task('js-build-dev', function() {
  return gulp.src(js_dir)
    .pipe(cat('scripts.min.js'))
    .pipe(gulp.dest(js_output_dir));
});

/*Bootlint*/
gulp.task('bootlint', function() {
	return gulp.src(html_dir)
                .pipe(bootlint({disabledIds: ['E001', 'W001', 'W002', 'W003', 'W005']}));
	
});
/*JS Lint*/
gulp.task('jshint', function() {
  return gulp.src(js_dir)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});