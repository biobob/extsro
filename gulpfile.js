// grab gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');

// create a default task
gulp.task('default', function() {
  return gutil.log('Gulp is running!');
});
