const bunyan = require('bunyan');
const bformat = require('bunyan-format');

const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ name: 'jazzercise', stream: formatOut });

module.exports = log;