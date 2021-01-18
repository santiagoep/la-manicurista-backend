/* eslint no-param-reassign: 0 global-require: 0 */
const createLogger = require('../lib/logger');

module.exports = (App) =>
  new Promise((resolve, reject) => {
    try {
      const logger = createLogger();
      App.logger = logger;
      resolve();
    } catch (e) {
      reject(e);
    }
  });
