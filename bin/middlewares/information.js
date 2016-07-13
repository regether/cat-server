#!/usr/bin/env node
import path from 'path';
import ch from 'child_process';
import gutil from 'gulp-util';
import config from '../../package.json';
import logger from '../extensions/logger.js';

let info = (type) => {
    console.log(type);
}

export default info;
