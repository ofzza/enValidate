// =====================================================================================================================
// GULP TASK: Copy SCSS files
// =====================================================================================================================

// Require dependencies
const argv      = require('minimist')(process.argv.slice(2), { boolean: true }),
      noop      = require('gulp-noop'),
      sass      = require('gulp-sass'),
      minify    = require('gulp-clean-css');

// Initialize tasks
module.exports = (gulp) => {

  // Define SCSS copy task
  gulp.task('build@style-scss', () => {
    return gulp
      .src('./src/**/*.scss')
      .pipe(sass())
      .pipe(argv.production ? minify() : noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@style-scss',
    watch: './src/**/*.scss'
  };

};
