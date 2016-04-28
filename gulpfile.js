'use strict';
 
var gulp = require('gulp');
var open = require('gulp-open');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var browserSync = require('browser-sync').create();
var through2 = require('through2');
var jsforce = require ('jsforce');
var SF_USERNAME = 'bs@fielo.com.dev';
var SF_PASSWORD = 'fielo01*';

gulp.task('sass', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
	  .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('jsmin', function () {
  return gulp.src('./src/scripts/*.js')
    .pipe(uglify())        
    .pipe(gulp.dest('./build/js'))
});

gulp.task('open', function(){
  var options = {app:'subl'};
  gulp.src('./src/styles/*.scss')
  .pipe(open(options));
  gulp.src('./src/scripts/*.js')
  .pipe(open(options));
});

gulp.task('zip', function(){
	return gulp.src('build/**/*')
		.pipe(zip('FieloUI.resource'))
		.pipe(gulp.dest('./pkg/staticresources'));
});

gulp.task('watch', ['open'], function () {
  gulp.watch('./src/styles/*.scss', ['sass', 'build']);
  gulp.watch('./src/scripts/*.js', ['jsmin', 'build']);
});

gulp.task('build', ['zip']);

function forceDeploy(username,password) {
    return through2.obj(function(file, enc, callback) {
      var conn;      
      conn = new jsforce.Connection({
        loginUrl : 'https://test.salesforce.com'
      });
      return conn.login(username, password).then(function() {
        return conn.metadata.deploy(file.contents).complete({
          details: true
        });
      }).then(function(res) {
        var ref, ref1;
        if ((ref = res.details) != null ? ref.componentFailures : void 0) {
          console.error((ref1 = res.details) != null ? ref1.componentFailures : void 0);
          return callback(new Error('Deploy failed.'));
        }
        return callback();
      }, function(err) {
        console.error(err);
        return callback(err);
      });
    });
 };

gulp.task ('deploy', function(){
	gulp.src ('./pkg/**/*', {base: '.'})
    	.pipe(zip('pkg.zip'))
    	.pipe(forceDeploy(SF_USERNAME, SF_PASSWORD));
});
 
gulp.task('upload', [ 'build', 'deploy' ]);

