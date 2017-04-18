const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');

/**
 * Higher order function to create gulp function that generates JSdocs from parsed files.
 * @param  {string|string[]} inPath The globs to the files from which the docs should be generated
 * @param  {string} outPath The destination path for the docs
 * @return {function} Function that can be used as a gulp task
 */
function createGenerateDocs(inPath, outPath) {
    if (!inPath) {
        throw new Error('Input path(s) argument is required');
    }

    if (!outPath) {
        throw new Error('Output path argument is required');
    }

    const jsDocConfig = {
        opts: {
            destination: outPath,
        },
    };

    return function generateDocs(done) {
        gulp.src(inPath, { read: false })
            .pipe(jsdoc(jsDocConfig, done));
    };
}

module.exports = {
    createGenerateDocs,
};
