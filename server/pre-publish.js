var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var cwd = process.cwd(),
    paths = {
        script: [path.join(cwd, '/src/**/*.jsx'), path.join(cwd, '/src/**/*.js')],
        dest: path.join(cwd, '/dist/'),
        css: [path.join(cwd, '/assets/index.less')]
    };

gulp.task('clean', function() {
  return gulp.src(paths.dest + '*', {read: false})
    .pipe(clean({force: true}));
})

gulp.task('prepare-js', function() {
  gulp.src(paths.script)
    .pipe(babel({stage:0}))
    .pipe(gulp.dest(paths.dest));
})

gulp.task('prepare-css', function () {
  gulp.src(paths.css)
    .pipe(less())
    .pipe(gulp.dest(paths.dest));
});

runSequence(['clean', 'prepare-js', 'prepare-css']);
