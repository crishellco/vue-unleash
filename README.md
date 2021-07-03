# Vue Unleash

![Build](https://github.com/crishellco/vue-unleash/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/crishellco/vue-unleash/branch/master/graph/badge.svg?token=KSe1Aim7Mx)](https://codecov.io/gh/crishellco/vue-unleash)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a6e74587ac474c5f0d5/maintainability)](https://codeclimate.com/github/crishellco/vue-unleash/maintainability)

A Vue plugin for [Unleash](https://unleash.github.io/).

Vue Unleash provides an integration for Vue and the Unleash open-source feature flag platform.

_This plugin requires that your project use Vuex_

## Install

```bash
yarn add -D vue-unleash
# or
npm i -D vue-unleash
```

```javascript
import Vue from 'vue';
import VueUnleash from 'vue-unleash';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({});

/**
 * The <unleash-feature /> component is registered
 * globally during installation.
 */
Vue.use(VueUnleash, {
  // Optional, name of app
  appName: 'MyVueApp',

  // Optional, instance id of app
  instanceId: 'my-vue-app-1',

  // Required, Unleash instance host
  host: 'https://my-hosted-unleash.io',

  // Optional, prefix to filter features by via the Unleash API
  // https://unleash.github.io/docs/api/client/features
  namePrefix: 'MyVueApp',

  // Required
  store,

  // Optional, providers to handle strategy logic
  strategyProviders: {
    /**
     * Example strategy provider
     *
     * @param {object} parameters Strategy parameters object from Unleash API
     * @return {boolean} If enabled or not
     */
    applicationHostname(parameters) {
      const { hostNames } = parameters;

      return hostNames.split(',').includes('vue-unleash.io');
    }
  }
});
```

## Component Usage

```javascript
<template>
  <unleash-feature name="MyVueApp.AddUser">
    <add-user-form />
  </unleash-feature>
</template>
```

## Store Usage

```javascript
export default {
  mounted() {
    // Get all features
    console.log(this.$store.state.unleash.features);

    // Get enabled state of all features
    console.log(this.$store.state.unleash.enabledFeatures);

    // Get weather initial loading is occurring
    console.log(this.$store.state.unleash.loading);

    // Re-fetch data
    this.$store.dispatch('unleash/fetch');
  }
};
```

## Scripts

```bash
yarn lint
```

```bash
yarn test
```

```bash
yarn build
```

## How to Contribute

### Pull Requests

1. Fork the repository
2. Create a new branch for each feature or improvement
3. Send a pull request from each feature branch to the **develop** branch

## License

[MIT](http://opensource.org/licenses/MIT)
