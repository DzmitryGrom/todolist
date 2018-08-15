var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/* Task to compile less */
gulp.task('compile-less', function() {
  gulp.src('./src/components/app-root/app-root.less')
    .pipe(less())
    .pipe(gulp.dest('./src/components/app-root/'));

  gulp.src('./src/components/app-header/app-header.less')
    .pipe(less())
    .pipe(gulp.dest('./src/components/app-header/'));

  gulp.src('./src/components/app-day/app-day.less')
    .pipe(less())
    .pipe(gulp.dest('./src/components/app-day/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
  gulp.watch('./src/less/**/*.less' , ['compile-less']);
  gulp.watch('./src/components/**/*.less' , ['compile-less']);
});

gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });
  gulp.watch("./src/less/*.less").on("change", reload);
  gulp.watch("./src/components/**/*.less").on("change", reload);
  gulp.watch("./src/js/*.js").on("change", reload);
  gulp.watch("./src/components/**/*.html").on("change", reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);