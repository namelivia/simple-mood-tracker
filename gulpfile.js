var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp.config');

gulp.task('help', $.taskListing);
gulp.task('default', gulp.series('help'));

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function() {
  console.log('Analyzing source with JSHint and ESLint');
  return gulp
    .src(config.alljs)
    .pipe($.print.default())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'))
    .pipe($.eslint());
});

module.exports = gulp;
