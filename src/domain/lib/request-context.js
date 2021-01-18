const uuid = require('uuid');

module.exports = class RequestContext {
  constructor(request) {
    this.info = {};
    this.requestId = uuid.v1();
    this.token = request.headers.authorization;
    this.ip = request.clientIp;
  }
};
