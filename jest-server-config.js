const config = require('./jest.config');

config.testMatch = ['**/*(spec|test).ts'];
config.clearMocks = true;
config.bail = false;
config.globals = {
  'ts-jest': {
    isolatedModules: true,
    tsconfig: 'tsconfig.json',
  },
};
config.preset = '@shelf/jest-mongodb';
config.testEnvironment = 'node';

module.exports = config;
