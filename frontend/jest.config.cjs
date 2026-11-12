module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/tests/**/*.test.[jt]s?(x)"],
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  clearMocks: true,
  collectCoverageFrom: ["src/validations/korisnik.js"],
};
