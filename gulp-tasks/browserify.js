'use strict';

var browserify = require('browserify');
var watchify = require('watchify');

var gutil = require('gulp-util');

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

function handleBundle(b, options) {
    return b
        .bundle()
        .on('error', function(err) {
            gutil.log(gutil.colors.red('Browserify compile error:'), err.message);
            this.emit('end');
        })
        .pipe(fs.createWriteStream(path.join(options.rootDir, 'bundle.js')));
}

function getConfigJson(name) {
    try {
        return require(path.join(__dirname, '..', 'config', name + '.json'));
    } catch (e) {
        throw 'Unknown KA_ENV: ' + name;
    }
}

function loadConfig(env) {
    console.log('Loading config: ' + env);
    var config = _.merge(
        {},
        { NODE_ENV: 'production' },
        getConfigJson('default'),
        env !== 'default' ? getConfigJson(env) : {}
    );
    console.log('Building with config: ', config);
    return config;
}

module.exports = function(options) {
    var b = browserify(['./app/js/load.js'], {
        extensions: ['.jsx'],
        paths: [path.join(options.rootDir, 'app')],
        ignoreMissing: true,

        // watchify options
        cache: {},
        packageCache: {},
        plugin: options.watch ? [watchify] : [],
    });

    // This transforms all the .jsx files into JavaScript.
    b.transform('babelify');
    b.transform('envify', loadConfig(options.env || process.env.KA_ENV || 'default'));
    b.transform('browserify-css', {
        global: true,
    });

    // Watchify emits 'update' events when a file has been changed and the build should run again.
    if (options.watch) {
        b.on('update', function() {
            gutil.log('Something changed - rebuilding.');
            handleBundle(b, options);
        });

        b.on('log', function(msg) {
            gutil.log(msg);
        });
    }

    return handleBundle(b, options);
};
