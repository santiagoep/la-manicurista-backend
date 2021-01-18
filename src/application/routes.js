// Resolvers
const tracks = require('./request-resolvers/tracks.resolver');

/* eslint-disable no-unused-vars */
// HTTP Methods the API can respond to
const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';
/* eslint-enable no-unused-vars */

/**
 * The set of routes and handlers for the API
 * each item in the array is an array with the form:
 * [http-method, path, resolver function, validators, deserializer function]
 *
 * The deserializer function is an optional parameter and is used when the request send a relationships,
 * this function should returns a Deserializer instance with all request relationships
 *
 * IMPORTANT: The routes order of precedence makes API behave different, this
 * must be taken into account
 *
 */
const routes = [
  /**
   * @swagger
   *
   * paths:
   *   /tracks?market={market}&query={query}&type=track&limit={limit}&page={page}:
   *      get:
   *       summary: Get paginated tracks filtered by market and query
   *       description: Get paginated tracks filtered by market and query
   *       produces:
   *         - application/json
   *       parameters:
   *         - in: query
   *           name: market
   *           required: true
   *           schema:
   *             type: string
   *             enum: ['ES', 'EN']
   *           description: The language in which the service is being consumed
   *         - in: query
   *           name: query
   *           required: true
   *           schema:
   *             type: string
   *           description: The text by which you want to filter the search
   *         - in: query
   *           name: limit
   *           required: true
   *           schema:
   *             type: number
   *           description: The number of items to return
   *         - in: query
   *           name: page
   *           required: true
   *           schema:
   *             type: number
   *           description: The current page
   *       responses:
   *         200:
   *           description: All tracks received by the Spotify's Api
   */
  [GET, '/tracks', tracks.get.resolver, tracks.get.validationRules]
];

module.exports = routes;
