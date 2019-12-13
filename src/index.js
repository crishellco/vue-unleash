import { moduleFactory } from "./module";
import Feature from "./components/Feature.vue";

const version = "__VERSION__";

const install = (Vue, { store, host, appName }) => {
  store.registerModule("unleash", moduleFactory(host, appName));
  Vue.component("unleash-feature", Feature);
  store.dispatch("unleash/fetch");
};

const plugin = {
  Feature,
  install,
  version
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
