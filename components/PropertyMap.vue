<template>
  <div>
    <div class="app-wrapper app-padded-vertical">
      <h2 class="app-subtitle">Location</h2>

      <p class="app-description">
        {{ home.location.address }} {{ home.location.city }}
        {{ home.location.state }} {{ home.location.country }}
      </p>

      <div id="mapboxMap" class="app-map"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: { type: Object, required: true },
  },

  computed: {
    coords() {
      const lng = this.home._geoloc.lng;
      const lat = this.home._geoloc.lat;
      const coords = [lng, lat];
      return coords;
    },
  },

  mounted() {
    this.$mapboxMaps.createMap("mapboxMap", this.coords);
  },
};
</script>
