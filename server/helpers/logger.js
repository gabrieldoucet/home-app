const { createLogger, format, transports } = require('winston');
const { printf } = format;
const _ = require('lodash');
const moment = require('moment');

const myFormat = printf(({ level, message }) => {
  const timestamp = moment().toISOString();
  level = _.toUpper(level);
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: myFormat,
  transports: [new transports.Console()]
});

module.exports = logger;
