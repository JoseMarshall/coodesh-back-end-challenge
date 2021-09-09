// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: './.env.test' });

jest.setTimeout(60000);

// Global Mocks
jest.mock('./src/main/services/user-corn', () => ({
    __esModule: true,
    importUserTask: {
        start: jest.fn(),
    },
}));

jest.spyOn(console, 'error').mockReturnValue(undefined);
jest.spyOn(console, 'log').mockReturnValue(undefined);