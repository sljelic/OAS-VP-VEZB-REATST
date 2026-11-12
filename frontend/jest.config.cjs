module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/tests/**/*.test.[jt]s?(x)"],
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.js"],
  clearMocks: true,
  collectCoverageFrom: ["src/validations/korisnik.js"],
};
