import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import VueUnleash from '../src';
import axios from 'axios';

const appName = 'VueUnleash';
const instanceId = 'vue-unleash-1';
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
  applicationHostname({ hostNames }) {
    return hostNames.split(',').includes('localhost');
  }
};

jest.mock('axios');

let axiosGetMock;

describe('module.js', () => {
  beforeEach(() => {
    axiosGetMock = axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: disabledFixture })
    );
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueUnleash, { appName, host, instanceId, strategyProviders, store });

    wrapper = mount(component, { localVue, store });
  });

  it('should fetch', done => {
    setTimeout(() => {
      expect(store.state.unleash.features).toEqual({
        Settings: disabledFixture.features[0]
      });
      expect(axiosGetMock.mock.calls[0][0]).toBe(`${host}/api/client/features`);
      done();
    }, 500);
  });

  it('should fetch with namePrefix', done => {
    axiosGetMock.mockReset();
    axiosGetMock = axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: disabledFixture })
    );
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store();
    localVue.use(VueUnleash, { appName, host, instanceId, namePrefix: 'namePrefix', store });

    wrapper = mount(component, { localVue, store });

    setTimeout(() => {
      expect(axiosGetMock.mock.calls[0][0]).toBe(
        `${host}/api/client/features?namePrefix=namePrefix`
      );
      done();
    }, 500);
  });

  it('should enable and disable', async () => {
    expect(wrapper.text()).toBeFalsy();

    store.commit('unleash/setFeatures', enabledFixture.features);

    await Vue.nextTick();
    expect(wrapper.text()).toBe('hello');
  });

  it('should use strategy providers', async () => {
    store.commit('unleash/setFeatures', enabledFixtureWithStrategies.features);

    await Vue.nextTick();
    expect(wrapper.text()).toBe('hello');

    store.commit('unleash/setFeatures', disabledFixtureWithStrategies.features);

    await Vue.nextTick();
    expect(wrapper.text()).toBeFalsy();
  });
});
