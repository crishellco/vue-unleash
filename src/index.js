import { moduleFactory } from './module';
import UnleashFeature from './UnleashFeature.vue';
import UnleashDirective from './UnleashDirective';

const install = (Vue, { appName, namePrefix, host, strategyProviders, store, directive, token }) => {
  if (!host) {
    throw new Error('Please initialize plugin with a Unleash host.');
  }

  if (!store) {
    throw new Error('Please initialize plugin with a Vuex store.');
  }

  if (directive) {
    Vue.directive(directive, UnleashDirective)
  }

  Vue.config.applicationHostname = 'localhost';
  store.registerModule('unleash', moduleFactory({ host, appName, namePrefix, strategyProviders, token }));
  Vue.component('unleash-feature', UnleashFeature);
  store.dispatch('unleash/fetch');
};

const plugin = {
  UnleashFeature,
  install,
  UnleashDirective
};

export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
