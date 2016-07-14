#!/usr/bin/env node
import ch from 'child_process';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import logger from '../extensions/logger';

const exec = ch.exec;
const pojDir = process.cwd();

const update = (files) => {

    gulp.task('reset:file', (callback) => {
        exec(`git archive --remote=https://github.com/regether/rs-bud.git HEAD ${files.join(' ')} | tar -x`, (err, stdout, stderr) => {
            console.log(`git archive --remote=https://github.com/regether/rs-bud.git HEAD ${files.join(' ')} | tar -x`);
            if (stderr) {
                logger.danger(stderr);
            } else {
                logger.info('----> Finished');
                logger.in(5);
            }
            callback();
        });
    });


    logger.warn(' Since GitHub donot support "git archive", This Command is not supported now. Sorry');

    /*
    if (files.length === 0) {
        logger.danger('-> ! sir: we need some file name !');
        return;
    }

    runSequence('reset:file');
    */
}

export default update;
