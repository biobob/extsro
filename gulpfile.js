// grab gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    
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
gulp.task('default', ['html', 'deploy']);

// process HTML files
gulp.task('html', function() {
  gulp.src(conf.paths.src.htm)
      .pipe(gulp.dest(conf.paths.dist));
});

// deploy via FTP
gulp.task('deploy', function() {
  var conn = ftp.create({
        host:     process.env.FTP_HOST,
        user:     process.env.FTP_USER,
        password: process.env.FTP_PASS,
        log:      gutil.log
      });
  conn.clean([process.env.FTP_PATH + '/**'], conf.paths.dist, {base: '/'});

  //gulp.src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
  //    .pipe(conn.dest(process.env.FTP_PATH));
});
