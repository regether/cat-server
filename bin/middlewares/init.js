#!/usr/bin/env node
import ch from 'child_process';
import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import _ from 'lodash';
import logger from '../extensions/logger';

const exec = ch.exec;
const pojDir = process.cwd();

const init = (name) => {

    // git clone
    gulp.task('clone', (callback) => {
        logger.success('----> Starting');
        exec(`git clone https://github.com/regether/rs-bud.git ${name}`, (err, stdout, stderr) => {
            logger.success('-------> Pull Source Code');
            exec(`rm -rf ./${name}/.git`, (err, stdout, stderr) => {
                callback();
            });
        });
    });

    gulp.task('init:readme_package', (callback) => {
        logger.success('----> Creating Readme.md & Package.json');
        let files = ['readme.md', 'package.json'];
        files.forEach((item) => {
            let fileName = path.resolve(pojDir, `./${name}/${item}`);
            let file = _.template(fs.readFileSync(fileName))({
                name
            });
            fs.writeFile(fileName, file);
        });

        callback();
    });

    gulp.task('init:install', (callback) => {
        logger.success('----> Npm Install');
        exec('which npm', (err, stdout, stderr) => {
            let Npath = stdout.toString().trim();
            let command = `${Npath} i --registry=https://registry.npm.taobao.org`;
            exec(command, {cwd: `${pojDir}/${name}`}, (err, stdout, stderr) => {
                if (err) {
                    logger.danger(err);
                } else {
                    logger.log(stdout + '');
                    logger.info('----> Finished');
                    logger.in(5);
                }
                callback(); 
            });
        });
    });

    if (!name) {
        logger.danger('-> ! sir: we need a project name !');
        return;
    }

    runSequence('clone', 'init:readme_package', 'init:install');
}

export default init;
