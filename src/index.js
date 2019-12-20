import { moduleFactory } from './module';
import UnleashFeature from './UnleashFeature.vue';

const version = '__VERSION__';

const install = (Vue, { appName, host, store }) => {
  if (!host) {
    throw new Error('Please initialize plugin with a Unleash host.');
  }

  if (!store) {
    throw new Error('Please initialize plugin with a Vuex store.');
  }

  store.registerModule('unleash', moduleFactory(host, appName));
  Vue.component('unleash-feature', UnleashFeature);
  store.dispatch('unleash/fetch');
};

const plugin = {
  UnleashFeature,
  install,
  version
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
