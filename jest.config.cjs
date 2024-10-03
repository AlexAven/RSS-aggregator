/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!**/node_modules/**', '!<rootDir>/src/**/*.mock.*'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'jest-transform-stub',
  },
  // Установка среды тестирования на jsdom
  testEnvironment: 'jsdom',
};

module.exports = config;
