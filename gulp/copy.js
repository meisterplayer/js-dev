const gulp = require('gulp');

/**
 * Higher order function to create gulp function that copies files from one location to another.
 * @param  {string|string[]} inPath The globs to the files that need to be copied
 * @param  {string} outPath The destination path for the copies
 * @return {function} Function that can be used as a gulp task
 */
function createCopy(inPath, outPath) {
    if (!inPath) {
        throw new Error('Input path(s) argument is required');
    }

    if (!outPath) {
        throw new Error('Output path argument is required');
    }

    return function copyFiles() {
        return gulp.src(inPath).pipe(gulp.dest(outPath));
    };
}

module.exports = {
    createCopy,
};
