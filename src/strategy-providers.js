export default {
  applicationHostname({ parameters: { hostNames } }) {
    return hostNames.split(',').includes(window.location.host);
  }
};
