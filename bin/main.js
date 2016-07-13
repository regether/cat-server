import gutil from 'gulp-util';
import logger from './extensions/logger';

import information from './middlewares/information.js';

const main = () => {
    let args = process.argv.splice(2);
    let order = args.shift();
    let currentDir = process.cwd();
    let kitDir = __dirname.slice(0, -4);

    logger.in(5);

    if (currentDir === kitDir) {
        gutil.log(gutil.colors.red('-> Do not run any order under the kit dir'));
    }

    switch(order) {
        case 'init':
            logger('init');
            break;
        case 'dev':
            logger('logger');
            break;
        case 'prepublish':
            logger('pre');
            break;
        case 'test':
            logger('test');
            break;
        case 'update':
            logger('update');
            break;
        case 'pwd':
            information('pwd');
            break;
        case '-v':
        case '--version':
            information('version');
        default:
            information('info');
    }
}

export default main;
