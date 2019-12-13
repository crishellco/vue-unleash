module.exports = {
  presets: [
    "@vue/babel-preset-jsx",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"]
    }
  }
};
