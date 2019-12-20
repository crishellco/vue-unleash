import axios from 'axios';
import keyBy from 'lodash.keyby';
import Vue from 'vue';

const moduleFactory = (host, appName) => ({
  actions: {
    async fetch({ commit }) {
      commit('setLoading', true);

      const { data } = await axios.get(`${host}/api/client/features`, {
        headers: {
          'UNLEASH-APPNAME': appName
        }
      });

      commit('setFeatures', keyBy(data.features, 'name'));
      commit('setLoading', false);
    }
  },

  mutations: {
    setFeatures(state, features) {
      Vue.set(state, 'features', Object.assign({}, features));
    },

    setLoading(state, loading) {
      state.loading = loading;
    }
  },

  namespaced: true,

  state: {
    features: {},
    loading: true
  }
});

export { moduleFactory };
