import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueUnleash from "@/";
// import mockAxios from "jest-mock-axios";
import fetchMock from "fetch-mock";

const appName = "VueUnleash";
const component = {
  template: '<unleash-feature name="Settings">hello</unleash-feature>'
};
const host = "https://fake-cost.io";
const url = `${host}/api/client/features`;
let localVue;
let store;
let wrapper;

const fixture = {
  features: [
    {
      name: "Settings",
      enabled: true
    }
  ]
};

describe("module.js", () => {
  beforeEach(() => {
    fetchMock.reset();
    fetchMock.get(url, fixture);
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueUnleash, { appName, host, store });

    wrapper = mount(component, { localVue, store });
  });

  it("should fetch", done => {
    setTimeout(() => {
      expect(store.state.unleash.features).toEqual({
        Settings: true
      });
      done();
    }, 500);
  });

  it("should enable and disable", async () => {
    expect(wrapper.text()).toBeFalsy();

    store.commit("unleash/setFeatures", {
      Settings: true
    });

    await Vue.nextTick();

    expect(wrapper.text()).toBe("hello");
  });
});
