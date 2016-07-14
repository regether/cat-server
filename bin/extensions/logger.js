import gutil from 'gulp-util';

let logger = console.log.bind(console);
let mapper = {
    'danger': 'red',
    'warn': 'yellow',
    'success': 'green',
    'info': 'blue'
};

logger.in = function() {
    arguments[0] = `${Array(11 * arguments[0]).fill('-').join('')}>`;
    logger(...arguments);
}

logger.out = function() {
    arguments[0] = `${Array(11 * arguments[0]).fill('-').join('')}>`;
    logger(...arguments);
}

logger.log = function() {
    gutil.log(...arguments);
}

for (let i in mapper) {
    logger[i] = function() {
        logger.log(gutil.colors[mapper[i]](...arguments));
    }
}

export default logger;
