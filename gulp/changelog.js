const gulp = require('gulp');
const replace = require('gulp-replace');
const conventionalChangelog = require('gulp-conventional-changelog');

/**
 * Higher order function to create gulp function that generates/updates the changelog of a
 * project.
 * @param  {string} inPath The path for the project's changelog
 * @return {function} Function that can be used as a gulp task
 */
function createGenerateLog(inPath) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    return function generateLog() {
        return gulp.src(inPath)
            .pipe(conventionalChangelog({ preset: 'angular' }))
            .pipe(gulp.dest(file => file.base));
    };
}

/**
 * Higher order function to create gulp function that strips links to the git repository from
 * changelogs generated by conventional changelog.
 * @param  {string} inPath The path for the project's changelog
 * @return {function} Function that can be used as a gulp task
 */
function createFormatChangelog(inPath) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    return function formatChangelog() {
        return gulp.src(inPath)
            // Replace all version compare links.
            .pipe(replace(/\(http.*\) /g, ' '))
            // Replace all commit links.
            .pipe(replace(/ \(\[.*/g, ''))
            .pipe(gulp.dest(file => file.base));
    };
}

module.exports = {
    createFormatChangelog,
    createGenerateLog,
};
