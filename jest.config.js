module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/test/**/*.ts',
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/test/main/**',
    '!<rootDir>/test/**/*-protocol.ts',
    '!**/protocols/**',
    '!**/StartServer.*',
    '!**/main/config/index.*'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
