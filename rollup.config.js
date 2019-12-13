// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
// import commonJS from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm"
  },
  plugins: [
    resolve(),
    // commonJS({
    //   include: "node_modules/**"
    // }),
    VuePlugin()
  ]
};
