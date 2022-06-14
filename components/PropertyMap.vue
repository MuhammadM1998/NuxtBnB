<template>
  <section class="flex flex-col gap-4 app-section">
    <div class="container">
      <div class="flex flex-col gap-2">
        <h1 class="app-title">Location</h1>

        <p>
          {{ home.location.address }} {{ home.location.city }}
          {{ home.location.state }} {{ home.location.country }}
        </p>
      </div>
    </div>
    <div id="mapbox-property-map" class="h-[50vh] lg:h-[75vh]"></div>
  </section>
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
    this.$mapboxMaps.createMap("mapbox-property-map", this.coords);
  },
};
</script>
