const gulp = require('gulp'),
      debug = require('gulp-debug'),
      log = require('fancy-log'),
      ftp = require('vinyl-ftp'),
      
      conf = {
          paths: {
              src: {
                  dir: './src',
                  htm: './src/html/*.html',
                  css: './src/css/*.css',
                  php: './src/php/*.php',
                  img: './src/img/*.*',
                  res: './src/res/*.*'
              },
              dist: './dist'
          },
          ftp: {
              connection: ftp.create({
                  host:        process.env.FTP_HOST,
                  user:        process.env.FTP_USER,
                  password:    process.env.FTP_PASS,
                  log:         log,
                  idleTimeout: 10000
              })
          }
      },
      
      html = () => gulp
          .src(conf.paths.src.htm)
          .pipe(debug({title: 'Debug html:'}))
          .pipe(gulp.dest(conf.paths.dist)),
      
      php = () => gulp
          .src(conf.paths.src.php)
          .pipe(debug({title: 'Debug php:'}))
          .pipe(gulp.dest(conf.paths.dist)),
      
      copy = () => gulp
          .src([conf.paths.src.img, conf.paths.src.res], {base: conf.paths.src.dir})
          .pipe(debug({title: 'Debug copy:'}))
          .pipe(gulp.dest(conf.paths.dist)),
      
      deploy = () => gulp
        .src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
        .pipe(debug({title: 'Debug ftp:'}))
        .pipe(conf.ftp.connection.dest(process.env.FTP_PATH));

// default task (called from CLI when executing `gulp`)
gulp.task('default', gulp.series(gulp.parallel(html, php, copy), deploy));
