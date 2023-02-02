process.env.TZ = 'UTC'

module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  collectCoverageFrom: ['<rootDir>/src/**/*', '<rootDir>/cdk/**/*'],
  coveragePathIgnorePatterns: ['<rootDir>/src/lib/axios'],
}