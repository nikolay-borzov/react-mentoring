module.exports = {
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js'
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'index.js'],
  coverageReporters: ['lcov', 'text'],
  transformIgnorePatterns: ['node_modules/(?!(lodash-es)/)'],
  setupTestFrameworkScriptFile: '<rootDir>jest/setup.js'
}