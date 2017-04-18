const changelogModule = require('./gulp/changelog');
const cleanModule = require('./gulp/clean');
const copyModule = require('./gulp/copy');
const eslintModule = require('./gulp/eslint');
const jsdocModule = require('./gulp/jsdoc');
const versioningModule = require('./gulp/versioning');
const watchModule = require('./gulp/watch');
const zipModule = require('./gulp/zip');

module.exports = {
    gulp: {
        changelogModule,
        cleanModule,
        copyModule,
        eslintModule,
        jsdocModule,
        versioningModule,
        watchModule,
        zipModule,
    },
};
