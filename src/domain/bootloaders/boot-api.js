/* eslint no-param-reassign: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */

const API = require('../lib/api');

module.exports = (App) => {
  const { apis } = App.config;
  App.api = {};
  Object.keys(apis).forEach((key) => {
    const api = new API(apis[key]);

    App.api[key] = api;
  });
};
