export default {
  applicationHostname(strategy) {
    const parameters = strategy.parameters || { hostNames: '' };

    return parameters.hostNames.split(',').includes(window.location.host);
  }
};
