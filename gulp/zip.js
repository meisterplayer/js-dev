const gulp = require('gulp');
const zip = require('gulp-zip');
const gitRev = require('git-rev');

/**
 * Higher order function to create gulp function that zips packages. The file is named as follows
 * <YYYYMMDD>(-[opts.targetName])-([opts.packageName]|default)-([opts.version|0.0.0]-<commit-short>.zip)
 * @param  {string|string[]} inPath The globs to the files that need to be included in the zip
 * @param  {string} outPath The destination path of the zip
 * @param  {Object} [opts={}] Extra options for the zip
 * @param  {string} [opts.targetName] Optional extra name to use in the zip filename
 * @param  {string} [opts.packageName='default'] Name of the package to be used in the zip filename
 * @param  {string} [opts.version='0.0.0'] Version of this build to be used in the zip filename
 * @return {function} Function that can be used as a gulp task
 */
function createZip(inPath, outPath, opts = {}) {
    if (!inPath) {
        throw new Error('Input path(s) argument is required');
    }

    if (!outPath) {
        throw new Error('Output path argument is required');
    }

    const targetName = opts.targetName ? `-${opts.targetName}` : '';
    const packageName = opts.name || 'default';
    const version = opts.version || '0.0.0';

    return function zipPackage() {
        const today = new Date();
        let month = (today.getMonth() + 1);
        month = (month > 9 ? '' : '0') + month;

        let day = today.getDate();
        day = (day > 9 ? '' : '0') + day;

        const date = `${today.getFullYear()}${month}${day}`;

        gitRev.short((short) => {
            const fileName = `${date}${targetName}-${packageName}-v${version}-${short}.zip`;

            return gulp.src(inPath)
                .pipe(zip(fileName))
                .pipe(gulp.dest(outPath));
        });
    };
}

module.exports = {
    createZip,
};
