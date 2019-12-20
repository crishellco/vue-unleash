import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import VueUnleash from '../src';
import axios from 'axios';

const appName = 'VueUnleash';
const component = {
  template: '<unleash-feature name="Settings">hello</unleash-feature>'
};
const host = 'https://fake-host.io';

let localVue;
let store;
let wrapper;

const disabledFixture = {
  features: [
    {
      name: 'Settings',
      enabled: false,
      strategies: [{ name: 'default' }]
    }
  ]
};

const enabledFixture = {
  features: [
    {
      name: 'Settings',
      enabled: true,
      strategies: [{ name: 'default' }]
    }
  ]
};

const disabledFixtureWithStrategies = {
  features: [
    {
      name: 'Settings',
      enabled: true,
      strategies: [{ name: 'applicationHostname', parameters: { hostNames: 'badhost' } }]
    }
  ]
};

const enabledFixtureWithStrategies = {
  features: [
    {
      name: 'Settings',
      enabled: true,
      strategies: [{ name: 'applicationHostname', parameters: { hostNames: 'localhost' } }]
    }
  ]
};

const strategyProviders = {
  applicationHostname({ parameters: { hostNames } }) {
    return hostNames.split(',').includes('localhost');
  }
};

jest.mock('axios');

describe('module.js', () => {
  beforeEach(() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: disabledFixture }));
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueUnleash, { appName, host, strategyProviders, store });

    wrapper = mount(component, { localVue, store });
  });

  it('should fetch', done => {
    setTimeout(() => {
      expect(store.state.unleash.features).toEqual({
        Settings: disabledFixture.features[0]
      });
      done();
    }, 500);
  });

  it('should enable and disable', async () => {
    expect(wrapper.text()).toBeFalsy();

    store.commit('unleash/setFeatures', {
      Settings: enabledFixture.features[0]
    });

    await Vue.nextTick();
    expect(wrapper.text()).toBe('hello');
  });

  it('should use strategy providers', async () => {
    store.commit('unleash/setFeatures', {
      Settings: enabledFixtureWithStrategies.features[0]
    });

    await Vue.nextTick();
    expect(wrapper.text()).toBe('hello');

    store.commit('unleash/setFeatures', {
      Settings: disabledFixtureWithStrategies.features[0]
    });

    await Vue.nextTick();
    expect(wrapper.text()).toBeFalsy();
  });
});
