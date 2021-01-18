const APIError = require('../lib/errors/api.error');
const errorDictionaries = require('../lib/errors/dictionaries');

module.exports = (App) => {
  App.error = {
    dictionaries: errorDictionaries,
    APIError
  };
};
