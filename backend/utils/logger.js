const log4js = require('log4js');

function getConfigObject() {
  return {
    appenders: {
      output: {
        type: 'console',
      },
    },
    categories: {
      default: { appenders: ['output'], level: 'debug', enableCallStack: true },
    },
  };
}

function getLogger() {
  const configurationObject = getConfigObject();
  log4js.configure(configurationObject);
  const loggerObject = log4js.getLogger();
  return loggerObject;
}

module.exports = {
  getLogger,
};
