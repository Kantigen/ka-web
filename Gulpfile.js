'use strict';

const { series } = require('gulp');
const gulpTasks   = require('./gulp-tasks');

function browserify() {
    return gulpTasks.browserify({
        rootDir : __dirname,
        watch   : true
    });
}

function browserifyWithoutWatch() {
    return gulpTasks.browserify({
        rootDir : __dirname,
        watch   : false
    });
}

function clean() {
    return gulpTasks.clean();
}

function cssify() {
    return gulpTasks.cssify();
}

function lint() {
    return gulpTasks.lint();
}

function server(done) {
    return gulpTasks.server(done);
}

module.exports.server = server;
module.exports.lint = lint;
module.exports.devWithServer = series(browserify, cssify, server);
module.exports.dev = series(browserify, cssify);
module.exports.cssify = cssify;
module.exports.clean = clean;
module.exports.build = series(browserifyWithoutWatch, cssify);
module.exports.browserify = browserify;
module.exports.browserifyWithoutWatch = browserifyWithoutWatch;
module.exports.default = module.exports.build;
