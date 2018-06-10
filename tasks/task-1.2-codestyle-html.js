// =====================================================================================================================
// GULP TASK: Code-style checks
// =====================================================================================================================

// Require dependencies
const htmlhint = require('gulp-htmlhint');

// Initialize tasks
module.exports = (gulp) => {

  // HTML code-style task
  gulp.task('test@codestyle-html', () => {
    return gulp
      .src(['./**/*.html', '!./node_modules/**/*', '!./dist/**/*'])
      .pipe(htmlhint('.htmlhintrc', {}))
      .pipe(htmlhint.reporter());
    //.pipe(htmlhint.failOnError());
  });

  // Return registered tasks
  return {
    test: ['test@codestyle-html'],
    watch: ['./src/**/*.html']
  };

};
