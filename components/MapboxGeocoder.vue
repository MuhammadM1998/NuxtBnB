<template>
  <div :id="geocoderID" @resultFound="emitEvent"></div>
</template>

<script>
export default {
  props: { containerID: { type: String, required: true } },

  computed: {
    geocoderID() {
      return `mapbox-geocoder-${this.containerID}`;
    },
  },

  methods: {
    emitEvent(e) {
      this.$emit("resultFound", e);
    },
  },

  mounted() {
    this.$mapboxMaps.createGeocoder(this.geocoderID);
  },
};
</script>

<style lang="scss">
.test,
.test:focus {
  @apply text-red-400 outline-none;
}

.mapboxgl-ctrl-geocoder {
  @apply rounded-md shadow-sm px-4 font-cereal;

  &:focus-within {
    outline: auto;
  }

  &--icon {
    @apply hidden;
  }

  input,
  input:focus,
  input:focus-visible {
    @apply p-0  outline-none;
  }
}
</style>
