var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);
var iconfontCss = require('gulp-iconfont-css');
var fontName = 'icon';

gulp.task('icon', function () {
  gulp.src(['src/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'icon',
      path: 'src/less/templates/icons.less',
      targetPath: '../../less/icons.less',
      fontPath: '/assets/fonts/'
    }))
    .pipe(iconfont({
      normalize: true,
      centerHorizontally: true,
      fontHeight: 1500,
      descent: 0,
      fontName: 'icon',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff'],
      timestamp: runTimestamp
    }))
    .pipe(gulp.dest('src/assets/fonts/'));
});


/* Task to compile less */
gulp.task('compile-less', function() {
  gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
  gulp.watch('./src/less/**/*.less' , ['compile-less']);
});


gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  gulp.watch("./src/*.less").on("change", reload);
  gulp.watch("./dist/*.html").on("change", reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);