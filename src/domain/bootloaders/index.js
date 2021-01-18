const bootApi = require('./boot-api');
const bootError = require('./boot-error');
const bootLogger = require('./boot-logger');
const bootConfig = require('./boot-config');
const bootServer = require('./boot-server');
const bootEnvironment = require('./boot-environment');

/**
 * IMPORTANT: The bootloaders order of precedence must be maintained, changes
 * in the order could make the app brake
 */
const bootAsyncFunctions = [bootLogger, bootConfig, bootEnvironment];
const bootFunctions = [bootServer, bootApi, bootError];

const App = {
  config: undefined,
  env: undefined,
  server: undefined,
  api: undefined,
  logger: undefined,
  error: undefined,

  boot() {
    return Promise.all(bootAsyncFunctions.map((boot) => boot(this))).then(() =>
      bootFunctions.forEach((boot) => boot(this))
    );
  }
};

module.exports = App;
