const gulp = require('gulp');
const debug = require('gulp-debug');
const log = require('fancy-log');
const ftp = require('vinyl-ftp');
    
const conf = {
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

// process HTML files
//gulp.task('html', () => {
//  gulp.src(conf.paths.src.htm)
//      .pipe(debug({title: 'html:'}))
//      .pipe(gulp.dest(conf.paths.dist));
//});
//
// deploy via FTP
//gulp.task('deploy', () => {
//  var conn = ftp.create({
//        host:        process.env.FTP_HOST,
//        user:        process.env.FTP_USER,
//        password:    process.env.FTP_PASS,
//        log:         log,
//        idleTimeout: 10000
//      });
//    
//  //conn.clean([process.env.FTP_PATH + '/**'], conf.paths.dist, {base: '/'});
//
//  gulp.src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
//      .pipe(debug({title: 'ftp:'}))
//      .pipe(conn.dest(process.env.FTP_PATH));
//});
