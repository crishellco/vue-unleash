module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/index.js",
    "!src/constants.js"
  ],
  coverageReporters: ["json-summary", "text", "lcov"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/test/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!test-component).+\\.js$"]
};
