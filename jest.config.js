module.exports = {
  roots: ['<rootDir>/test'],
  collectCoverageFrom: [
    '<rootDir>/test/**/*.ts',
    '!<rootDir>/test/main/**',
    '!<rootDir>/test/**/*-protocol.ts',
    '!<rootDir>/test/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
