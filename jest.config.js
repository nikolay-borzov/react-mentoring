module.exports = {
  verbose: false,
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'index.js',
    'client.jsx',
    'server-renderer.js'
  ],
  coverageReporters: ['lcov', 'text'],
  transformIgnorePatterns: ['node_modules/(?!(lodash-es)/)'],
  setupTestFrameworkScriptFile: '<rootDir>jest/setup.js'
}
