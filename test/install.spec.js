import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueHubble from '../src';

describe('install.js', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should allow the defaultSelectorType to be set', () => {
    Vue.use(VueHubble, { defaultSelectorType: 'class' });

    const wrapper = mount({
      hubble: {
        namespace: 'test'
      },
      template: '<div><span v-hubble="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('.test--selector')).toBe(true);
  });

  it('should handle an invalid defaultSelectorType to be set', () => {
    Vue.use(VueHubble, { defaultSelectorType: 'invalid' });
    Vue.prototype.$hubble.defaultSelectorType = 'invalid';

    const wrapper = mount({
      template: '<div><span v-hubble="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('[selector]')).toBe(true);
  });
});
