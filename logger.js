const { createLogger, format, transports } = require('winston');
//
const winston = require('winston');
//const { Elasticsearch } = require('winston-elasticsearch');
const { Client } = require('@elastic/elasticsearch');
const { ElasticsearchTransport } = require('winston-elasticsearch');
//
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';
const datePatternConfiguration = {
  default: 'YYYY-MM-DD',
  everHour: 'YYYY-MM-DD-HH',
  everMinute: 'YYYY-MM-DD-THH-mm',
};
numberOfDaysToKeepLog = 30;
fileSizeToRotate = 1; // in megabyte

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: datePatternConfiguration.default,
  zippedArchive: true,
  maxSize: `${fileSizeToRotate}m`,
  maxFiles: `${numberOfDaysToKeepLog}d`
});

const esTransportOpts = {
//   level: 'info',
    level: 'info',
  index: 'chatapp-index',
  clientOpts: {
    cloud: {
      id: 'a72514504a674f9f84c08f2301699245:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGM3NjUyNzNkNGNjNTRiZThhNDE0ZjMxOGJmNTRjOWQzJGU0NmUzMDAzNWJmZTQ3MTY5YTdmYmVjYzMxYjk1NDZj'
    },
      //node: 'https://a72514504a674f9f84c08f2301699245:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGM3NjUyNzNkNGNjNTRiZThhNDE0ZjMxOGJmNTRjOWQzJGU0NmUzMDAzNWJmZTQ3MTY5YTdmYmVjYzMxYjk1NDZj.us-east-1.aws.cloud.es.io:9243',
    auth: {
      username: 'sul55808@omeie.com',
      password: 'EsgE24fqWdjXmdG'
    }
    },
    transformer: logData => {
        // add extra fields to log data if needed
        return logData;
      },
};
// const logger = winston.createLogger({
//           handleExceptions: true,
//       format: format.combine(
//         format.label({ label: path.basename(module.parent.filename) }),
//         format.colorize(),
//         format.printf(
//           info => `${info.timestamp}[${info.label}] ${info.level}: ${info.message}`,
//         ),
//       ),
//   transports: [
//     new ElasticsearchTransport(esTransportOpts)
//   ]
// });
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new ElasticsearchTransport({
      level: 'info',
      index: 'logs',
      clientOpts: {
        node: 'http://localhost:9200/',
        
      },
    }),
  ],
});
// const logger = createLogger({
//     level: env === 'development' ? 'verbose' : 'info',
//   handleExceptions: true,
//   format: format.combine(
//     format.label({ label: path.basename(module.parent.filename) }),
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     format.printf(info => `${info.timestamp}[${info.label}] ${info.level}: ${JSON.stringify(info.message)}`),
//   ),
//   transports: [
//       new Client(esTransportOpts),
//       dailyRotateFileTransport,
//   ]
// });

const logger1 = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'verbose' : 'info',
  handleExceptions: true,
  format: format.combine(
    format.label({ label: path.basename(module.parent.filename) }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp}[${info.label}] ${info.level}: ${JSON.stringify(info.message)}`),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      handleExceptions: true,
      format: format.combine(
        format.label({ label: path.basename(module.parent.filename) }),
        format.colorize(),
        format.printf(
          info => `${info.timestamp}[${info.label}] ${info.level}: ${info.message}`,
        ),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;