import directiveFactory from './directive';

let installed = false;

const defaultConfig = {
  defaultSelectorType: 'attr',
  environment: 'test'
};

function install(Vue, options = {}) {
  Vue.prototype.$hubble = Object.assign(defaultConfig, options);

  if (!installed) {
    Vue.directive('hubble', directiveFactory(Vue.prototype.$hubble));
    installed = true;
  }
}

export default install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
