/* eslint no-param-reassign: 0 no-unused-vars: 0 */
const cors = require('cors');
const express = require('express');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { Deserializer } = require('jsonapi-serializer');
const { validationResult } = require('express-validator');

const routes = require('../../application/routes');
const swaggerOptions = require('../../../swagger');
const RequestContext = require('../lib/request-context');
const ValidationError = require('../lib/errors/validation.error');

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Add extra abstraction layer to resolvers
const resolverWrapper = (resolver) => (req, res, next) => {
  const resolverContext = new RequestContext(req);

  resolver(req, res, resolverContext).catch((err) => next(err));
};

// Global route validation middleware
const routeValidationMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    const validationError = new ValidationError(result);
    validationError.sendResponse(res);
  }
};

const blackList = [];

// Global body deserialization middleware
const createDeserializerMiddleware = (deserializer) => {
  return async (req, res, next) => {
    if (
      Object.entries(req.body).length &&
      !blackList.includes(req.route.path)
    ) {
      deserializer.deserialize(req.body, (err, body) => {
        if (err) {
          next(err);
          return;
        }
        req.body = body;
        next();
      });
    } else {
      next();
    }
  };
};

// Setup express application
const createServer = (appCtx) => {
  const app = express();

  const dynamicMeta = (req) => {
    const { info, requestId } = new RequestContext(req);
    return { info, requestId };
  };

  // Express setup
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(requestIp.mw());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  routes.forEach((route) => {
    const [method, routePath, resolver, validators, deserializer] = route;
    let routeDeserializer;
    if (!deserializer) {
      routeDeserializer = new Deserializer({
        keyForAttribute: 'camelCase'
      });
    } else {
      routeDeserializer = deserializer;
    }
    const validationMiddlewares = [];

    if (validators) {
      validationMiddlewares.push(validators);
    }

    app[method](
      routePath,
      createDeserializerMiddleware(routeDeserializer),
      validationMiddlewares,
      routeValidationMiddleware,
      resolverWrapper(resolver)
    );
  });

  // Setup winston logger
  app.use(
    appCtx.logger.expressWinston.logger({
      meta: true,
      dynamicMeta,
      transports: appCtx.logger.transports
    })
  );

  app.use((error, req, res, next) => {
    const responseErr =
      error instanceof appCtx.error.APIError
        ? error
        : new appCtx.error.APIError({ error });
    responseErr.sendResponse(res);
  });

  return app;
};

module.exports = (App) => {
  App.server = createServer(App);
};
