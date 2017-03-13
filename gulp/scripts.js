'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

// profiling builds
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var serversConfig = require('./servers-config.json');//require('./servers-config').serversConfig;
var api = '';
var domain = '';

if (argv.type && typeof argv.type === 'string') {
    setServers(argv.type);
} else {
    setServers();
}

gulp.task('setServerConfigForAngularApp', function(){
  gulp.src(['./src/app/components/api/gulp/api.config.json'])
    .pipe(replace(/gulpapi/g, api))
    .pipe(replace(/gulpdomain/g, domain))
    .pipe(gulp.dest('./src/app/components/api/'));
});
//


gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['setServerConfigForAngularApp'], function() {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size());
}

// profiling builds
function setServers(buildType) {
  if (!buildType) {
    console.log("Build type not provided.");
    return setServers('dev');
  }

  if (!serversConfig[buildType]) {
    console.log("Unknown build type: " + buildType + ". Dev type will be used.");
    return setServers('dev');
  }

  if (!serversConfig[buildType].api || !serversConfig[buildType].domain) {
    console.log("No proper configuration available for build type: " + buildType);
    return;
  }

  api = serversConfig[buildType].api;
  domain = serversConfig[buildType].domain;
}
//
