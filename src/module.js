import keyBy from "lodash-es/keyBy";
import mapValues from "lodash-es/mapValues";
import axios from "axios";
import Vue from "vue";

const moduleFactory = (host, appName) => ({
  actions: {
    async fetch({ commit }) {
      const { data } = await axios.get(`${host}/api/client/features`, {
        headers: {
          "UNLEASH-APPNAME": appName
        }
      });

      commit("setFeatures", mapValues(keyBy(data.features, "name"), "enabled"));
    }
  },
  mutations: {
    setFeatures(state, features) {
      Vue.set(state, "features", Object.assign({}, features));
    }
  },
  namespaced: true,
  state: {
    features: {}
  }
});

export { moduleFactory };
