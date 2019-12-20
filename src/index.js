import { moduleFactory } from './module';
import UnleashFeature from './UnleashFeature.vue';

const install = (Vue, { appName, namePrefix, host, strategyProviders, store }) => {
  if (!host) {
    throw new Error('Please initialize plugin with a Unleash host.');
  }

  if (!store) {
    throw new Error('Please initialize plugin with a Vuex store.');
  }

  Vue.config.applicationHostname = 'localhost';
  store.registerModule('unleash', moduleFactory({ host, appName, namePrefix, strategyProviders }));
  Vue.component('unleash-feature', UnleashFeature);
  store.dispatch('unleash/fetch');
};

const plugin = {
  UnleashFeature,
  install
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
