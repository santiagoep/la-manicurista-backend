/* eslint no-param-reassign: 0 */
const qs = require('qs');
const axios = require('axios');
const polly = require('polly-js');
const { UNAUTHORIZED, FORBIDDEN } = require('http-status-codes');

// Uri params interpolation
const getURI = (uri, params = {}) => {
  const matches = uri.match(/\{params.([a-zA-Z0-9_]{1,})}/g);

  if (matches) {
    matches.forEach((match) => {
      const name = match.replace('{params.', '').replace('}', '');
      uri = uri.replace(match, params[name]);
    });
  }

  return uri;
};

// Direct axios call method
const createDirectCallMethod = (axiosInstance, method) => (
  uri,
  info,
  data,
  config
) => {
  let axiosCall;

  if (['get', 'delete', 'head', 'options'].includes(method)) {
    axiosCall = axiosInstance[method](uri, config);
  } else {
    axiosCall = axiosInstance[method](uri, data, config);
  }

  return polly()
    .waitAndRetry(3)
    .executeForPromise(() => axiosCall);
};

// Axios instance auth error response interceptor
const authErrorResponseInterceptor = (error) => {
  if (error.response) {
    const { status } = error.response;

    if ([UNAUTHORIZED, FORBIDDEN].includes(status)) {
      throw new Error('unauthorized');
    }

    return Promise.reject(error);
  }

  return Promise.reject(error);
};

module.exports = class API {
  constructor({ endpoints = {}, baseURL, headers, responseType }) {
    const paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'brackets' });

    this.axios = axios.create({
      baseURL,
      headers,
      responseType,
      paramsSerializer
    });

    this.axios.interceptors.response.use(
      (response) => response,
      authErrorResponseInterceptor
    );

    Object.keys(endpoints).forEach((endpointName) => {
      const { method, uri } = endpoints[endpointName];
      this[endpointName] = ({
        url,
        info = {},
        config = {},
        data = {}
      } = {}) => {
        const directCallMethod = createDirectCallMethod(this.axios, method);
        const composedUri = getURI(uri, url);

        return directCallMethod(composedUri, info, data, config);
      };
    });
  }
};
