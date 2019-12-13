module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}", "!src/index.js"],
  coverageReporters: ["json-summary", "text", "lcov"],
  preset: "@vue/cli-plugin-unit-jest"
};
