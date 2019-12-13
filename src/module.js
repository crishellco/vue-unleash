import { keyBy, mapValues } from "lodash";
import Vue from "vue";
import zlFetch from "zl-fetch";

const moduleFactory = (host, appName) => ({
  actions: {
    async fetch({ commit }) {
      const { body } = await zlFetch(`${host}/api/client/features`, {
        headers: {
          "UNLEASH-APPNAME": appName
        }
      });

      commit("setFeatures", mapValues(keyBy(body.features, "name"), "enabled"));
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
