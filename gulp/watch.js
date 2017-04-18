const watch = require('gulp-watch');

/**
 * Higher order function to create gulp function that watches files and calls a callback on changes.
 * @param  {string|string[]} inPath The globs to the files that need to be watched.
 * @param  {function} callback Callback to be called when the watched files change.
 * @return {function} Function that can be used as a gulp task
 */
function createWatcher(inPath, callback) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    if (!callback) {
        throw new Error('Callback argument is required');
    }

    return function watcher() {
        watch(inPath, callback);
    };
}

module.exports = {
    createWatcher,
};
