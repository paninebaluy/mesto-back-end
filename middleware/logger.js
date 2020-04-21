const winston = require('winston');
const expressWinston = require('express-winston');

// logger of requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'info.log',
      handleExceptions: false,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: false,
      prettyPrint: true,
      timestamp: true,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZZZ' }),
    winston.format.json(),
  ),
  levels: winston.config.syslog.levels,
  exitOnError: false,
});

// logger of errors
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: false,
      prettyPrint: true,
      timestamp: true,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZZZ' }),
    winston.format.json(),
  ),
  levels: winston.config.syslog.levels,
  exitOnError: false,
});

module.exports = {
  requestLogger,
  errorLogger,
};
