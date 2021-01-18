const { query } = require('express-validator');

const {
  tracksSerializer
} = require('../../domain/lib/serializers/tracks.serializer');
const TracksRepository = require('../repositories/tracks.repository');
const responseValidations = require('../../domain/response.validations');

const get = async (req, res) => {
  try {
    const {
      data: { tracks }
    } = await new TracksRepository().getTracks(req.query);
    const statusCode = responseValidations.contentValidator(tracks.items);
    return res.status(statusCode).json(tracksSerializer().serialize(tracks));
  } catch (error) {
    throw new app.error.APIError({
      defaultCode: 'tracks.getTracks'
    });
  }
};

module.exports = {
  get: {
    resolver: get,
    validationRules: [
      query('market').exists().withMessage('market is required'),
      query('query').exists().withMessage('query is required'),
      query('limit').exists().withMessage('limit is required'),
      query('page').exists().withMessage('page is required')
    ]
  }
};
