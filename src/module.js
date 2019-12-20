import axios from 'axios';
import keyBy from 'lodash.keyby';
import Vue from 'vue';

const moduleFactory = (host, appName, strategyProviders = {}) => ({
  actions: {
    async fetch({ commit }) {
      commit('setLoading', true);

      try {
        const { data } = await axios.get(`${host}/api/client/features`, {
          headers: {
            'UNLEASH-APPNAME': appName
          }
        });

        commit('setFeatures', data.features);
      } catch (e) {
        // istanbul ignore next
        console.error('Unable to reach Unleash API');
      } finally {
        commit('setLoading', false);
      }
    }
  },

  mutations: {
    setFeatures(state, features) {
      const enabledFeatures = features.reduce((result, feature) => {
        result[feature.name] = feature.enabled;

        for (const strategy of feature.strategies) {
          if (!strategyProviders[strategy.name]) {
            continue;
          }

          if (!strategyProviders[strategy.name](strategy.parameters)) {
            result[feature.name] = false;
          }
        }

        return result;
      }, {});

      Vue.set(state, 'enabledFeatures', Object.assign({}, enabledFeatures));
      Vue.set(state, 'features', Object.assign({}, keyBy(features, 'name')));
    },

    setLoading(state, loading) {
      state.loading = loading;
    }
  },

  namespaced: true,

  state: {
    enabledFeatures: {},
    features: {},
    loading: true
  }
});

export { moduleFactory };
