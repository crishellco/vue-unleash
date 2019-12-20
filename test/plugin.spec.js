import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import VueUnleash from '../src';
import axios from 'axios';

const appName = 'VueUnleash';
const component = {
  template: '<unleash-feature name="Settings">hello</unleash-feature>'
};
const host = 'https://fake-cost.io';
// const url = `${host}/api/client/features`;
let localVue;
let store;
let wrapper;

const fixture = {
  features: [
    {
      name: 'Settings',
      enabled: false,
      strategies: [{ name: 'default' }]
    }
  ]
};

jest.mock('axios');

describe('module.js', () => {
  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: fixture }));
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueUnleash, { appName, host, store });

    wrapper = mount(component, { localVue, store });
  });

  it('should fetch', done => {
    setTimeout(() => {
      expect(store.state.unleash.features).toEqual({
        Settings: {
          name: 'Settings',
          enabled: false,
          strategies: [{ name: 'default' }]
        }
      });
      done();
    }, 500);
  });

  it('should enable and disable', async () => {
    expect(wrapper.text()).toBeFalsy();

    store.commit('unleash/setFeatures', {
      Settings: {
        name: 'Settings',
        enabled: true,
        strategies: [{ name: 'default' }]
      }
    });

    await Vue.nextTick();

    expect(wrapper.text()).toBe('hello');
  });

  it('should adhere to applicationHostname strategy', async () => {
    store.commit('unleash/setFeatures', {
      Settings: {
        name: 'Settings',
        enabled: true,
        strategies: [{ name: 'applicationHostname', parameters: { hostNames: 'localhost' } }]
      }
    });

    await Vue.nextTick();

    expect(wrapper.text()).toBe('hello');

    store.commit('unleash/setFeatures', {
      Settings: {
        name: 'Settings',
        enabled: true,
        strategies: [{ name: 'applicationHostname', parameters: { hostNames: 'anotherhost' } }]
      }
    });

    await Vue.nextTick();

    expect(wrapper.text()).toBeFalsy();

    store.commit('unleash/setFeatures', {
      Settings: {
        name: 'Settings',
        enabled: true,
        strategies: [{ name: 'applicationHostname' }]
      }
    });

    await Vue.nextTick();

    expect(wrapper.text()).toBeFalsy();
  });
});
