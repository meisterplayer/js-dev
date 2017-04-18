const gulp = require('gulp');
const eslint = require('gulp-eslint');

/**
* Higher order function to create gulp function that lints files using eslint.
 * @param  {string|string[]} inPath   The globs to the files that need to be copied.
 * @param  {Object} [opts={}]  Options object to be passed to the gulp eslint plugin.
 * @return {function}   Function that can be used as a gulp task.
 */
function createLint(inPath, opts = {}) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    return function lint() {
        return gulp.src(inPath)
            .pipe(eslint(opts))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
}

module.exports = {
    createLint,
};
