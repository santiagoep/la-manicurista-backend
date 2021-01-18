/* eslint-disable no-sequences */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-extend-native */
/* eslint-disable no-unused-expressions */

jest.mock('../src/domain/bootloaders');
const app = require('../src/domain/bootloaders');

global.app = app;

// Date mock
const mockedDate = new Date('2020');
global.Date = jest.fn(() => mockedDate);
global.Date.now = jest.fn(() => mockedDate);
global.Date.parse = jest.fn(() => mockedDate);

app.bootWithMocks();
