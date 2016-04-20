var path = require('path');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var cwd = process.cwd();    // 执行命令所在目录
var paths = {
      remote: path.resolve(__dirname, '../src/index.jsx'),  // index源文件
      src: path.join(cwd, '/node_modules/rs-server-static/build'),    // index拷贝目录
      script: path.join(cwd, '/examples/**/*.js'),  // 需要监听的examples文件
      scriptDest: path.resolve(__dirname, '../build/')  // 开发编译文件
    };

var webpackConfig = {
        watch: true,
        module: {
            loaders: [
                { test: /\.(es6|js|jsx)$/, loader: 'babel?stage=0' },
                { test: /\.less$/, loader: 'style!css!less' }
            ]
        },
        output: {
          filename: '[name].js'
        },
        resolve: {
          extensions: ['', '.js', '.jsx'],
        },
        devtool: 'source-map',
        plugins:[new LiveReloadPlugin()]
    };

gulp.task('initCopy', function() {
    gulp.src(paths.remote)
        .pipe(gulp.dest(paths.src));
});

gulp.task('webpack', function() {
  gulp.src(path.join(paths.src, 'index.jsx'))
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.scriptDest));
});

runSequence(['initCopy', 'webpack']);
