import { mount } from '@vue/test-utils';
import Vue from 'vue';
import VueHubble from '../src';

Vue.use(VueHubble);

beforeEach(() => {
  process.env.NODE_ENV = 'test';
});

describe('directive.js', () => {
  it('should add an attribute selector', () => {
    const wrapper = mount({
      template: '<div><span v-hubble:attr="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('[selector]')).toBe(true);
  });

  it('should add a class selector', () => {
    const wrapper = mount({
      template: '<div><span v-hubble:class="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('.selector')).toBe(true);
  });

  it('should add an id selector', () => {
    const wrapper = mount({
      template: '<div><span v-hubble:id="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('#selector')).toBe(true);
  });

  it('should not add a selector if NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'not-test';

    const wrapper = mount({
      template: '<div><span v-hubble:id="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('#selector')).toBe(false);
  });

  it('should namespace the selector', () => {
    const wrapper = mount({
      hubble: { namespace: 'my-special-namespace' },
      template: '<div><span v-hubble="\'selector\'"></span></div>'
    });

    expect(wrapper.contains('[my-special-namespace--selector]')).toBe(true);
  });
});
