/* eslint no-param-reassign: 0 global-require: 0 */
const config = require('../../../config/env-config');

module.exports = (App) =>
  new Promise((resolve, reject) => {
    try {
      App.config = {
        ...config
      };
      resolve();
    } catch (e) {
      reject(e);
    }
  });
