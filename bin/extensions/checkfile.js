import path from 'path';
import fs from 'fs';
import logger from './logger.js';

const pojDir = process.cwd();

const check = (file) => {
    let filePath = path.resolve(pojDir, './' + file);

    try {
        fs.accessSync(filePath);
    } catch(ex) {
        logger.warn(filePath);
        logger.warn(`  Can not find ${file} in the path above`);
        return false;
    }

    return true;
}

export default check;
