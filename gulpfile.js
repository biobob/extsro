// grab gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    
// configuration
    conf = {
      paths: {
        src: {
          htm: './src/html/*.html',
          css: './src/css/*.css',
          php: './src/php/*.php',
          img: './src/img/*.*',
          res: './src/res/*.*'
        },
        dist: './dist'
      }
    };

// create a default task
gulp.task('default', ['html']);

// process HTML files
gulp.task('html', function() {
  gulp.src(conf.paths.src.htm)
      .pipe(gulp.dest(conf.paths.dist));
});
