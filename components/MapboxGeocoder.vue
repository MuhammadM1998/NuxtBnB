<template>
  <div :id="containerID" @resultFound="emitResultFoundEvent"></div>
</template>

<script>
export default {
  props: { geocoderID: { type: String, required: true } },

  computed: {
    containerID() {
      return `mapbox-geocoder-${this.geocoderID}`;
    },
  },

  emits: ["resultFound"],

  methods: {
    emitResultFoundEvent(event) {
      this.$emit("resultFound", event);
    },

    initSearchBox(count = 10) {
      this.$nextTick(() => {
        if (document.getElementById(this.containerID)) {
          this.$mapboxMaps.createGeocoder(this.containerID);
        } else if (count > 0) {
          this.initSearchBox(count - 1);
        }
      });
    },
  },

  mounted() {
    this.initSearchBox();
  },
};
</script>

<style lang="scss">
div[id^="mapbox-geocoder"] {
  @apply border-2 border-primary-300 border-opacity-80 rounded-lg text-lg p-2 pr-0;

  &:focus-within {
    outline: auto;
  }

  .mapboxgl-ctrl-geocoder {
    @apply shadow-none min-w-0 sm:w-full;

    &--input {
      @apply p-0 pl-10 font-cereal font-medium;

      &:focus {
        border: none;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
