const gulp  = require('gulp'),
    debug = require('gulp-debug'),
    log = require('fancy-log'),
    ftp = require('vinyl-ftp'),
    
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

// default task
gulp.task('default', ['html', 'deploy']);

// process HTML files
gulp.task('html', ['deploy'], () => {
  gulp.src(conf.paths.src.htm)
      .pipe(debug({title: 'html:'}))
      .pipe(gulp.dest(conf.paths.dist));
});

// deploy via FTP
gulp.task('deploy', () => {
  var conn = ftp.create({
        host:        process.env.FTP_HOST,
        user:        process.env.FTP_USER,
        password:    process.env.FTP_PASS,
        log:         log,
        idleTimeout: 10000
      });
    
  //conn.clean([process.env.FTP_PATH + '/**'], conf.paths.dist, {base: '/'});

  gulp.src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
      .pipe(debug({title: 'ftp:'}))
      .pipe(conn.dest(process.env.FTP_PATH));
});
