const gulp = require('gulp'),
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

const html = () => {
    return gulp.src(conf.paths.src.htm)
      .pipe(debug({title: 'html:'}))
      .pipe(gulp.dest(conf.paths.dist));
}

const deploy = () => {
    const conn = ftp.create({
        host:        process.env.FTP_HOST,
        user:        process.env.FTP_USER,
        password:    process.env.FTP_PASS,
        log:         log,
        idleTimeout: 10000
    });
    return gulp.src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
        .pipe(debug({title: 'ftp:'}))
        .pipe(conn.dest(process.env.FTP_PATH));
}

// default task (called from CLI when executing `gulp`)
gulp.task('default', gulp.series(html, deploy));
