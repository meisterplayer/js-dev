const gulp = require('gulp');
const argv = require('yargs').argv;

const tripleGulp = require('./index').gulp;

// Patch is the default bump.
let type = 'patch';

const userType = argv.type ? argv.type.toLowerCase() : null;
if (userType && (userType === 'major' || userType === 'minor')) {
    type = userType;
}

gulp.task('bump-version', tripleGulp.versioningModule.createBumpVersion('./package.json', type));
gulp.task('changelog', tripleGulp.changelogModule.createGenerateLog('./CHANGELOG.md'));
gulp.task('js-docs', tripleGulp.jsdocModule.createGenerateDocs(['./gulp/*.js'], './docs/js-docs'));
gulp.task('lint', tripleGulp.eslintModule.createLint(['./index.js', './gulp/**/*.js']));
