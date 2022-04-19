import gulp from 'gulp';
import * as gulpTasks from './gulp-tasks/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function browserify() {
    return gulpTasks.browserify({
        rootDir: __dirname,
        watch: true,
    });
}

export function browserifyWithoutWatch() {
    return gulpTasks.browserify({
        rootDir: __dirname,
        watch: false,
    });
}

export function clean() {
    return gulpTasks.clean();
}

export function server(done) {
    return gulpTasks.server(done);
}

export const devWithServer = gulp.series(browserify, server);
export const dev = gulp.series(browserify);
export const build = gulp.series(browserifyWithoutWatch);
export default build;
