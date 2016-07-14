#!/usr/bin/env node
import path from 'path';
import webpack from 'webpack';
import named from 'vinyl-named';
import gulp from'gulp';
import symlink from 'gulp-sym';
import runSequence from 'run-sequence';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import clean from 'gulp-clean';

import logger from '../extensions/logger';

const pojDir = process.cwd();
const __root = dir => path.resolve(__dirname, dir);
const paths = {
  webpack: __root('../options/webpack/webpack.build.js'),
  index: __root('../options/manuel/index.jsx'),
  tmp: __root('../../.tmp'),
  examples: path.resolve(pojDir, './examples')
};

let webpackConfig = require(paths.webpack)(path.join(paths.tmp, 'index.jsx'), path.join(paths.tmp, 'build'));

const build = () => {

    gulp.task('clean', function() {
        logger.success('------->   Clean  old examples');

        return gulp.src(paths.tmp + '/*', {read: false})
            .pipe(clean({force: true}));
    });

    gulp.task('index', function() {
        return gulp.src(paths.index)
            .pipe(gulp.dest(paths.tmp));
    });

    gulp.task('link:examples', function() {
        logger.success('------->    Read  new examples');

        return gulp.src(paths.examples)
            .pipe(symlink(paths.tmp + '/examples', {force: true}));
    });

    gulp.task('webpack', function(callback) {
        webpack(webpackConfig, function(err, stats) {
            logger.log('[webpack]', stats.toString({}));
        })
    });

    runSequence('clean', ['index', 'link:examples'], 'webpack');
};

export default build;
