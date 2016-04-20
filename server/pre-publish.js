var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var clean = require('gulp-clean');
var fs = require('fs');
var runSequence = require('run-sequence');
var template = require('gulp-template');

var cwd = process.cwd();
var paths = {
        script: [path.join(cwd, '/src/**/*.jsx'), path.join(cwd, '/src/**/*.js')],
        scriptDir: path.join(cwd, '/src'),
        dest: path.join(cwd, '/lib/'),
        css: [path.join(cwd, '/assets/index.less')],
        readmeSrc: path.join(cwd, '/src/readme.md'),
        readmeDest: path.join(cwd)
    };

gulp.task('clean', function() {
  return gulp.src(paths.dest + '*', {read: false})
    .pipe(clean({force: true}));
})

var fileList = [];
function getContent(path) {
    var files = fs.readdirSync(path);
    files.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            getContent(path + '/' + item);
        } else {
            /(.js|.jsx|.es6)$/.test(item) && fs.existsSync(path + '/' + item) && fileList.push(fs.readFileSync(path + '/' + item, 'utf8'));
        }
    })
}

function getComment(list) {
    var result = [];
    list.forEach(function(item) {
        var tmp = item.match(/\/\*(.|\s)+?\*\//g);
        if (tmp) {
            result = result.concat(tmp.map(function(value) {
                return value.slice(2, -2);
            }))
        }
    });

    return result.join('');
}

gulp.task('prepare-md', function() {
    getContent(paths.scriptDir);
    var comments = getComment(fileList);
    gulp.src(paths.readmeSrc)
        .pipe(template({comments: comments}))
        .pipe(gulp.dest(paths.readmeDest));
});

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

runSequence(['clean', 'prepare-md', 'prepare-js', 'prepare-css']);
