import { moduleFactory } from "./module";
import Feature from "./Feature.vue";

function install(Vue, { store, host, appName }) {
  store.registerModule("unleash", moduleFactory(host, appName));
  Vue.component("unleash-feature", Feature);
  store.dispatch("unleash/fetch");
}

export default install;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(install);
}

export { Feature };
