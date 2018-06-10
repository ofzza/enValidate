// =====================================================================================================================
// GULP TASK: Copy HTML
// =====================================================================================================================

// Require dependencies
const argv    = require('minimist')(process.argv.slice(2), { boolean: true }),
      noop    = require('gulp-noop'),
      minify  = require('gulp-htmlmin');

// Initialize tasks
module.exports = (gulp) => {

  // Define HTML copy task
  gulp.task('build@html', () => {
    return gulp
      .src('./src/**/*.html')
      .pipe(argv.production ? minify({ collapseWhitespace: true, conservativeCollapse: true }) : noop())
      .pipe(gulp.dest('./dist'));
  });

  // Return registered tasks
  return {
    build: 'build@html',
    watch: './src/**/*.html'
  };

};
