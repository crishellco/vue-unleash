<script>
import strategyProviders from './strategy-providers';

export default {
  props: {
    name: {
      default: '',
      required: true,
      type: String
    }
  },

  computed: {
    enabled() {
      const feature = this.$store.state.unleash.features[this.name];
      const featureEnabled = feature && feature.enabled;

      if (!featureEnabled) {
        return false;
      }

      for (const strategy of feature.strategies) {
        if (!strategyProviders[strategy.name]) {
          continue;
        }

        if (
          !strategyProviders[strategy.name](strategy, this.$store.state.unleash.applicationHostname)
        ) {
          return false;
        }
      }

      return featureEnabled;
    }
  },

  render() {
    return this.enabled ? this.$slots.default : null;
  }
};
</script>
