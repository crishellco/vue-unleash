import { moduleFactory } from './module';
import UnleashFeature from './UnleashFeature.vue';

const version = '__VERSION__';

const install = (Vue, { applicationHostname, appName, host, store }) => {
  if (!host) {
    throw new Error('Please initialize plugin with a Unleash host.');
  }

  if (!store) {
    throw new Error('Please initialize plugin with a Vuex store.');
  }

  applicationHostname = applicationHostname || window.location.host;

  Vue.config.applicationHostname = 'localhost';
  store.registerModule('unleash', moduleFactory(host, appName));
  Vue.component('unleash-feature', UnleashFeature);
  store.commit('unleash/setApplicationHostname', applicationHostname);
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
