#!/usr/bin/env node
import path from 'path';
import ch from 'child_process';
import config from '../../package.json';
import logger from '../extensions/logger';

const kitDir = __dirname.slice(0, -16);
const exec = ch.exec;


const logCurrentVersion = () => {
    logger('You are using %s@%s\n     from             %s\n', config.name, config.version, kitDir);
}

const logList = () => {
    logger('Usage: rs-kit <command> [arguments]\n');
    logger('Commands:');
    logger('     init <name>');
    logger('     dev');
    logger('     prepublish');
    logger('     test');
    logger('     update');
    logger('     pwd');
    logger('     -v, --version\n');
}

const logVersionInfo = () => {
    exec('which npm', (err, stdout, stderr) => {
        let Npath = stdout.toString().trim();
        let command = `${Npath} view rs-kit version`;
        exec(command, (err, stdout, stderr) => {
            logger('Latest version is %s     on             https://www.npmjs.com \n', stdout);
        })
    })
}

let info = (type) => {
    if (type === 'info') {
        logList();
    }
    logCurrentVersion();
    if (type === 'version') {
        logVersionInfo();
    }
}

export default info;
