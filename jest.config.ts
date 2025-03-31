/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  globalSetup: "./jest.setup.ts",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest", {}],
  },
};
