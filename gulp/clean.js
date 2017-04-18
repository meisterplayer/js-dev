const gulp = require('gulp');
const clean = require('gulp-clean');

/**
 * Higher order function to create gulp function that cleans directories.
 * @param  {string|string[]} inPath The globs to the files/directories that need to be removed
 * @return {function} Function that can be used as a gulp task
 */
function createClean(inPath) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    return function cleanDir() {
        return gulp.src(inPath, { read: false }).pipe(clean());
    };
}

module.exports = {
    createClean,
};
