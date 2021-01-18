const middleware = () =>
  // eslint-disable-next-line no-unused-vars
  (req = {}, res = {}, next = () => {}) => {
    next();
  };

module.exports = middleware;
