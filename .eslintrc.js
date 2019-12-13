module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/recommended"],
  globals: {
    Atomics: "readonly",
    beforeEach: true,
    describe: true,
    expect: true,
    it: true,
    jest: true,
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "import/no-unresolved": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": 0
  }
};
