'use strict';

var gulp    = require('gulp');

var ghPages = require('gulp-gh-pages');

var filesToMove = [
    './build/**/*',
    'index.html'
];

module.exports.copyFiles = function() {
    return gulp.src(filesToMove, {base : './'})
        .pipe(gulp.dest('dist'));
};

module.exports.pushToGithub = function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages({
            remoteUrl : 'https://github.com/Kantigen/kantigen.github.io',
            branch    : 'master',
            force     : true
        }));
};
