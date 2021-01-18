const { EXPECTATION_FAILED } = require('http-status-codes');

module.exports = {
  getTracks: {
    code: 'TRACKS-1',
    status: EXPECTATION_FAILED,
    title: 'Error getting the data',
    message: 'Spotify api error.'
  }
};
