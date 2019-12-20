export default {
  applicationHostname({ parameters: { hostNames } }, applicationHostname) {
    return hostNames.split(',').includes(applicationHostname);
  }
};
