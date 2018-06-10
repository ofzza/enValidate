// =====================================================================================================================
// GULP TASK: Copy CSS files
// =====================================================================================================================

// Require dependencies
const argv    = require('minimist')(process.argv.slice(2), { boolean: true }),
      noop    = require('gulp-noop'),
      minify  = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define CSS copy task
  gulp.task('build@style-css', () => {
    return gulp
      .src('./src/**/*.css')
      .pipe(argv.production ? minify() : noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-css',
    watch: './src/**/*.css'
  };

};
