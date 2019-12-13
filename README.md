# Vue Unleash

[![Codeship Status for crishellco/vue-unleash](https://app.codeship.com/projects/6fc2e700-35f9-0137-5a4a-56926ea83142/status?branch=master)](https://app.codeship.com/projects/332904)
![](badges/badge-branches.svg)
![](badges/badge-functionss.svg)
![](badges/badge-lines.svg)
![](badges/badge-statements.svg)

A Vue & Vuex plugin for [Unleash](https://unleash.github.io/).

Vue Unleash provides an integration for Vue, Vuex, and Unleash open-source feature flag platform.

_This plugin requires that your project use Vuex_

## Install

```bash
yarn add -D vue-unleash
yarn add -D vuex
# or
npm i -D vue-unleash
npm i -D vuex
```

```javascript
import Vue from "vue";
import VueUnleash from "vue-unleash";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({});

Vue.use(VueUnleash, {
  appName: "MyAppName",
  host: "https://my-hosted-unleash.io",
  store
});
```

## Usage

```javascript
<template>
  <unleash-feature name="AddUser">
    <add-user-form />
  </unleash-feature>
</template>
```

## Lint

```bash
yarn lint
```

## Test

```bash
yarn test
```

## Build

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
