const winston = require('winston');
const expressWinston = require('express-winston');

// logger of requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: 'info',
<<<<<<< HEAD
      filename: 'request.log',
=======
      filename: 'info.log',
>>>>>>> 22fb3e0a6b2327b272dd69eee74e283e887702b1
      handleExceptions: false,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: false,
      prettyPrint: true,
      timestamp: true,
      maxFiles: 1,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZ' }),
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
      maxFiles: 1,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZ' }),
    winston.format.json(),
  ),
  levels: winston.config.syslog.levels,
  exitOnError: false,
});

module.exports = {
  requestLogger,
  errorLogger,
};
