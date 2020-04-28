'use strict';

const { series } = require('gulp');
const gulpTasks = require('./gulp-tasks');

function browserify() {
    return gulpTasks.browserify({
        rootDir: __dirname,
        watch: true,
    });
}

function browserifyWithoutWatch() {
    return gulpTasks.browserify({
        rootDir: __dirname,
        watch: false,
    });
}

function clean() {
    return gulpTasks.clean();
}

function server(done) {
    return gulpTasks.server(done);
}

module.exports.server = server;
module.exports.devWithServer = series(browserify, server);
module.exports.dev = series(browserify);
module.exports.clean = clean;
module.exports.build = series(browserifyWithoutWatch);
module.exports.browserify = browserify;
module.exports.browserifyWithoutWatch = browserifyWithoutWatch;
module.exports.default = module.exports.build;
