// =====================================================================================================================
// GULP TASK: Copy LESS files
// =====================================================================================================================

// Require dependencies
const argv      = require('minimist')(process.argv.slice(2), { boolean: true }),
      noop      = require('gulp-noop'),
      less      = require('gulp-less'),
      minify    = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define LESS copy task
  gulp.task('build@style-less', () => {
    return gulp
      .src('./src/**/*.less')
      .pipe(less())
      .pipe(argv.production ? minify() : noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-less',
    watch: './src/**/*.less'
  };

};
