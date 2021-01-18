const { NO_CONTENT, OK } = require('http-status-codes');

class ResponseValidations {
  static contentValidator(entities) {
    const isFalsy = entities === null || entities === undefined;
    if (isFalsy) return NO_CONTENT;

    const isEmptyArray = Array.isArray(entities) && entities.length === 0;
    const isEmptyObject =
      typeof entities === 'object' && Object.keys(entities).length === 0;

    return isEmptyArray || isEmptyObject ? NO_CONTENT : OK;
  }
}

module.exports = ResponseValidations;
