
const gulp = require('gulp');
const npm = require('literate-shell').npm();
const path = require('path')

//-----------------------------------------------------------------
gulp.task('install', () => {
  return npm.install.spawn();
})

//-----------------------------------------------------------------

gulp.task('build:typescript', () => {
  return npm.run.build.spawn();
});

gulp.task('build', gulp.series('build:typescript'));

//-----------------------------------------------------------------

gulp.task('unittest', () => {
  return npm('--prefix starter-rest-server run test');
});

gulp.task('fv', () => {
  return npm('--prefix starter-rest-server run test:fv');
});

//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Main tasks
// fullfv - builds the same and then h

// The complete Full build, unit, fv  tests
gulp.task('default', gulp.series(['install', 'build', 'unittest', 'fv']));




