/* eslint import/no-extraneous-dependencies: 0, global-require: 0, import/no-dynamic-require: 0 */

const request = require('supertest');
const bootApi = require('../boot-api');
const bootError = require('../boot-error');
const bootLogger = require('../boot-logger');
const bootConfig = require('../boot-config');
const bootServer = require('../boot-server');
/* const middleware = require('./mock-middleware'); */
const bootEnvironment = require('../boot-environment');

module.exports = {
  bootWithMocks() {
    [bootLogger, bootConfig, bootEnvironment].forEach(async (boot) => {
      await boot(this);
    });
    [bootServer, bootApi, bootError].forEach((boot) => boot(this));

    this.request = () => request(this.server);

    this.requestWithTracingHeaders = (method, route) =>
      this.request()[method](route);
  }
};
