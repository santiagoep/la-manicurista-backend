/* eslint global-require: 0 import/no-dynamic-require: 0 */
/* istanbul ignore file */

const internalLoaders = require('./domain/bootloaders');

const startApp = async () => {
  await internalLoaders.boot();

  global.app = {
    ...internalLoaders
  };

  const port = process.env.APP_PORT || 8080;

  app.server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.info(
      `La Manicurista Backend listening at http://127.0.0.1:${port}`
    );
  });
};

startApp().then();
