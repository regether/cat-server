let logger = console.log.bind(console);

logger.in = function() {
    arguments[0] = `${Array(11 * arguments[0]).fill('-').join('')}>`;
    logger(...arguments);
}
logger.out = function() {
    arguments[0] = `${Array(11 * arguments[0]).fill('-').join('')}>`;
    logger(...arguments);
}

export default logger;
