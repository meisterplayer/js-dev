# Meister JS Development #

Installing this package will set you up with the correct eslint presets and plugins we use during our development. It also installs our default .eslintr and .editorconfig to the project root should there be none present.

# Gulp Functions #

This package also comes with a whole bunch of functions to help you create a gulp workflow for your project. For example, to create a clean directory task all you have to do in your `gulpfile.js` is

```JavaScript
const gulp = require('gulp');

const jsGulp = require('./index').gulp;

// Remove all files and directories in ./dist
gulp.task('clean-dist', jsGulp.cleanModule.createClean('./dist/*'));
```

For some more examples check this projects gulpfile.

## Modules ##

- **changelogModule** Functions to help in generating changelogs through use of [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) with the [angular preset](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md).
- **cleanModule** Functions to help in creating tasks that clean directories.
- **copyModule** Functions to help in creating tasks that copy files and directories.
- **eslintModule** Functions to help in creating tasks that lint files using eslint.
- **jsdocModule** Functions to help in creating tasks that generate [js-docs](http://usejsdoc.org/).
- **versioningModule** Functions to help in creating tasks that can manipulate version numbers in files.
- **watchModule** Function to help in creating watch tasks that rerun tasks on file changes.
- **zipModule** Functions to help in creating tasks that zip files and directories.

### Documentation ###

Run `gulp js-docs` and check the docs/js-docs folder for more information on the functions available.
