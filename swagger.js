const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'La Manicurista backend api documentation',
      version: '1.0.0'
    }
  },
  // Path to the API docs
  apis: [path.resolve(__dirname, 'src/application/routes.js')]
};

module.exports = options;
