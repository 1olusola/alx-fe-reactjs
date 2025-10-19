export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.?(js|jsx)?(test)',
    '**/?(*.)+(spec|test).?(js|jsx)'
  ],
};
