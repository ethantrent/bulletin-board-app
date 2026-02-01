module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    'server.js',
    'app.js'
  ],
  collectCoverageFrom: [
    'backend/**/*.js',
    '!backend/**/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
