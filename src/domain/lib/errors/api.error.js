const { Error: JSONAPIError } = require('jsonapi-serializer');
const { getStatusText, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const errors = require('./dictionaries');

class APIError extends Error {
  constructor({
    status = INTERNAL_SERVER_ERROR,
    code = false,
    defaultCode = false,
    error = ''
  }) {
    super(getStatusText(status));
    this.status = status;
    this.code = code;
    this.defaultCode = defaultCode;
    this.error = error;
  }

  handledError(res) {
    const errorCode = this.code || this.defaultCode;
    const [entity, error] = errorCode.split('.');
    this.error = {
      ...errors[entity][error],
      detail: this.error
    };
    res.status(this.error.status).json({
      code: this.error.code
    });
  }

  unHandledError(res) {
    const unHandledError = new JSONAPIError({
      code: this.code || this.status,
      detail: this.error.message
    });
    res.status(this.status).json(unHandledError);
  }

  sendResponse(res) {
    if (!this.defaultCode) {
      this.unHandledError(res);
    }

    this.handledError(res);
    this.logError(this.error);
  }

  logError() {
    app.logger.error({
      code: this.error.code,
      title: this.error.title,
      detail: this.error.detail,
      message: this.error.message
    });
  }
}

module.exports = APIError;
