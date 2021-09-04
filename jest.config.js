// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
process.env.TZ = 'AO';

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
