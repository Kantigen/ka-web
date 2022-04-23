import browserify from 'browserify';
import watchify from 'watchify';
import tsify from 'tsify';

import path, { dirname } from 'path';
import fs from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import ansi from 'ansi-colors';

const __dirname = dirname(fileURLToPath(import.meta.url));

function handleBundle(b, options) {
    return b
        .bundle()
        .on('error', function (err) {
            console.error(ansi.red('Compile error:'), err.message);
        })
        .pipe(fs.createWriteStream(path.join(options.rootDir, 'bundle.js')));
}

function getConfigJson(name) {
    const jsonPath = path.join(__dirname, '..', 'config', name + '.json');

    if (fs.existsSync(jsonPath)) {
        return JSON.parse(fs.readFileSync(jsonPath));
    } else {
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

export default function (options) {
    const plugins = [tsify];

    if (options.watch) {
        plugins.push(watchify);
    }

    var b = browserify(['./app/load.ts'], {
        extensions: ['.jsx', '.tsx'],
        paths: [path.join(options.rootDir)],
        ignoreMissing: true,

        // watchify options
        cache: {},
        packageCache: {},
        plugin: plugins,
    });

    // This transforms all the .jsx files into JavaScript.
    b.transform('babelify');
    b.transform('envify', loadConfig(options.env || process.env.KA_ENV || 'default'));
    b.transform('browserify-css', {
        global: true,
    });

    // Watchify emits 'update' events when a file has been changed and the build should run again.
    if (options.watch) {
        b.on('update', function () {
            console.log('Something changed - rebuilding.');
            handleBundle(b, options);
        });

        b.on('log', function (msg) {
            console.log(msg);
        });
    }

    return handleBundle(b, options);
}
