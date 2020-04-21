const winston = require('winston');
const expressWinston = require('express-winston');

// logger of requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'request.log',
      handleExceptions: true,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: true,
    }),
  ],
  format: winston.format.json(),
  level: 'info',
  exitOnError: false,
});

// logger of errors
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error, crit',
      handleExceptions: true,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: true,
    }),
  ],
  format: winston.format.json(),
  level: 'error, crit',
  exitOnError: false,
});

module.exports = {
  requestLogger,
  errorLogger,
};
