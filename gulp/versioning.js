const fs = require('fs');
const gulp = require('gulp');
const bump = require('gulp-bump');
const replace = require('gulp-replace');

/**
 * Higher order function to create gulp function that bumps the version in the package.json.
 * @param  {string} inPath Path to the project's package.json
 * @return {function} Function that can be used as a gulp task
 */
function createBumpVersion(inPath, type) {
    if (!inPath) {
        throw new Error('Input path(s) argument is required');
    }

    return function bumpVersion() {
        return gulp.src(inPath)
            .pipe(bump({ type }))
            .pipe(gulp.dest(file => file.base));
    };
}

/**
 * Higher order function to create gulp function that replaces instances of the version number
 * with the new version.
 * @param  {string|string[]} inPath The globs to the files that need to be searched
 * @param  {string} version The version to update to without a leading 'v'
 * @param  {Object} [opts={}] Extra options for replace
 * @param  {string} [opts.dropV=false] Optional flag to search/replace 'X.Y.Z' instead of 'vX.Y.Z'
 * @return {function} Function that can be used as a gulp task
 */
function createReplaceVersion(inPath, version, opts = {}) {
    if (!inPath) {
        throw new Error('Input path(s) argument is required');
    }

    if (!version) {
        throw new Error('Version argument is required');
    }

    const dropV = !!opts.dropV;
    const versionRegex = dropV ? /[0-9]+\.[0-9]+\.[0-9]+\b/g : /v[0-9]+\.[0-9]+\.[0-9]+\b/g;
    const versionString = dropV ? version : `v${version}`;

    return function updateVersions() {
        return gulp.src(inPath)
            .pipe(replace(versionRegex, versionString))
            .pipe(gulp.dest(file => file.base));
    };
}

/**
 * Sync function that takes a package.json path and extracts the version from it.
 * @param  {string} inPath Path to the project's package.json
 * @return {string}        The extracted version number in the form 'X.Y.Z'
 */
function extractPackageVersion(inPath) {
    if (!inPath) {
        throw new Error('Input path argument is required');
    }

    // Require here so we have the update version.
    const pkg = fs.readFileSync(inPath, 'utf-8');

    // index 0 is line that matched, index 1 is first control group (version number in this case)
    const matches = /"version": "([0-9]+\.[0-9]+\.[0-9]+)"/.exec(pkg);
    const version = matches[1];

    return version;
}

module.exports = {
    createBumpVersion,
    createReplaceVersion,
    extractPackageVersion,
};
