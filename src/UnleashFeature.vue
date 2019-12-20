<script>
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
        if (!this[strategy.name]) {
          continue;
        }

        if (!this[strategy.name](strategy.parameters)) {
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
